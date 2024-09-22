var point = document.getElementById('point');
var lowPlateDate = document.getElementById('lowPlateDate');
var currentDate;
var endDate = new Date(2024, 8, 22, 12, 30, 0);
var lowerLimit = -60;
var upperLimit = -620;
if (lowPlateDate) {
    lowPlateDate.innerHTML = endDate.getFullYear() + ' ' + endDate.getMonth() + ' ' + endDate.getDate() + ' ' + endDate.getHours();
}
function getCurrentDate() {
    currentDate = new Date();
    var currentPosAndDate = Number((30 - Math.round((endDate.getTime() - currentDate.getTime()) / 1000)));
    if (currentPosAndDate > lowerLimit) {
        currentPosAndDate = currentPosAndDate * -1;
    }
    if (currentPosAndDate < upperLimit + 10) {
        currentPosAndDate = upperLimit;
    }
    while (currentPosAndDate >= lowerLimit) {
        currentPosAndDate -= 30;
    }
    console.log(currentPosAndDate);
    if (point) {
        point.style.top = currentPosAndDate + 'px';
        if (lowerLimit <= currentPosAndDate && currentPosAndDate > upperLimit) {
            point.style.width = '24px';
            point.style.height = '24px';
        }
        else if (lowerLimit > currentPosAndDate && currentPosAndDate <= upperLimit) {
            point.style.width = '12.5px';
            point.style.height = '12.5px';
        }
        else {
            var dataOfPoint = [
                point.style.width,
                point.style.height,
                point.style.top,
            ];
            console.error('Error of current position of Point');
            console.table(dataOfPoint);
            console.log(currentPosAndDate);
        }
    }
}
setInterval(getCurrentDate, 1000);
