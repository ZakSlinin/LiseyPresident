var candidateData = {
    'name': 'test',
    'surname': 'testorov',
    'grade': '11A',
    'description': 'long long long long long long long long long long long long long long test description',
    'photo': File
};
function getDataFromLS() {
    if (localStorage) {
        var nameToGet = localStorage.getItem('SelectedCandidateName');
        CandidateRouter(nameToGet);
    }
}
function CandidateRouter(name) {
    try {
        var link = 'https://www.kringeproduction.ru/candidates/';
        CandidateFetch;
        fetch('http://example.com/movies.json')
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            console.log(data);
        });
    }
    catch (_a) {
        console.error('Failed');
    }
}
function CandidateFetch(link) {
}
