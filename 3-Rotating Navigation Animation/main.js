// console.log('day3');

const btnOpen = document.getElementById('open');
const btnClose = document.getElementById('close');
const container = document.querySelector('.container');

console.log(container)
function rotateFun() {
    container.classList.toggle('rotate');
}

btnOpen.addEventListener('click', rotateFun, false);

btnClose.addEventListener('click', rotateFun, false);
