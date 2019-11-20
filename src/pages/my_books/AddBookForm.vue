<template>
    <div id="mb-add_book">
            <h2>{{ $t('navigation.add_book') }}</h2>
            <div class="mb-form">
                <div class="image_preview">
                    <img v-if="image" :src="image">
                    <ImageGenerator v-else :author="author" :title="title" ref="generatedImage"/>
                    <div v-if="image" class="image-remove" @click="removeImage">x</div>
                </div>
                <div id="mb-add_book-form-inputs">
                    <div class="mb-add_book-form-inputs-line">
                        <label for="add_title">{{ $t('forms.title') }}<span class="red"> *</span></label>
                        <div id="add_title_div">
                            <input v-model="title"
                               @focus="showGoogleSuggestions"
                               @blur="hideGoogleSuggestions"
                               name="title" id="add_title" type="text" :placeholder="$t('forms.title')">
                                <GoogleSuggestions
                                        v-if="googleSuggestionsVisible && this.title"
                                        :selectGoogleBook="selectGoogleBook"
                                        :title="title"
                                />
                        </div>
                    </div>
                    <div class="mb-add_book-form-inputs-line">
                        <label for="add_author">{{ $t('forms.author') }}</label>
                        <input v-model="author" name="author" id="add_author" type="text" :placeholder="$t('forms.author')">
                    </div>
                    <div class="mb-add_book-form-inputs-line">
                        <label for="add_comment">{{ $t('forms.comment') }}</label>
                        <input v-model="comment" name="comment" id="add_comment" type="text" :placeholder="$t('forms.comment')">
                    </div>
                    <div class="add_image mb-add_book-form-inputs-line">
                        <button @click="launchFilePicker">{{ $t('forms.upload_image') }}</button>
                        <input
                                ref="custom_image"
                                type="file"
                                @change="handleFileUpload"
                                accept=".png, .jpg, .jpeg"
                        />
                    </div>
                </div>
            </div>
            <div id="mb-add_book-form-submit">
                <AppButton :onClick="submit">{{ $t('actions.add') }}</AppButton>
            </div>
        <NotificationWindow :close="hideNotification" v-if="notificationVisible">{{ notificationText }}</NotificationWindow>
    </div>
</template>

<script>
    import axios from 'axios';
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

    import AppButton from "../../components/ui/AppButton"
    import GoogleSuggestions from "./GoogleSuggestions";
    import ImageGenerator from "./ImageGenerator";
    import NotificationWindow from "../../components/ui/NotificationWindow"

    export default {
        components: {
            AppButton,
            GoogleSuggestions,
            ImageGenerator,
            NotificationWindow,
        },
        props: {
            onBookAdded: {
                type: Function,
                required: true
            }
        },
        data: function () {
            return {
                title: "",
                author: "",
                image: null,
                customImage: null,
                comment: null,
                googleSuggestionsVisible: false,
                selectedGoogleBook: null,
                notificationVisible: false,
                notificationText: ""
            }
        },
        methods: {
            selectGoogleBook: function (book) {
                this.title = book.title;
                this.author = book.author;
                this.image = book.image;
                this.selectedGoogleBook = book;
            },
            showGoogleSuggestions: function(){
                this.googleSuggestionsVisible = true;
            },
            hideGoogleSuggestions: function(){
                setTimeout(function () {
                    this.googleSuggestionsVisible = false;
                }.bind(this), 200);
            },
            launchFilePicker: function(event){
                this.$refs['custom_image'].click();
            },
            handleFileUpload: function(event){
                this.customImage = event.target.files[0];
                this.image = URL.createObjectURL(this.customImage);
            },
            removeImage: function(){
                if (this.customImage){
                    this.customImage = null;
                    if (this.selectedGoogleBook){
                        this.image = this.selectedGoogleBook.image;
                    }else{
                        this.image = null;
                    }
                }else{
                    this.image = null;
                }
            },
            clearFields: function(){
                this.title = '';
                this.author = '';
                this.comment = '';
                this.image = undefined;
                this.customImage = undefined;
            },
            submit: function () {
                if(!this.title)
                    return;

                let formData = new FormData();
                formData.append('title', this.title);
                if (this.author)
                    formData.append('author', this.author);
                if (this.comment)
                    formData.append('comment', this.comment);

                if (this.customImage)
                    formData.append('image', this.customImage);
                else if (!this.image)
                    formData.append('image', this.$refs.generatedImage.getBlob(), 'name.jpg');
                else if (this.selectedGoogleBook)
                    formData.append('external_image', this.selectedGoogleBook.image)

                if (
                    ! this.customImage &&
                    this.selectedGoogleBook
                    && this.title === this.selectedGoogleBook.title
                    && this.author === this.selectedGoogleBook.author
                    && this.image === this.selectedGoogleBook.image
                )
                    formData.append('external_id', this.selectedGoogleBook.id);

                this.clearFields();

                axios.post(process.env.VUE_APP_SERVER_URL + 'app/api/my-books/add/', formData).then(function (response) {
                    if (response.data.success) {
                        this.notificationText = this.$t('notifications.book_added', {title: response.data.book.description.title});
                        this.notificationVisible = true;
                        this.onBookAdded();
                    }else if(response.data.error_type === 'ALREADY_ADDED'){
                        this.notificationText = this.$t('notifications.book_already_added',
                            {author: response.data.author, title: response.data.title });
                        this.notificationVisible = true;
                    }
                }.bind(this)).catch(function (e) {
                    console.log(e);
                })
            },
            hideNotification: function(){
                this.notificationVisible = false;
            }
        }
    }
</script>


<style scoped>
.mb-form{
    height: 200px;
}

.image_preview{
    float:left;
    width: 128px;
    height: 199px;
    position: relative;
}

.image_preview > img{
    max-width: 128px;
    max-height: 199px;
}

.image-remove{
    position: absolute;
    right: 5px;
    top: 5px;
    background: #ffff00;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    vertical-align: center;
    text-align: center;
}

.add_image > input{
    display: none;
}

#mb-add_book{
    width: 100%;
}

.mb-add_book-form-inputs-line {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
}

.mb-add_book-form-inputs-line > label{
    display: inline-block;
    width: 50%;
}

.mb-add_book-form-inputs-line input[type="text"]{
    border: none;
    border-bottom: 1px solid #333;
    width: 50%;
}

.mb-add_book-form-inputs-line input[type="text"]:focus{
    outline-width: 0;
}
.mb-add_book-form-inputs-line input[type="text"]::placeholder{
    color: #8c8c8c;
}
.mb-add_book-form-inputs-line input[type="text"]:focus::placeholder{
    color: #bfbfbf;
}

.red{
    color: darkred;
}

#add_title_div{
    width: 50%;
    position: relative;
}

#add_title_div > input{
    width: 100%;
}

#mb-add_book-form-submit{
    margin-top: 20px;
    text-align: right;
}
</style>