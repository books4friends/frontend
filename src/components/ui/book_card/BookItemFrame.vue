<template>
    <div class="item">
        <slot></slot>
    </div>
</template>

<style scoped>
    .item{
        display: flex;
        flex-direction: column;
        flex: 0 1 40%;
        border: 1px solid #5181b8;
        box-shadow: 0px 1px 4px rgba(160, 160, 199, 0.38);
        border-radius: 4px;
        box-sizing: border-box;
        transition: box-shadow 300ms;
        align-self: start;
    }
</style>