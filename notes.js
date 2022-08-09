function loading() {
    document.getElementById('preloader').classList.add('hidden');
}

let themeVar = 0;
let clear = localStorage.getItem('clear');
if(clear==null){
    localStorage.clear();
    localStorage.setItem('clear',1);
    showNotes();
}

document.getElementById("switchTheme").addEventListener('click', changeTheme);
document.getElementById("switchThemeMoveBtn").addEventListener('click', changeTheme);
function changeTheme() {
    if (themeVar % 2 == 0) {
        document.getElementById('switchThemeMoveBtn').style.transform = 'translateX(15px)';
        document.getElementsByTagName('body')[0].style.background = 'linear-gradient(to top, rgb(203 24 36) 0%, #453a94 100%)';
        document.getElementsByTagName('body')[0].style.color = 'white';
        Array.from(document.getElementsByClassName('btn')).forEach(function (element) {
            element.classList.add('bg-slate-400');
        });
    }
    else {
        document.getElementById('switchThemeMoveBtn').style.transform = 'translateX(0px)';
        document.getElementsByTagName('body')[0].style.background = 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)';
        document.getElementsByTagName('body')[0].style.color = 'black';
        Array.from(document.getElementsByClassName('btn')).forEach(function (element) {
            element.classList.remove('bg-slate-400');
        });
    }
    themeVar++;
}
let j = 10000;
document.getElementById('nav_expand').addEventListener('click', expand);
function expand() {
    if (document.getElementById('bar2').classList.contains('hidden')) {
        document.getElementById('bar1').classList.remove('rotate-[-45deg]', 'translate-y-[0.45rem]', 'translate-x-[0.1rem]')
        document.getElementById('bar3').classList.remove('rotate-45', 'translate-x-[0.1rem]');
        document.getElementById('bar2').classList.remove('hidden');
        document.getElementById('switch_theme_btn').classList.remove('hidden');
        document.getElementById('search_bar').classList.remove('mt-[0.4rem]');
        document.getElementById('website_heading').classList.remove('translate-x-28');
        document.getElementById('search_bar').classList.add('-translate-y-20');
        document.getElementById('search_bar').classList.replace('flex', 'hidden');
    }
    else {
        document.getElementById('bar2').classList.add('hidden');
        document.getElementById('bar1').classList.add('rotate-[-45deg]', 'translate-y-[0.45rem]', 'translate-x-[0.1rem]')
        document.getElementById('bar3').classList.add('rotate-45', 'translate-x-[0.1rem]');
        document.getElementById('switch_theme_btn').classList.add('hidden');
        document.getElementById('search_bar').classList.add('mt-[0.4rem]');
        document.getElementById('website_heading').classList.add('translate-x-28');
        document.getElementById('search_bar').classList.remove('-translate-y-20');
        document.getElementById('search_bar').classList.replace('hidden', 'flex');
    }
}
let pinTestCase2;
showNotes();
document.getElementById('add_note').addEventListener('click', task);
function task() {
    let date = new Date();
    let day = date.getDate();
    let month = date.toLocaleString('defaut',{month:'long'});
    let weekdayArray = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let dayName = weekdayArray[date.getDay()];
    let year = date.getFullYear();
    let hours = date.toLocaleString('default',{ hour: 'numeric', minute: 'numeric', hour12: true});
    let dateString = day+" "+month+" "+dayName+" "+year+" "+hours;
    let inputTitle = document.getElementById('title');
    let inputNote = document.getElementById('note')
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let dates = localStorage.getItem('dates');
    if (notes == null) {
        notesObj = [];
        titlesObj = [];
        datesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles);
        datesObj = JSON.parse(dates);
    }
    if ((inputNote.value).length != 0) {
        notesObj.unshift(inputNote.value);
        titlesObj.unshift(inputTitle.value);
        datesObj.unshift(dateString);
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('titles', JSON.stringify(titlesObj));
    localStorage.setItem('dates', JSON.stringify(datesObj));
    inputNote.value = "";
    inputTitle.value = "";
    dateString = "";
    if (localStorage.getItem('pinvar') == 1) {
        pinNote(1001);
    }
    showNotes();
}
let pinvar = 0;
function showNotes() {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let dates = localStorage.getItem('dates');
    if (notes == null) {
        notesObj = [];
        titlesObj = [];
        datesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles);
        datesObj = JSON.parse(dates);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="shownotes m-2 mt-5 p-2 md:w-[46.5%] lg:w-[31%] md:h-72 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] backdrop-blur-[25px] rounded-lg bg-opacity-80 shadow-lg" id="${String.fromCharCode(index + 97)}">
    <div class="heading flex">
        <p class="title w-1/2 text-2xl mt-2 mb-4 font-semibold">${titlesObj[index]}</p>
        <div class="btns w-1/2 flex justify-end">
            <button class="pin w-12 shadow-xl border border-[rgba(255,255,255,0.1)] h-12 p-2 mx-2 rounded-full" title="Pin Note" id="${"pin" + index}"><img class="transition-all duration-300 w-7 h-7" src="images/pin.png" id="${index + 1000}" onclick="pinNote(this.id)" alt=""></button>
            <button class="edit w-12 h-12 p-2 mx-2 rounded-full shadow-xl border border-[rgba(255,255,255,0.1)]" title="Edit Note"><img class=" w-6 h-6 mx-auto" id="${index + j}" onclick="edit(this.id)" src="images/edit.png" alt=""></button>
        </div>
    </div>
    <div class="noteText overflow-x-hidden md:overflow-y-auto md:h-[8.5rem]" id="${String.fromCharCode(index + 65)}">${element}
    </div>
    <button class="btn deletenote font-medium p-2 bg-slate-300 border-white rounded-lg mt-3 mb-2 shadow-xl" id="${index}" onclick="deleteNote(this.id)" title="Delete Note">Delete Note</button>
    <button class="btn hidden savenote ml-[0.45rem] font-medium p-2 bg-slate-300 border-white rounded-lg mt-3 mb-2 shadow-xl" id="${index + 100000}" onclick="save(this.id)" title="Save Note">Save Note</button>
    <div class="text-xs ml-4 absolute right-[0.5rem] bottom-[0.35rem] inline-block">${datesObj[index]}</div>
    </div>`
    });
    let notesElement = document.getElementById('notes_element');
    if (notesObj.length != 0)
        notesElement.innerHTML = html;
    else
        notesElement.innerHTML = `<p class="text-xl p-2 ml-1 mt-4 font-semibold">Nothing to show! Use "Add Note" button to add notes.</p>`;
    if (localStorage.getItem('pinvar') == 1) {
        let pin = document.getElementById(1000);
        pin.classList.add("rotate-45")
        pin.parentElement.classList.add("bg-slate-300");
    }
    if (themeVar % 2 != 0) {
        Array.from(document.getElementsByClassName('btn')).forEach(function (element) {
            element.classList.add('bg-slate-400');
        });
    }
}


function edit(index) {
    document.getElementById(index-10000+100000).nextElementSibling.classList.add('hidden');
    document.getElementById(index).parentElement.classList.add('bg-slate-300')
    document.getElementById(index).classList.add('rotate-[360deg]', 'duration-300')
    let divElem = document.getElementById(String.fromCharCode(index - 10000 + 65));
    let divElemText = divElem.innerText;
    let textareaElem = document.createElement('textarea');
    textareaElem.classList.add('w-full', 'h-24', 'md:h-32', 'pl-2', 'pt-2', 'pb-2', 'mt-4', 'focus:outline-none', 'bg-white', 'backdrop-blur-md', 'bg-opacity-25', 'rounded-md');
    let textareaText = document.createTextNode(divElemText);
    textareaElem.appendChild(textareaText);
    (document.getElementById(String.fromCharCode(index - 10000 + 97))).replaceChild(textareaElem, divElem);
    (document.getElementById(index - 10000 + 100000)).classList.remove('hidden');
    // textareaElem.addEventListener('input',heightAutoGrow());
}
// function heightAutoGrow()
// {
//     textareaElem.style.height = "5px";
//     textareaElem.style.height = (textareaElem.scrollHeight)+"px";
//     console.log(textareaElem);
// }

function save(index) {
    document.getElementById(index).classList.add('hidden');
    document.getElementById(index).classList.add('hidden');
    let newString = (document.getElementById(String.fromCharCode(index - 100000 + 97))).firstElementChild.nextElementSibling.value;
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index - 100000, 1, newString);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if (notes == null) {
        notesObj = [];
        titlesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles);
    }
    if (index == 0) {
        if (localStorage.getItem('pinvar') == 1)
            localStorage.setItem('pinvar', 0);
    }
    notesObj.splice(index, 1);
    titlesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("titles", JSON.stringify(titlesObj));
    showNotes();
}
function pinNote(index) {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if (notes == null) {
        notesObj = [];
        titlesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles);
    }
    pinTestCase2 = index;
    if ((localStorage.getItem('pinvar') == 1) && (pinTestCase2 == 1000)) {
        let unpin = document.getElementById(1000);
        unpin.classList.remove("rotate-45")
        unpin.parentElement.classList.remove("bg-slate-300");
        localStorage.setItem('pinvar', 0);
    }
    else {
        notesObj.unshift(notesObj[index - 1000]);
        titlesObj.unshift(titlesObj[index - 1000]);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        localStorage.setItem("titles", JSON.stringify(titlesObj));
        pinvar = 1;
        localStorage.setItem('pinvar', pinvar);
        deleteNote(index - 999);
    }
}
let i = 0;
document.getElementById('search_mode_change').addEventListener('click', change_searchtype);
function change_searchtype() {
    if (i % 2 == 0)
        document.getElementById("input_search").placeholder = " Search with Note";
    else
        document.getElementById("input_search").placeholder = " Search with Title";
    i++;
}
let inputSearch = document.getElementById('input_search');
inputSearch.addEventListener('input', searchNoteTitle);
function searchNoteTitle() {
    let inputSearchText = inputSearch.value.toLowerCase();
    let noteBox = document.getElementsByClassName('shownotes');
    let noteBoxText;
    Array.from(noteBox).forEach(function (element) {
        if (i % 2 == 0) {
            noteBoxText = element.firstElementChild.innerText;
        }
        else {
            noteBoxText = element.lastElementChild.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        }

        if ((noteBoxText.toLowerCase()).includes(inputSearchText)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
}
let k = 0;
document.getElementById('search_mode_change_bigscreen').addEventListener('click', change_searchtype_bigscreen);
function change_searchtype_bigscreen() {
    if (k % 2 == 0)
        document.getElementById("input_search_bigscreen").placeholder = " Search with Note";
    else
        document.getElementById("input_search_bigscreen").placeholder = " Search with Title";
    k++;
}
let inputSearchBigScreen = document.getElementById('input_search_bigscreen');
inputSearchBigScreen.addEventListener('input', searchNoteTitleBigScreen);
function searchNoteTitleBigScreen() {
    let inputSearchText = inputSearchBigScreen.value.toLowerCase();
    let noteBox = document.getElementsByClassName('shownotes');
    let noteBoxText;
    Array.from(noteBox).forEach(function (element) {
        if (k % 2 == 0) {
            noteBoxText = element.firstElementChild.innerText;
        }
        else {
            noteBoxText = element.lastElementChild.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        }

        if ((noteBoxText.toLowerCase()).includes(inputSearchText)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
}
// function bookmark(index){
//     if(document.getElementById(index).parentElement.classList.contains('bg-slate-300'))
//     document.getElementById(index).parentElement.classList.remove('bg-slate-300');
//     else
//     document.getElementById(index).parentElement.classList.add('bg-slate-300')
// }