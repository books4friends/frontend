<template>
    <div :style="style"></div>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                required: false,
                default: '#eee'
            }
        },
        computed: {
          style () {
            return 'border-top: 1px solid '+  this.color;
          }
        }
    }
</script>