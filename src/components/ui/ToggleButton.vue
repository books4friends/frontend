<template>

    <div class="toggle">
        <slot>Text</slot>
        <div @click="onClick" v-bind:class="{ selected: selected }"></div>
    </div>
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

.toggle{
    color: #939393;
    line-height: 19px;
    width: 170px;
    font-size: 13px;
}

.toggle > span{
    margin-right: 5px;
}

.toggle > div{
    width: 28px;
    height: 9px;
    border-radius: 45px;
    background-color: #ced7e0;
    cursor: pointer;
    line-height: 19px;
    display: inline-block;
}
.toggle > div:after {
    content: '';
    position: relative;
    float: left;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 1px solid #b4bfcc;
    border-top-color: rgb(180, 191, 204);
    border-top-style: solid;
    border-top-width: 1px;
    border-right-color: rgb(180, 191, 204);
    border-right-style: solid;
    border-right-width: 1px;
    border-bottom-color: rgb(180, 191, 204);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-left-color: rgb(180, 191, 204);
    border-left-style: solid;
    border-left-width: 1px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    background-color: #fff;
    top: -3px;
    left: 0;
    -o-transition: left 0.1s ease;
    transition: left 0.1s ease;
}


.toggle > div.selected{
    background-color: #bccde0;
}
.toggle > div.selected:after {
    background-color: #5181b8;
    border-color: #5181b8;
    border-top-color: rgb(81, 129, 184);
    border-right-color: rgb(81, 129, 184);
    border-bottom-color: rgb(81, 129, 184);
    border-left-color: rgb(81, 129, 184);
    left: 13px;
}
</style>