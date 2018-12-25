<template>
    <div id="mb-add_book">
        <form id="mb-add_book-form">
            <h2>Добавить книгу</h2>
            <div id="mb-add_book-form-inputs">
                <label for="add_title">Название*</label>
                <div id="add_title_div">
                    <input name="title" id="add_title" type="text" placeholder="Название">

                    <div id="google_books_suggestion">
                        <div class="google_book">
                            <span class="google_book-author">Жан Пюри</span>
                            <span class="google_book-title">Маленький сын</span>
                        </div>
                        <div class="google_book">
                            <span class="google_book-author">Лана Перишная</span>
                            <span class="google_book-title">Маленький сын</span>
                        </div>
                        <div class="google_book">
                            <span class="google_book-author">Жан Пюри</span>
                            <span class="google_book-title">Маленький сын</span>
                        </div>
                        <div class="google_book">
                            <span class="google_book-author">Жан Пюри</span>
                            <span class="google_book-title">Маленький сын</span>
                        </div>
                        <div class="google_book">
                            <span class="google_book-author">Жан Пюри</span>
                            <span class="google_book-title">Маленький сын</span>
                        </div>
                    </div>
                </div>
                <label for="add_author">Автор*</label>
                <input name="author" id="add_author" type="text" placeholder="Автор">
                <label for="add_comment">Комментарий</label>
                <input name="comment" id="add_comment" type="text" placeholder="Комментарий">
                <input name="google_id" id="add_google_id" type="hidden">
            </div>
            <div id="mb-add_book-form-submit"><input type="submit" class="button" value="Добавить"></div>
        </form>
    </div>

</template>

<style scoped>
#mb-add_book-form-inputs{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 20px;
}
#mb-add_book-form-inputs label{
    display: inline-block;
}

#mb-add_book-form-inputs input[type="text"]{
    border: none;
    border-bottom: 1px solid #333;
    width: 100%;
}

#mb-add_book-form-inputs input[type="text"]:focus{
    outline-width: 0;
}
#mb-add_book-form-inputs input[type="text"]::placeholder{
    color: #8c8c8c;
}
#mb-add_book-form-inputs input[type="text"]:focus::placeholder{
    color: #bfbfbf;
}
#add_title_div{
    width: 100%;
    position: relative;
}

#mb-add_book-form-submit{
    margin-top: 20px;
    text-align: right;
}
#google_books_suggestion{
    position: absolute;
    width: 400px;
    top: 22px;
    background-color: #fff;
    border: 1px solid #c7c7c7;
    border-radius: 0 0 4px 4px;
    box-sizing: border-box;
}

.google_book{
    padding: 5px 3px 3px 10px;
    border-bottom: 1px solid #c7c7c7;
    cursor: pointer;
}

.google_book:last-child{
    border: none;
}
.google_book:hover{
    background-color: #f7f7f7;
}

.google_book-author{
    font-weight: bold;
}
</style>