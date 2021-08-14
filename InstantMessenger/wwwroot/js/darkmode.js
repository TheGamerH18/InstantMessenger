const darkmode = document.querySelector(':root');
let darkmodeCounter = getCookieVal();

function getCookieVal() {
    if(!document.cookie.match("darkmodeCounter")) {
        
        let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if(matched) {
            document.cookie = "darkmodeCounter=0";
            return 0;
         } else {
            document.cookie = "darkmodeCounter=1";
            return 1;
        }
    } else {
        return readCookie("darkmodeCounter");
    }
};

function readCookie(cname) {
    var name = cname + "=";
    var decoded_cookie = decodeURIComponent(document.cookie);
    var carr = decoded_cookie.split(';');
    for(var i=0; i<carr.length;i++){
    var c = carr[i];
    while(c.charAt(0)==' '){
        c=c.substring(1);
    }
    if(c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
     }
     return "";
}

if(darkmodeCounter == "0") {
    darkmodeCounter = "1";
    changeDarkMode();
} else {
    darkmodeCounter = "0";
    changeDarkMode();
}

function changeDarkMode() {
    if(darkmodeCounter == "0") {
        darkmode.style.setProperty('--DarkMode', '100%');
        document.querySelector("#Darkmode").src = "fileadmin/img/night-mode.png";
        darkmodeCounter = "1";
        document.cookie = "darkmodeCounter=1"
    }
    else {
        darkmode.style.setProperty('--DarkMode', '0%');
        document.querySelector("#Darkmode").src = "fileadmin/img/brightness.png";
        darkmodeCounter = "0";
        document.cookie = "darkmodeCounter=0"
    }
}