<template>
    <div>
        <div id="friends_filter_commands">
            <ul>
                <li
                        @click="clearFilter"
                        v-bind:class="{ selected: filterStatus == FILTER_STATUS_ALL }"
                >
                    Все
                </li>
            </ul>
        </div>
        <div id="friends_list_list">
            <ul>
                <li
                        v-for="friendsList in friends_list_list"
                        @click="setFriendListFilter(friendsList)"
                        v-bind:class="{ selected: filterStatus == FILTER_STATUS_FRIENDS_LIST &&  filterId==friendsList.id}"
                >
                    {{ friendsList.title }}
                </li>
            </ul>
        </div>
        <div id="friends_list">
            <ul>
                <li
                        v-for="friend in friends_list"
                        @click="setFriendFilter(friend)"
                        v-bind:class="{ selected: filterStatus == FILTER_STATUS_FRIEND &&  filterId==friend.id}"
                >
                    <img :src="friend.image" :alt="friend.name">
                    <span>{{ friend.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    const FILTER_STATUS_ALL = 0;
    const FILTER_STATUS_FRIEND = 1;
    const FILTER_STATUS_FRIENDS_LIST = 2;

    export default {
        props: {
            setFilter: {
                type: Function,
                required: true
            }
        },
        data:  function(){
            return {
                FILTER_STATUS_ALL: FILTER_STATUS_ALL,
                FILTER_STATUS_FRIEND: 1,
                FILTER_STATUS_FRIENDS_LIST: 2,

                filterStatus: FILTER_STATUS_ALL,
                filterId: undefined,
                friends_list_list: [
                    {
                        id: "2",
                        title: "Айгиз",
                        list: ["1"]
                    },
                    {
                        id: "4",
                        title: "Айгиз и Ришат",
                        list: ["1", "2"]
                    }
                ],
                friends_list: [
                    {
                        id: "1",
                        name: "Айгиз Мухамадиев",
                        image: "https://pp.userapi.com/c630716/v630716015/559f0/cUjWkUZTZqI.jpg?ava=1"
                    },
                    {
                        id: "2",
                        name: "Ришат Галин",
                        image: "https://m.vk.com/images/camera_100.png?ava=1"
                    },
                    {
                        id: "3",
                        name: "Руслан Билалов",
                        image: "https://pp.userapi.com/c836120/v836120064/234f/IfGZCWGnXtc.jpg?ava=1"
                    },
                ]
            }
        },
        methods: {
            clearFilter: function () {
                this.setFilter([]);
                this.filterStatus = FILTER_STATUS_ALL;
            },
            setFriendFilter: function (friend){
                this.setFilter([friend.id]);
                this.filterStatus = FILTER_STATUS_FRIEND;
                this.filterId = friend.id;
            },
            setFriendListFilter: function(friendList){
                this.setFilter(friendList.list);
                this.filterStatus = FILTER_STATUS_FRIENDS_LIST;
                this.filterId = friendList.id;
            }
        }
    }

</script>

<style scoped>
#friends_filter_commands > ul > li, #friends_list_list > ul > li{
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

#friends_filter_commands > ul > li:hover, #friends_list_list > ul > li:hover{
    background-color: #edeef0;
}

#friends_filter_commands > ul > li.selected, #friends_list_list > ul > li.selected{
    border-right: 2px solid #5181b8;
    font-weight: 800;
    color: #000;
    background-color: #edeef0;
}

#friends_list > ul > li{
    display: flex;
    text-decoration-line: none;
    cursor: pointer;
    border-radius: 24px 0 0 24px;
}

#friends_list > ul > li:hover{
    background-color: #edeef0;
}

#friends_list > ul > li > span{
    line-height: 35px;
    display: inline-block;
    margin-left: 10px;
    text-decoration-line: none;
    font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #656565;
}

#friends_list > ul > li > img{
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin: 2px 0;
}

#friends_list > ul > li.selected{
    border-right: 2px solid #5181b8;
    background-color: #edeef0;
}
#friends_list > ul > li.selected > span{
    font-weight: 800;
    color: #000;
}


</style>