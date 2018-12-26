<template>
    <div id="dialog-header">
        <div id="dialog-header-title">{{title}}</div>
        <div id="dialog_header-close" @click="cancelDialog"></div>
    </div>
</template>
​
<script>
export default {
  props: {
    cancelDialog: {
      type: Function,
      required: true
    },
    title: {
      type: String,
      required: true
    },
  }
}
</script>


<style scoped>

#dialog-header, #mb-friends_list_whitelist-header{
    background-color: #5b88bd;
    color: #fff;
    position: relative;
}

#dialog-header-title, #mb-friends_list_whitelist-header-title{
    padding-left: 25px;
    font-size: 14px;
    color: #fff;
    height: 54px;
    line-height: 54px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 250px;
    display: inline-block;
}

#dialog_header-close, #mb-friends_list_whitelist_header-close{
    float: right;
    padding: 21px 25px 21px 12px;
    background: url(../../../assets/images/close.png) no-repeat 12px 21px;
    width: 12px;
    height: 12px;
    opacity: 0.75;
    cursor: pointer;
    outline: none;
}

</style>