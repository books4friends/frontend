<template>
    <div id="navigation">
        <div id="center">
            <router-link  class="menu" to="/app/">{{ $t('navigation.friends_books') }}</router-link>

            <router-link class="menu route push" to="/app/my-books/">{{ $t('navigation.my_books') }}</router-link>
            <div class="dropdown">
                <div
                        class="menu dropdown-opener" v-bind:class="{active:menuShown}"
                        @click="invertDropdown"
                        v-click-outside="hideDropdown"
                >
                    ☰
                </div>
                <div v-if="menuShown" class="dropdown-content">
                    <div class="dropdown-content-inner">
                        <router-link class="menu route" to="/app/settings/">{{ $t('navigation.settings') }}</router-link>
                        <router-link class="menu route" to="/app/about/">{{ $t('navigation.about_project') }}</router-link>
                        <router-link class="menu route" to="/app/my-borrows/">{{ $t('navigation.my_borrows') }}</router-link>
                        <div class="menu" @click="logout">{{ $t('navigation.logout') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import ClickOutside from 'vue-click-outside'

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

    export default {
        data: () => {
            return{
                menuShown: false,
            }
        },
        methods: {
            invertDropdown: function(){
                this.menuShown ? this.hideDropdown() : this.showDropdown()
            },
            showDropdown: function(){
                this.menuShown = true
            },
            hideDropdown: function(){
                this.menuShown=false
            },
            logout: function(){
                axios.post(process.env.VUE_APP_SERVER_URL + 'logout/').then(() => {
                    window.location.href = process.env.VUE_APP_SERVER_URL + ''
                })
            }
        },

        directives: {
            ClickOutside
        }
    }

</script>

<style scoped>
#navigation{
    position: fixed;
    width: 100%;
    z-index: 1;
    background-color: var(--primary-color);
    border-bottom: 1px solid var(--primary-border-color);
    box-shadow: 0 0 3px 0 var(--primary-border-color);
    user-select:none;
}

#center{
   display: flex;
   max-width: 800px;
   margin: auto;
}

.menu{
    color: #ffffff;
    padding: 0 15px;
    font-weight: 400;
    line-height: 50px;
    font-size: 20px;
    text-align: center;
    font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    cursor: pointer;
    text-decoration: none;
}

.menu.route:hover, .dropdown-opener.active{
    background-color: var(--primary-hover-color);
}

.push {
    margin-left: auto;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content{
    display: block;
    position: absolute;
    width: 150px;
    right: -3px;
    overflow: hidden;
}

.dropdown-content-inner{
    margin: 0 3px 3px 3px;
    background-color: var(--sub-color);
    box-shadow: 0 0 3px 0 var(--primary-border-color);
    border: 1px solid var(--primary-border-color);
    border-top: 0;
}

.dropdown-content .menu{
    display: block;
}

.router-link-exact-active.route, .router-link-exact-active.route:hover{
    background-color: var(--primary-hover-color);
}
</style>