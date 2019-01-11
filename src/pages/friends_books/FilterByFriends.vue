<template>
    <div>
        <div id="filter_commands">
            <ul>
                <li
                        @click="clearFriendsFilter"
                        v-bind:class="{ selected: filterStatus == FILTER_STATUS_ALL }"
                        class="li_choice"
                >
                    Все
                </li>
            </ul>
        </div>
        <div id="cities">
            <ul>
                <li
                        v-for="city in generateCitiesList"
                        @click="cityFilterChoice(city)"
                        v-bind:class="{ selected: filterStatus == FILTER_BY_CITY &&  filterId==city.id}"
                        class="li_choice"
                >
                    {{ city.title }}
                </li>
            </ul>
        </div>
        <div id="friends_list_list">
            <ul>
                <li
                        v-for="friendsList in friends_list_list"
                        @click="friendListFilterChoice(friendsList)"
                        v-bind:class="{ selected: filterStatus == FILTER_BY_FRIENDS_LIST &&  filterId==friendsList.id}"
                        class="li_choice"
                >
                    {{ friendsList.title }}
                </li>
            </ul>
        </div>
        <div id="friends_list">
            <ul>
                <li
                        v-for="friend in friends_list"
                        @click="friendFilterChoice(friend)"
                        v-bind:class="{ selected: filterStatus == FILTER_BY_FRIEND &&  filterId==friend.id}"
                >
                    <img :src="friend.image" :alt="friend.name">
                    <span>{{ friend.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
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
                filterCityId: "",
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
                        image: "https://pp.userapi.com/c630716/v630716015/559f0/cUjWkUZTZqI.jpg?ava=1",
                        city: {
                            id: "1",
                            title: "Уфа"
                        }
                    },
                    {
                        id: "2",
                        name: "Ришат Галин",
                        image: "https://m.vk.com/images/camera_100.png?ava=1",
                        city: {
                            id: "1",
                            title: "Уфа"
                        }
                    },
                    {
                        id: "3",
                        name: "Руслан Билалов",
                        image: "https://pp.userapi.com/c836120/v836120064/234f/IfGZCWGnXtc.jpg?ava=1",
                        city: {
                            id: "2",
                            title: "Москва"
                        }
                    },
                ]
            }
        },
        methods: {
            clearFriendsFilter: function () {
                this.setFilter(FILTER_ALL, []);
                this.filterStatus = FILTER_ALL;
            },
            friendFilterChoice: function (friend) {
                this.setFilter(FILTER_BY_FRIEND, friend.id);
                this.filterStatus = FILTER_BY_FRIEND;
                this.filterId = friend.id;
            },
            friendListFilterChoice: function (friendList) {
                this.setFilter(FILTER_BY_FRIENDS_LIST, friendList.list);
                this.filterStatus = FILTER_BY_FRIENDS_LIST;
                this.filterId = friendList.id;
            },
            cityFilterChoice: function (city) {
                this.setFilter(FILTER_BY_CITY, city.id);
                this.filterStatus = FILTER_BY_CITY;
                this.filterId = city.id;
            }
        },
        computed: {
            generateCitiesList: function () {
                let sortByOccurrence = function (originArray) {
                    let s = originArray.reduce(function (m, v) {
                        m[v] = (m[v] || 0) + 1;
                        return m;
                    }, {}); // builds {2: 4, 4: 2, 6: 3}
                    let a = [];
                    for (let k in s) a.push({k: k, n: s[k]});
                    // now we have [{"k":"2","n":4},{"k":"4","n":2},{"k":"6","n":3}]
                    a.sort(function (a, b) {
                        return b.n - a.n
                    });
                    return a.map(function (a) {
                        return a.k
                    });
                };

                let citiesNotOrdered = Array.from(this.friends_list, x => x.city);
                let citiesIdsOrdered = sortByOccurrence(
                    Array.from(citiesNotOrdered, x => x.id)
                );

                let citiesDict = {};
                for (let city of citiesNotOrdered) {
                    citiesDict[city.id] = city;
                }

                let cities = Array.from(citiesIdsOrdered, id => citiesDict[id]);
                return cities;
            }
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