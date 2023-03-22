const getTimeToFormat = (time) => {
    console.log(time);
    let date = (time === 0 || time === undefined) ? new Date() : new Date(time);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = (date.getHours() <= 9 ? '0' : '') + date.getHours(); 
    let minute = (date.getMinutes() <= 9 ? '0' : '') + date.getMinutes(); 
    //let second = (date.getSeconds() <= 9 ? '0' : '') + date.getSeconds();
    return '' + year + '-' + (month<=9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day) + ' ' + hour + ':' + minute; // + ':' + second;
}

const currentDateTime = () => {
    let date    = new Date();
    let day     = date.getDate();
    let month   = date.getMonth() + 1;
    let year    = date.getFullYear();
    let hour    = (date.getHours() <= 9 ? '0' : '') + date.getHours(); 
    let minute  = (date.getMinutes() <= 9 ? '0' : '') + date.getMinutes(); 
    let second  = (date.getSeconds() <= 9 ? '0' : '') + date.getSeconds();
    return '' + year + '-' + (month<=9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day) + '-' + hour + '-' + minute + '-' + second;
}

export default {
	getTimeToFormat,
    currentDateTime
}