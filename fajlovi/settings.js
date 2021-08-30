let igrac1_potez=true;
let igrac2_potez=false;

let cnt1=0;
let cnt2=0;

let komb1="";
let komb2="";


$(document).ready(function() {
    $(".odabir").click(function() {
        let igr="#Igrac";
        if (igrac1_potez && cnt1<4){
            cnt1++;
            igr+="1"+cnt1;
            let string=$(this).find("img").attr("src");
            if (komb1!="") komb1+=",";
            komb1+=string.slice("skocko-dodatno".length+1,string.length-4);
            $(igr).text("").append(
                $("<img>").attr("src",$(this).find("img").attr("src"))
            );
        }
        else if(igrac2_potez && cnt2<4) {
            cnt2++;
            igr+="2"+cnt2;
            let string=$(this).find("img").attr("src");
            if (komb2!="") komb2+=",";
            komb2+=string.slice("skocko-dodatno".length+1,string.length-4);
            $(igr).text("").append(
                $("<img>").attr("src",$(this).find("img").attr("src"))
            );
        }
    });
    $(".btn").click(function() {
        let val=$(this).attr("value");
        let type=parseInt(val[val.length-1]);
        if (type==1) {
            if (val=="OK1") {
                if (cnt1<4) return;
                localStorage.setItem("Igrac1",komb1);
                $(".btns2").attr("disabled",false);
                $(".btns1").attr("disabled",true);
                igrac1_potez=false;
                igrac2_potez=true;
            }
            else {
                komb1="";
               for(let i=1;i<=cnt1;i++){
                   $("#Igrac1"+i).find("img").hide();
               }
               cnt1=0;
            }
        }
        else {
            if (val=="OK2") {
                localStorage.setItem("Igrac2",komb2);
                $(".btns2").attr("disabled",true);
                igrac1_potez=false;
                igrac2_potez=false;
                window.location.href="skocko-game.html";
            }
            else {
                komb2="";
               for(let i=1;i<=cnt2;i++){
                   $("#Igrac2"+i).find("img").hide();
               }
               cnt2=0;
            }
        }
    });
});