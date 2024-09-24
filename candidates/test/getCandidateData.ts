let candidateData = {
    'name': 'test',
    'surname': 'testorov',
    'grade': '11A',
    'description': 'long long long long long long long long long long long long long long test description',
    'photo': File
}

function getDataFromLS() {
    if (localStorage) {
        let nameToGet = localStorage.getItem('SelectedCandidateName');
        CandidateRouter(nameToGet)
    }
}
function CandidateRouter(name: string) {
    try {
        let link = 'https://www.kringeproduction.ru/candidates/'
        CandidateFetch
        fetch('http://example.com/movies.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    } catch {
        console.error('Failed');
    }
}
function CandidateFetch(link: string) {

}