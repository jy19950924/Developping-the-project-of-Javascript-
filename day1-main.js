// console.log('hello js')

let pictures = document.querySelectorAll("img");
console.log(pictures)
for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', function () {
        console.log(pictures.__proto__);

        pictures.forEach((ele) => {
            ele.classList.remove('active');
        });
        console.log(pictures);
        pictures[i].classList.toggle('active');

    }, false)
}
