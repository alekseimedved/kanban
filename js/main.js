$(document).ready(function () {
    if (!window.sessionStorage && window.localStorage) {
        alert('Смените браузер, локальное хранилище не поддерживается');
    }
});