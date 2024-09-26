document.addEventListener('DOMContentLoaded', () => {
    const candidatesContainer = document.getElementById('candidates-container');

    fetch('https://www.kringeproduction.ru/candidates/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(candidate => {
                const candidateDiv = document.createElement('div');
                candidateDiv.classList.add('candidate-background');

                const photoDiv = document.createElement('div');
                photoDiv.classList.add('candidate-photo');
                const img = document.createElement('img');
                img.src = itemPipe(candidate.photo);
                photoDiv.appendChild(img);

                const buttonNameDiv = document.createElement('div');
                buttonNameDiv.classList.add('candidate-button-name');
                const nameH1 = document.createElement('h1');
                nameH1.classList.add('text-candidate');
                nameH1.textContent = candidate.name;

                const button = document.createElement('button');
                button.classList.add('to-know');
                button.textContent = 'Узнать';

                buttonNameDiv.appendChild(nameH1);
                buttonNameDiv.appendChild(button);

                candidateDiv.appendChild(photoDiv);
                candidateDiv.appendChild(buttonNameDiv);

                candidatesContainer.appendChild(candidateDiv);
                addFunctions(buttonNameDiv, nameH1.innerText)
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

function itemPipe(data) {
    let item = data;
    if (item && item.startsWith('http://127.0.0.1:8001/')) {
        item = item.replace('http://127.0.0.1:8001/', 'https://www.kringeproduction.ru/files/');
    }
    return item;
}

function addFunctions(div, candidateName) {
    div.onclick = function () {
        localStorage.clear()
        localStorage.setItem('SelectedCandidateName', String(candidateName))
        window.location = '../candidates/test/index.html'
    }
}