/*
    SCRIPTS
    1. AOS animation library initialization
    2. Show actual webpage content instead of loader
    3. Smartphone patch  - Detection
    4. Scroll animation
*/
var touchSupport, height;
var debug = true;
window.onload = function(){
    touchSupport = is_touch_device();
    height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight; 

    // 1.
    AOS.init();
    // 2.
    loaderFix();

    //3.
    smartphoneInit(touchSupport);

    //4.
    viewportFix(touchSupport);
    
    //Log
    console.log(
        "Hansen website v1.1 (14.02.2019)"
    );
}
//  2. Show actual webpage content instead of loader on window load
function loaderFix() {
    document.body.style.backgroundImage="url('img/background.gif')";
    document.getElementById('page-loader').style.display="none";
    document.getElementById('ep-player').src="https://bandcamp.com/EmbeddedPlayer/album=980043782/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/";

};

// 3. Smartphone patch - detection 
function is_touch_device() {
var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
var mq = function(query) {
return window.matchMedia(query).matches;
}

if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
return true;
}
var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
return mq(query);
}

function smartphoneInit(touchSupport){
    if(touchSupport){ //Mobile fix #1
        document.body.className = "touch"
    }
    else{
        document.body.className = "no-touch";
    }
}
//    4. Scroll animation

function updatePosition(){ //Triggered by body onscroll event
    if(!touchSupport){ //Mobile fix #2
    height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight; 
    }
    if(!touchSupport) //Dokud nezjistim, jak to udelat funkcni, tak zakazat pro mobily
    {
    var scroll = window.pageYOffset / height * 100; //scroll in vh
    document.getElementById('logo-section').style.top=(scroll * 0.6)+"vh";
    document.getElementsByClassName('social')[0].style.top = (scroll * -0.12)+"vh";
    //document.getElementsByClassName('expander')[0].style.height = (scroll * 0.2)+"vh";
        if(scroll>20){
            var element=document.getElementById('logo-section');
            var name='faded';
           var arr = element.className.split(" ");
            if (arr.indexOf(name) == -1) {
            element.className += " " + name;
            }
            
        }
    }
}

//      5. Phone fix #2
function viewportFix(touchSupport){ //Triggered on body load
    if(touchSupport||debug){
        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight; 
        var oneVh = height/100; //1 vh in pixels
        console.log("1 vh = "+oneVh+" px.");
        if (height>600){
            document.documentElement.style.fontSize= oneVh*2.5 + "px";
        }
    }
}

//      Kontakt
function selectText(containerid) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}

function makeContact(){
    var buttonElement=document.getElementById("kontakt-butt");
    var content="<span>kont"+"akt@h"+"ansen-band.cz</span>";
    buttonElement.innerHTML = content;
    buttonElement.style.textTransform="lowercase";
    buttonElement.style.userSelect="all";
    buttonElement.style.webkitUserSelect="all";
    buttonElement.onclick="";
    selectText('kontakt-butt');
}
function showOverlay(){
    document.getElementById('no-overlay').style.display="none";
    document.getElementById('overlay').style.display="";
    document.getElementById('overlay').className="visible";
}
function Download(url) {
    document.getElementById('hidden-iframe').src = url;
};
