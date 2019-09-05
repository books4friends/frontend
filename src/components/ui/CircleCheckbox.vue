<template>
<div @click="onClick" class="circle-checkbox" v-bind:class="{ selected: selected }"></div>
</template>
​
<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true
    },
    selected: {
        type: Boolean,
        required: false,
        default: false
    }
  }
}
</script>


<style scoped>
.circle-checkbox{
    position: absolute;
    right: 25px;
    margin: 6px 5px 0 0;
    width: 22px;
    height: 22px;
    background: #fff;
    box-shadow: 0 0 0 1px #c4ccd4 inset;
    border-radius: 100%;
    cursor: pointer;
}
.circle-checkbox.selected{
    background: url(../../assets/images/selected.png) no-repeat 0;
    box-shadow: none;
}
.circle-checkbox:after:after{
    content: '.';
    display: block;
    height: 0;
    font-size: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
}
</style>