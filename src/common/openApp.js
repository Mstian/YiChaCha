// 打开APP
openApp = () => {
    let ua = navigator.userAgent.toLowerCase();
    console.log(ua);
    if(this.isWeixinBrowser(ua)){
        $('.layer').show();//遮罩层（使用外部浏览器打开，此处样式自行设定）
    }else{
        if(this.isAndroid(ua)){
            //android
            window.location = 'innersect://navigation?target=product&id=1747';
            let loadDateTime = Date.now();
            let turn = setTimeout(function(){
                let timeOutDateTime = Date.now();
                if ((timeOutDateTime - loadDateTime) < 1000 ){
                    window.location = 'https://fir.im/d7bc?utm_source=fir&utm_medium=qr&release_id=5b0bd16e959d6952471473bd'
                }
            },600);
        }else{
            //ios
            window.location = 'innersect://navigation?target=product&id=1747';
            let loadDateTime = Date.now();
            let turn = setTimeout(function(){
                let timeOutDateTime = Date.now();
                if ((timeOutDateTime - loadDateTime) < 1000 ){
                    window.location = 'itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1243476718';
                }
            },600);
        }
    }
};
isWeixinBrowser = ua => {
    return (/micromessenger/.test(ua)) ? true : false;
};
isAndroid = ua => {
    return ua.indexOf('android') > -1 || ua.indexOf('linux') > -1;
};
