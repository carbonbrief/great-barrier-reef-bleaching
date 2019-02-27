const iframe = $("#ai2html");
const path = "ai2html/el-nino-";

function changeIframeSrc (screenWidth) {

    if (screenWidth > 800) { 

        iframe.attr('src',path + "desktop.html");   
    
    } else if ((screenWidth > 450) && (screenWidth < 800)) {
    
        iframe.attr('src',path + "mobile.html");   

    } else {
    
        iframe.attr('src',path + "mobile-small.html");   

    }
}

changeIframeSrc(screenWidth);

window.addEventListener('resize', function() {

    screenWidth =  $(window).width();

    changeIframeSrc(screenWidth);

});