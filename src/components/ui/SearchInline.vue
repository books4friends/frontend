<template>
    <div class="search-inline">
        <input type="text" :placeholder="placeholder" @keyup="update" v-model="str">
    </div>
</template>

<script>
    export default {
        props: {
            onChange: {
                type: Function,
                required: true
            },
            placeholder: {
                type: String,
                required: true
            }
        },
        data: function(){
            return {
                str: ""
            }
        },
        methods: {
            update: function () {
               this.onChange(this.str);
            }
        }
    }

</script>

<style scoped>
.search-inline {
    margin: 0 0 0 10px;
    width: 360px;
}

.search-inline > input{
    background: transparent;
    border: 0;
    display: block;
    width: 100%;
    padding: 10px 32px;
    font-size: 13px;
    box-sizing: border-box;
    background: url(../../assets/images/search_icon.png) no-repeat scroll 5px 10px;
}

.search-inline > input:focus{
    outline-width: 0;
}
.search-inline > input::placeholder{
    color: #94a2bb
}
.search-inline > input:focus::placeholder{
    color: #c0cce1
}

</style>