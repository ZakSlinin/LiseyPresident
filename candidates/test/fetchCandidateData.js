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
            console.log(data)
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
    console.log(fullName)
    candidateData.name = fullName[0]
    candidateData.surname = fullName[1]
    candidateData.photo = itemPipe(data, 'photo');
    candidateData.video = itemPipe(data, 'video');
    candidateData.description = data.description;

    console.log(candidateData)
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
    document.getElementById('candidateGrade').innerHTML = candidateData.description;
    document.getElementById('candidateImg').src = candidateData.photo;
    // document.getElementById('candidateVideo').src = candidateData.video;
}