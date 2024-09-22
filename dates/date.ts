let point: HTMLElement | null = document.getElementById('point');
let lowPlateDate: HTMLElement | null = document.getElementById('lowPlateDate');
let currentDate: Date;
let endDate: Date = new Date(2024, 8, 22, 12, 0, 0);

if (lowPlateDate) {
    lowPlateDate.innerHTML = endDate.getFullYear() + ' ' + endDate.getMonth() + ' ' + endDate.getDate() + ' ' + endDate.getHours();
}

function getCurrentDate(): void {
    currentDate = new Date();
    let currentPosAndDate: number = Number((30 - Math.round((endDate.getTime() - currentDate.getTime()) / 1000)));
    if (currentPosAndDate > -30) {
        currentPosAndDate = currentPosAndDate * -1;
    }
    if (currentPosAndDate < -560) {
        currentPosAndDate = -560;
    }
    while (currentPosAndDate >= -30) {
        currentPosAndDate -= 30;
    }
    if (point) {
        point.style.top = currentPosAndDate + 'px';
        if (currentPosAndDate >= -40 && currentPosAndDate < -560) {
            point.style.width = '24px';
            point.style.height = '24px';
        } else if (-40 > currentPosAndDate && currentPosAndDate >= -560) {
            point.style.width = '12.5px';
            point.style.height = '12.5px';
        } else {
            let dataOfPoint = [
                point.style.width,
                point.style.height,
                point.style.top,
            ]
            console.error('Error of current position of Point')
            console.table(dataOfPoint)
            console.log(currentPosAndDate)
        }
    }
}
setInterval(getCurrentDate, 0.1);