let nameToGet = ''
let candidateData = {
    name: "test",
    surname: "testorov",
    grade: "11A",
    description:
        "long long long long long long long long long long long long long long test description",
    photo: File,
    video: File
}
if (window) window.onload =
function getDataFromLS() {
    nameToGet = String(localStorage.getItem("SelectedCandidateName"))
    console.log(nameToGet)
    if (localStorage) {
        

        let link = 'https://www.kringeproduction.ru/candidates/'
        fetchCandidates(link)
    }
}
async function fetchCandidates(link) {
    response = await fetch(link, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            rightDataGetter(data)
        })
}
function rightDataGetter(data) {
    data.forEach(element => {
        nameOfELem = element.name
        if (nameOfELem === nameToGet) {
            dataSetter(data[data.indexOf(element)])
        }
    });
}
function dataSetter(data) {
    let fullName = [];
    fullName = String(data.name).split(' ')
    candidateData.name = fullName[0]
    candidateData.surname = fullName[1]
    candidateData.photo = itemPipe(data, 'photo');
    candidateData.video = itemPipe(data, 'video');
    candidateData.description = data.description;
    candidateData.grade = data.class_of_candidate;

    htmlSetter()
}
function itemPipe(data, key) {
    let item = data[key];
    if (item && item.startsWith('http://127.0.0.1:8001/')) {
        item = item.replace('http://127.0.0.1:8001/', 'https://www.kringeproduction.ru/files/');
    }
    return item;
}
function htmlSetter() {
    document.getElementById('candidateNameForCard').innerHTML = candidateData.name;
    document.getElementById('candidateNameAndSurname').innerHTML = candidateData.name + " " + candidateData.surname;
    document.getElementById('candidateDescriptionText').innerHTML = candidateData.description;
    document.getElementById('candidateGrade').innerHTML = candidateData.grade;
    document.getElementById('candidateImg').src = candidateData.photo;
}


function postVoteRouter() {
    let userCode = document.getElementById('userCode').value

    postVote(userCode, nameToGet)
}

function postVote(userCode, candidate) {
    console.log(userCode + ' ' + candidate)
    fetch('https://www.kringeproduction.ru/votes/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'key': userCode,
            'candidate': candidate
        })
    })
        .then(res => res.json())
        .then(data => donePopUp())
        .catch(error => errorPopUp());
}

function errorPopUp(error) {
    console.error(error)
    console.error(error.message)
    let popUp = document.getElementById('errorPopUp')

    popUp.style.display = 'flex'
    setTimeout(() => {
        let i = 1
        let interval = setInterval( () => {
            i -= 0.01
            popUp.style.opacity = i
            if (i <= 0) {
                clearInterval(interval)
                popUp.style.display = 'none'
            }
        }, 10)
    }, 3000)
}
function donePopUp() {
    let popUp = document.getElementById('donePopUp')

    popUp.style.display = 'flex'
}

function closePopUp() {
    let errorPopUp = document.getElementById('errorPopUp')
    let donePopUp = document.getElementById('donePopUp')

    if (errorPopUp.style.display === 'flex') {
        setDisplayNone(errorPopUp)
    }
    if (donePopUp.style.display === 'flex') {
        setDisplayNone(donePopUp)
    }
}

function setDisplayNone(item) {
    item.style.display = 'none'
}