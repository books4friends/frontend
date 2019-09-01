<template>
    <div id="fb-search">
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
                required: false,
                default: "Поиск"
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
#fb-search {
    margin: 10px 0 10px;
}

#fb-search > input{
    background: #fff;
    border: 0;
    display: block;
    width: 100%;
    padding: 10px 32px;
    font-size: 16px;
    box-sizing: border-box;
    background: url(../../assets/images/search_icon.png) no-repeat scroll 5px 10px;
}

#fb-search > input:focus{
    outline-width: 0;
}
#fb-search > input::placeholder{
    color: #8c8c8c;
}
#fb-search > input:focus::placeholder{
    color: #bfbfbf;
}
</style>