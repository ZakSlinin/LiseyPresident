var point = document.getElementById('point');
var lowPlateDate = document.getElementById('lowPlateDate');
var currentDate;
var endDate = new Date(2024, 8, 18, 20, 0, 0);
if (lowPlateDate) {
    lowPlateDate.innerHTML = endDate.getFullYear() + ' ' + endDate.getMonth() + ' ' + endDate.getDate() + ' ' + endDate.getHours();
}
function getCurrentDate() {
    currentDate = new Date();
    var currentPosAndDate = Number((30 - Math.round((endDate.getTime() - currentDate.getTime()) / 1000)));
    if (currentPosAndDate > -30) {
        currentPosAndDate = currentPosAndDate * -1;
    }
    if (currentPosAndDate < -300) {
        currentPosAndDate = -320;
    }
    while (currentPosAndDate >= -30) {
        currentPosAndDate -= 30;
    }
    console.log(currentPosAndDate);
    if (point) {
        point.style.top = currentPosAndDate + 'px';
        if (currentPosAndDate >= -40 && currentPosAndDate < -320) {
            point.style.width = '24px';
            point.style.height = '24px';
        }
        else if (-40 > currentPosAndDate && currentPosAndDate >= -320) {
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