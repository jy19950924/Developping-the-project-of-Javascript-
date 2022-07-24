
let number = document.querySelector('.number');
let bg = document.querySelector('.bg')
console.log('number', number)

let int = setInterval(blurring, 30);
let load = 0;
function blurring() {
    load++;

    if (load > 99) {
        clearInterval(int);
    }
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
    number.innerText = `${load}%`;
    number.style.opacity = scale(load, 0, 100, 1, 0);


}


const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}