<template>
    <div>
        <div id="fb-friends_list_list">
            <ul>
                <li class="selected">Все</li>
                <li v-for="friends_list in friends_list_list">{{ friends_list.title }}</li>
            </ul>
        </div>
        <div id="fb-friends_list">
            <ul>
                <li class="fb-friends_list-item" v-for="friend in friends_list">
                    <img :src="friend.image" :alt="friend.name">
                    <span>{{ friend.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data:  function(){
            return {
                friends_list_list: [
                    {
                        title: "Семья"
                    },
                    {
                        title: "Универ"
                    }
                ],
                friends_list: [
                    {
                        name: "Айгиз Мухамадиев",
                        image: "https://pp.userapi.com/c630716/v630716015/559f0/cUjWkUZTZqI.jpg?ava=1"
                    },
                    {
                        name: "Ришат Галин",
                        image: "https://m.vk.com/images/camera_100.png?ava=1"
                    },
                    {
                        name: "Руслан Билалов",
                        image: "https://pp.userapi.com/c836120/v836120064/234f/IfGZCWGnXtc.jpg?ava=1"
                    },
                ]
            }
        }
    }

</script>

<style scoped>
#fb-friends_list_list > ul > li{
    font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #656565;

    display: block;
    height: 32px;
    line-height: 31px;
    cursor: pointer;
    padding: 0 5px 0 28px;
}

#fb-friends_list_list > ul > li:hover{
    background-color: #edeef0;
}

#fb-friends_list_list > ul > li.selected{
    border-right: 2px solid #5181b8;
    font-weight: 800;
    color: #000;
    background-color: #edeef0;
}

.fb-friends_list-item{
    display: flex;
    text-decoration-line: none;
    cursor: pointer;
    border-radius: 24px 0 0 24px;
}

.fb-friends_list-item:hover{
    background-color: #edeef0;
}

.fb-friends_list-item > span{
    line-height: 35px;
    display: inline-block;
    margin-left: 10px;
    text-decoration-line: none;
    font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #656565;
}

.fb-friends_list-item > img{
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin: 2px 0;
}

.fb-friends_list-item.selected{
    border-right: 2px solid #5181b8;
    background-color: #edeef0;
}
.fb-friends_list-item.selected > span{
    font-weight: 800;
    color: #000;
}


</style>