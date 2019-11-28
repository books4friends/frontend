<template>
    <div>
        <div id="filter_commands">
            <ul>
                <li
                        @click="clearFriendsFilter"
                        v-bind:class="{ selected: filterStatus === FILTER_STATUS_ALL }"
                        class="li_choice"
                >
                    {{ $t('filters.all_friends') }}
                </li>
            </ul>
        </div>
        <div id="cities">
            <ul>
                <li
                        v-for="city in citiesList"
                        @click="cityFilterChoice(city)"
                        v-bind:class="{ selected: filterStatus === FILTER_BY_CITY &&  filterId===city.id}"
                        class="li_choice"
                >
                    {{ city.title }}
                </li>
            </ul>
        </div>
        <div id="friends_list">
            <ul>
                <li
                        v-for="friend in friends_list"
                        @click="friendFilterChoice(friend)"
                        v-bind:class="{ selected: filterStatus === FILTER_BY_FRIEND &&  filterId===friend.id}"
                >
                    <img :src="friend.image" :alt="friend.name">
                    <span>{{ friend.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    import { FILTER_ALL, FILTER_BY_CITY, FILTER_BY_FRIEND, FILTER_BY_FRIENDS_LIST } from "./consts"

    export default {
        props: {
            setFilter: {
                type: Function,
                required: true
            }
        },
        data:  function(){
            return {
                FILTER_STATUS_ALL: FILTER_ALL,
                FILTER_BY_CITY: FILTER_BY_CITY,
                FILTER_BY_FRIEND: FILTER_BY_FRIEND,
                FILTER_BY_FRIENDS_LIST: FILTER_BY_FRIENDS_LIST,

                filterStatus: FILTER_ALL,
                filterId: undefined,
                citiesList: [],
                filterCityId: "",
                friends_list: []
            }
        },
        methods: {
            loadFilters: function(){
                axios.get(process.env.VUE_APP_SERVER_URL + 'api/app/friends-books/get-filters/')
                    .then(function (response){
                        this.friends_list = response.data.data.friends;
                        this.citiesList = response.data.data.cities;
                    }.bind(this))
            },
            clearFriendsFilter: function () {
                this.setFilter(FILTER_ALL, []);
                this.filterStatus = FILTER_ALL;
            },
            friendFilterChoice: function (friend) {
                this.setFilter(FILTER_BY_FRIEND, friend.account_id);
                this.filterStatus = FILTER_BY_FRIEND;
                this.filterId = friend.account_id;
            },
            cityFilterChoice: function (city) {
                this.setFilter(FILTER_BY_CITY, city.id);
                this.filterStatus = FILTER_BY_CITY;
                this.filterId = city.id;
            }
        },
        created() {
            this.loadFilters();
        }
    }

</script>

<style scoped>

.li_choice{
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

.li_choice:hover{
    background-color: #edeef0;
}

.li_choice.selected{
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