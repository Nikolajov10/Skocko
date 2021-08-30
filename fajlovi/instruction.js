$(document).ready(function() {
    $("input").click(function() {
        let igr1=document.getElementById("Igrac1").checked;
        let igr2=document.getElementById("Igrac2").checked;
        if (igr1 && igr2){
            window.location.href="skocko-settings.html";
        }
    });
});
function inic() {
    document.getElementById("Igrac1").checked=false;
    document.getElementById("Igrac2").checked=false;
}