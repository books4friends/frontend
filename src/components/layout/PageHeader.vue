<template>
    <div id="navigation">
        <div id="center">
            <router-link  class="menu" to="/app/">Книги друзей</router-link>

            <router-link class="menu push" to="/app/my-books/">Мои книги</router-link>
            <div class="dropdown">
                <div
                        class="menu dropdown-opener" v-bind:class="{active:menuShown}"
                        @click="invertDropdown"
                        v-click-outside="hideDropdown"
                >
                    ☰
                </div>
                <div v-if="menuShown" class="dropdown-content">
                    <router-link class="menu" to="/app/settings/">Настройки</router-link>
                    <router-link class="menu" to="/app/about/">О проекте</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ClickOutside from 'vue-click-outside'

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
            }
        },

        directives: {
            ClickOutside
        }
    }

</script>

<style scoped>
#navigation{
    background-color: var(--primary-color);
    z-index: 1;
}

#center{
   display: flex;
   width: 800px;
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

.menu:hover, .dropdown-opener.active{
    background-color: #3d6898;
}

.push {
    margin-left: auto;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content{
    background-color: var(--primary-color);
    right: 0;
    display: block;
    position: absolute;
    width: 150px;
}

.dropdown-content .menu{
    display: block;
}

.router-link-exact-active, .router-link-exact-active:hover{
    background-color: #335e8f;
}
</style>