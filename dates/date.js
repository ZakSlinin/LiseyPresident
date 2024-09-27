var endDate = new Date(2024, 9, 1, 0, 0, 0);
function countdown() {
    var currentDate = new Date();
    var timeRemaining = endDate.getTime() - currentDate.getTime();
    if (timeRemaining <= 0) {
        changeForVoteEndElement("Countdown Over!");
    }
    else {
        var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        changeForVoteEndElement("".concat(days, " : ").concat(hours, " : ").concat(minutes));
    }
}
function changeForVoteEndElement(data) {
    document.getElementById("forVoteEnd").innerHTML = data;
}
countdown();
setInterval(countdown, 60000);
