let endDate: Date = new Date(2024, 9, 1, 0, 0, 0);

function countdown() {
    let currentDate: Date = new Date();
    let timeRemaining: number = endDate.getTime() - currentDate.getTime();

    if (timeRemaining <= 0) {
        changeForVoteEndElement(`Countdown Over!`)
    } else {
        let days: number = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        let hours: number = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes: number = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

        changeForVoteEndElement(`${days} : ${hours} : ${minutes}`)
    }
}

function changeForVoteEndElement(data: string) {
    document.getElementById("forVoteEnd").innerHTML = data;
}
countdown()
setInterval(countdown, 60000);