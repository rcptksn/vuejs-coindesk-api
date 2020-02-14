export function getDateFormat(date) {
    let formatDate = new Date(Math.floor(date / 1000) * 1000);
    let year = formatDate.getFullYear();
    let month = formatDate.getMonth() + 1;
    month = month <= 9 ? "0" + month : month;
    let day = formatDate.getDate();
    day = day <= 9 ? "0" + day : day;
    let hours = formatDate.getHours();
    hours = hours <= 9 ? "0" + hours : hours;
    let minutes = formatDate.getMinutes();
    minutes = minutes <= 9 ? "0" + minutes : minutes;
    let seconds = formatDate.getSeconds();
    seconds = seconds <= 9 ? "0" + seconds : seconds;
    return  day + "." + month + "." + year + "  " + hours + ":" + minutes + ":" + seconds;
}