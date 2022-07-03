// console.log('Progress Steps');

let stageList = document.querySelectorAll('.stage');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');
let process = document.querySelector('.process');


// console.log('nextBtn', nextBtn)
// console.log('stageList', stageList)
// console.log('prevBtn', prevBtn)
// console.log('process', process)

let curStage = 0;

nextBtn.addEventListener('click', function () {
    curStage++;
    stageList[curStage].classList.add('active');
    refresh();
}, false);
prevBtn.addEventListener('click', function () {
    stageList[curStage].classList.toggle('active');
    curStage--;
    refresh();
}, false);
prevBtn.disabled = true;

function refresh() {

    let activeList = document.querySelectorAll(".active");
    // console.log('activeList', activeList)
    process.style.width = (activeList.length - 1) / (stageList.length - 1) * 100 + '%';

    if (curStage <= 0) {
        prevBtn.disabled = true; // 禁用按钮
        curStage = 0;
    } else if (curStage >= stageList.length - 1) {
        curStage = stageList.length - 1;
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
        prevBtn.disabled = false;
    }

}