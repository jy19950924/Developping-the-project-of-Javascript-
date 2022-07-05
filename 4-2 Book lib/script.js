
let addButton = document.getElementById('add');
let checkButton = document.getElementById('check');
let table = document.querySelector('table');

let checkHTML = '<i id="delete" class="fa-solid fa-circle-minus"></i>'
let checkNum = 0;
const booksUrl = 'http://www.liulongbin.top:3006';

function getBookList() {
    let getBooks = new XMLHttpRequest();
    getBooks.open('GET', `${booksUrl}/api/getbooks`);
    getBooks.send();
    getBooks.onreadystatechange = function () {
        if (getBooks.readyState === 4 && getBooks.status === 200) {
            const books = JSON.parse(getBooks.responseText).data;
            books.forEach(book => {
                table.insertRow();
                let len = table.rows.length;
                Object.values(book).forEach((value, index) => {
                    table.rows[len - 1].insertCell();
                    table.rows[len - 1].cells[index].innerText = value;
                });
                table.rows[len - 1].insertCell();
                const lastCell = table.rows[len - 1].cells.length;
                table.rows[len - 1].cells[lastCell - 1].innerHTML = checkHTML;
            });
        }
    }
}

getBookList();

addButton.addEventListener('click', function () {
    console.log('html')
    table.insertRow();
    let len = table.rows.length;
    let keyNum = table.rows[0].cells.length;
    for (let i = 0; i < keyNum; i++) {
        table.rows[len - 1].insertCell()
        table.rows[len - 1].cells[i].contentEditable = true;
        if (i === 0) {
            table.rows[len - 1].cells[i].innerText = len;
        }
    }

    checkButton.style.display = 'inline';
}, false);

// deleteButton.addEventListener('click', function () {
//     console.log()
//     console.log("delete");

// }, false);

checkButton.addEventListener('click', function () {
    const len = table.rows.length;
    const bookInfo = table.rows[len - 1].cells;
    const bookName = bookInfo[1].innerText;
    const author = bookInfo[2].innerText;
    const publisher = bookInfo[3].innerText;
    console.log('bookInfo', bookInfo)
    console.log('bookName', bookName)
    console.log('author', author)
    console.log('publisher', publisher)
    let addBook = new XMLHttpRequest();
    addBook.open('POST', `${booksUrl}/api/addbook`);
    addBook.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    addBook.send(`bookname=${bookName}&author=${author}&publisher=${publisher}`);
    console.log(addBook)
    addBook.onreadystatechange = function () {
        if (addBook.readyState === 4 && addBook.status === 200) {
            console.log(addBook.responseText)
            checkButton.style.display = "none";
        }
    }
}, false);
