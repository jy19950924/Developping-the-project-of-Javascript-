let searchBtn = document.querySelector('i')
let inputBox = document.querySelector('.search')

searchBtn.addEventListener('click', function () {
    document.querySelector('input').focus();
    inputBox.classList.toggle('active');
}, false);


