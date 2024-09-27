let mainHTML = document.getElementById('main')

let candidateData = {
    fullName: "test",
    grade: "11A",
    photo: File,
}
class candidateCard {
    constructor(name, photo, grade) {
        this.candidateName = name;
        this.candidatePhoto = photo;
        this.candidateGrade = grade;
    }

    createCard() {
        let div = document.createElement(
            "div"
        )
        let h1 = document.createElement("h1");
        h1.innerText = this.candidateName;
        h1.classList.add('candidateName')
        let img = document.createElement('img')
        img.src = this.candidatePhoto
        img.classList.add('candidatePhoto')
        let grade = document.createElement('h2');
        grade.innerText = this.candidateGrade;
        grade.classList.add('candidateGrade')

        div.appendChild(h1);
        div.appendChild(img);
        div.appendChild(grade);

        mainHTML.append(div);
        this.addFunctions(div, h1.innerText)
    }
    addFunctions(div, candidateName) {
        div.onclick = function () {
            localStorage.clear()
            localStorage.setItem('SelectedCandidateName', String(candidateName))
            window.location = 'candidateWeb/index.html'
        }
    }
}
async function fetchAllCandidates(link) {
    response = await fetch(link, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            candidateClassCreator(data)
        })
}
function candidateClassCreator(data) {
    data.forEach(element => {
        dataSetter(element)
    });
}
function dataSetter(data) {

    let fullName = [];
    fullName = String(data.name).split(' ')

    candidateData.fullName = fullName[0] + ' ' + fullName[1]
    candidateData.photo = itemPipe(data, 'photo');
    candidateData.grade = data.class_of_candidate;

    let candidate = new candidateCard(candidateData.fullName, candidateData.photo, candidateData.grade);
    candidate.createCard()
}
function itemPipe(data, key) {
    let item = data[key];
    if (item && item.startsWith('http://127.0.0.1:8001/')) {
        item = item.replace('http://127.0.0.1:8001/', 'https://www.kringeproduction.ru/files/');
    }
    return item;
}
fetchAllCandidates('https://www.kringeproduction.ru/candidates/')
