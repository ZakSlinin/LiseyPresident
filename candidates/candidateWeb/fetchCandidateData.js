let nameToGet = ''
let candidateCard = document.getElementById('candidateCard')
let candidateData = {
    name: "test",
    surname: "testorov",
    grade: "11A",
    description:
        "long long long long long long long long long long long long long long candidateWeb description",
    photo: File,
    video: File,
    userAttemptsLeft: 3
}
if (window) window.onload =
function getDataFromLS() {
    nameToGet = String(localStorage.getItem("SelectedCandidateName"))
    document.title = nameToGet;
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

    if (userCode.length === 8) postVote(userCode, nameToGet)
    else errorPopUp('Bad usercode')
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
        window.location.reload()
    }
    if (donePopUp.style.display === 'flex') {
        setDisplayNone(donePopUp)
    }
}

function setDisplayNone(item) {
    let i = 1
    let interval = setInterval( () => {
        i -= 0.05
        item.style.opacity = i
        if (i <= 0) {
            clearInterval(interval)
            item.style.display = 'none'
        }
    }, 10)
}

document.getElementById('viewVideoBtn').addEventListener('click', function() {
    document.getElementById('videoSource').src = candidateData.video;
    document.getElementById('candidateVideo').load();
    document.getElementById('videoPopup').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('videoPopup').style.display = 'none';
    setVideoTo0()
});

window.addEventListener('click', function(event) {
    const popup = document.getElementById('videoPopup');
    if (event.target === popup) {
        setVideoTo0()
        popup.style.display = 'none';
    }
});

function setVideoTo0() {
    document.getElementById('candidateVideo').pause()
    document.getElementById('candidateVideo').currentTime = 0
}