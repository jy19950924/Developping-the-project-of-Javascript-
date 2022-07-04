let searchBtn = document.querySelector('i')
let inputBox = document.querySelector('.search')

// console.log(inputEle)
searchBtn.addEventListener('click', function () {
    document.getElementById('searchTxt').focus();
    inputBox.classList.toggle('active');
}, false);


