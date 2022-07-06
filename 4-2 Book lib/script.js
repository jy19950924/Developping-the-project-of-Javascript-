
let addButton = document.getElementById('add');
let checkButton = document.getElementById('check');
let table = document.querySelector('table');

let deleteHTML = '<i style=":hover{}" class="fa-solid fa-circle-minus"></i>'
let checkNum = 0;
const booksUrl = 'http://www.liulongbin.top:3006';

function getBookList() {
    let getBooks = new XMLHttpRequest();
    getBooks.open('GET', `${booksUrl}/api/getbooks`);
    getBooks.send();
    getBooks.onreadystatechange = function () {
        if (getBooks.readyState === 4 && getBooks.status === 200) {
            const books = JSON.parse(getBooks.responseText).data;
            books.forEach((book) => {
                let curRow = table.insertRow();
                Object.values(book).forEach((value, index) => {
                    let cell = curRow.insertCell();
                    cell.innerText = value;
                });
                let deleteCell = curRow.insertCell();
                deleteCell.innerHTML = deleteHTML;

                //注册删除函数
                deleteCell.addEventListener('click', function () {
                    let deleteBook = new XMLHttpRequest();
                    let id = book.id;
                    deleteBook.open('GET', `${booksUrl}/api/delbook?id=${id}`);
                    deleteBook.send()
                    deleteBook.onreadystatechange = function () {
                        if (deleteBook.readyState === 4 && deleteBook.status === 200) {
                            console.log(deleteBook.responseText);
                            const curRowArray = Array.from(curRow.cells);
                            const bookIndex = Array.from(table.rows).findIndex((row) => {
                                return Array.from(row.cells).every((cell, index) => {
                                    return cell.innerText === curRowArray[index].innerText;
                                });
                            })
                            table.deleteRow(bookIndex);
                        }
                    }
                }, false);

            });
        }
    }
}



addButton.addEventListener('click', function () {
    let row = table.insertRow();
    let len = table.rows.length;
    let keyNum = table.rows[0].cells.length;
    for (let i = 0; i < keyNum; i++) {
        let cell = row.insertCell()
        cell.contentEditable = true;
    }

    checkButton.style.display = 'inline';
    addButton.disabled = true;
    checkButton.addEventListener('click', function () {
        const bookInfo = row.cells;
        const bookName = bookInfo[1].innerText;
        const author = bookInfo[2].innerText;
        const publisher = bookInfo[3].innerText;
        let addBook = new XMLHttpRequest();
        addBook.open('POST', `${booksUrl}/api/addbook`);
        addBook.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        addBook.send(`bookname=${bookName}&author=${author}&publisher=${publisher}`);
        console.log(addBook)
        addBook.onreadystatechange = function () {
            if (addBook.readyState === 4 && addBook.status === 200) {
                console.log(addBook.responseText)
                checkButton.style.display = "none";
                let curLen = row.cells.length;
                let deleteCell = row.cells[curLen - 1];
                deleteCell.innerHTML = deleteHTML;
                // clear property of the editable
                row.cells.forEach((cell) => {
                    cell.contentEditable = false;
                })
            }
        }
    }, false);
}, false);

getBookList();


