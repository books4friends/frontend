<template>
    <div id="mb-privacy_settings">
        <div id="mb-privacy_settings-left">
            <span>Кто видит список моих книг</span>
        </div>
        <div id="mb-privacy_settings-right">
            <select>
                <option value="all-friends">Только друзья</option>
                <option value="some-friends">Некоторые друзья</option>
                <option value="some-friends-list">Некоторые списки друзей</option>
            </select>
            <div id="mb-privacy_settings-accepted_list">Одноклассники, Семья</div>
        </div>
    </div>
</template>

<style scoped>
#mb-privacy_settings-left{
    width: 400px;
    display: inline-block;
    vertical-align: top;
}
#mb-privacy_settings-right {
    width: 350px;
    display: inline-block;

}

#mb-privacy_settings-right > select{
    width: 200px;
    font-size: 16px;
    height: 34px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    color: #2a5885;
    text-decoration: none;
    cursor: pointer;
}
#mb-privacy_settings-right > select:focus{
    outline: none;
}

#mb-privacy_settings-accepted_list{
    font-size: 12px;
}
</style>