<template>
    <div>
        <PrivacySetting />
        <FriendsWhitelist class="hiden"/>
        <FriendsListsWhitelist/>
    </div>
</template>

<script>
import FriendsListsWhitelist from './FriendsListsWhitelist.vue'
import FriendsWhitelist from './FriendsWhitelist.vue'
import PrivacySetting from './PrivacySetting.vue'
export default {
  name: 'App',
  components: {
    FriendsListsWhitelist,
    FriendsWhitelist,
    PrivacySetting
  }
}
</script>

<style scoped>

</style>