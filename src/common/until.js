const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();;
    const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const second = date.getSeconds();
    return year + "年" + month + "月" + day + "日" + hour + ":" + minute;
   // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

// const formatNumber = n => {
//     n = n.toString();
//     return n[1] ? n : '0' + n
// };

const systemType = n => {
    let agent = navigator.userAgent.toLowerCase();
    let android = agent.indexOf("android");
    let iphone = agent.indexOf("iphone");
    let ipad = agent.indexOf("ipad");
    if(android != -1){
        n = "android";
    }
    if(iphone != -1 || ipad != -1){
        n = "ios";
    }
    return n;
};

module.exports = {
    formatTime: formatTime,
    systemType: systemType
};
