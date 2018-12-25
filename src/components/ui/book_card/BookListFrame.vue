<template>
    <div class="list">
        <slot></slot>
    </div>
</template>

<style scoped>
    .list{
        display: grid;
        flex-wrap: wrap;
        grid-column-gap: 20px;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 20px;
        row-gap: 20px;
    }
</style>