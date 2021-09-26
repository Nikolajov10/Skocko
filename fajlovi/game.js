let pokusaji1=0;
let pokusaji2=0;
let vreme1=60;
let vreme2=60;
let turn=0;
let zapoceto=false;
let pozicija1=0;
let pozicija2=0;
let kraj=false;

let resenje1="";
let resenje2="";
let komb1=[];
let komb2=[];


function Restart() {
    pokusaji1=0;
    pokusaji2=0;
    vreme1=60;
    vreme2=60;
    document.getElementById("Vreme1").value=vreme1;
    document.getElementById("Vreme2").value=vreme2;
    $("#Start").attr("disabled",false);
    turn=0;
    zapoceto=false;
    kraj=false;
    pozicija1=0;
    pozicija2=0;
    $(".kolona").removeClass("bgYellow").removeClass("bgRed");
    //brisanje resenja
    for(let k=1;k<=2;k++) {
        let polje="#K"+k;
        for(let i=1;i<=4;i++){
            $(polje+i).find("img").hide();
        }
    }
    komb1=[];
    komb2=[];
    inic();
}
function inic() {
    resenje1=(localStorage.getItem("Igrac2")).split(",");
    resenje2=(localStorage.getItem("Igrac1")).split(",");
    for(let k=1;k<=2;k++){
        let redovi=$("#T"+k).find("tr");
        for(let i=0;i<redovi.length;i++){
            let kolone=$(redovi[i]).find("td");
            let min=0;
            for( let j=0;j<kolone.length;j++){
                $(kolone[j]).find("img").hide();
                if ($(kolone[j]).attr("class")=="fake") {
                    min=1;
                    continue;
                }
                $(kolone[j]).attr("id","Igrac"+k+i+(j-min));
            }
        }
    }
}

function Provera(igrac) {
    let kombinacija=komb1;
    let resenje=resenje1;
    if (igrac!=1) {
    kombinacija=komb2;
    resenje=resenje2;
    }
    let pogodjenih_na_mestu=0;
    let pogodjenih_van_mesta=0;
    let flags=[0,0,0,0];
    let flags2=[0,0,0,0];
    let cnt=0;
    for(let i=0;i<kombinacija.length;i++){
        if (kombinacija[i]==resenje[i]){
            pogodjenih_na_mestu++;
            flags[i]=1;
            flags2[i]=1;
            cnt++;
        }
    }
    for(let i=0;i<kombinacija.length;i++){
        if (flags[i]==1) continue;
        for(let j=0;j<resenje.length;j++){
            if (kombinacija[i]==resenje[j] && flags2[j]==0){
                pogodjenih_van_mesta++;
                flags2[j]=1;
                ++cnt;
                break;
            }
        }
        if (cnt==4) break;
    }
    let pogodjeno=false;
    if (pogodjenih_na_mestu==4) pogodjeno=true;
    let polje="#Igrac"+igrac;
    if (igrac==1) polje+=pokusaji1;
    else polje+=pokusaji2;
    let start=4;
    while (pogodjenih_na_mestu--){
        let polje2=polje+start++;
        $(polje2).addClass("bgRed");
    }
    while (pogodjenih_van_mesta--){
        let polje2=polje+start++;
        $(polje2).addClass("bgYellow");
    }
    return pogodjeno;
}

function crtajResenja() {
    let resenje=resenje1;
    for(let k=1;k<=2;k++) {
        let polje="#K"+k;
        if (k==2) resenje=resenje2;
        for(let i=1;i<=4;i++){
            let slika=$("<img>").attr("src","skocko-dodatno/"+resenje[i-1]+".png");
            $(polje+i).append(slika);
        }
    }
}


$(document).ready(function() {
    
    inic();

    setInterval(function() {
        if (zapoceto) {
            if (turn==0) {
                if (!vreme1) {
                    crtajResenja();
                    alert("Winner is player 2");
                    Restart();
                    return;
                }
                --vreme1;
                document.getElementById("Vreme1").value=vreme1;
            }
            else {
                if (!vreme2) {
                    crtajResenja();
                    alert("Winner is player 1");
                    Restart();
                    return;
                }
                --vreme2;
                document.getElementById("Vreme2").value=vreme2;
            }
        }
    },1000);

    $(".btn").click(function() {
        if ($(this).attr("value")=="start") {
            zapoceto=true;
            $(this).attr("disabled",true);
        }
        else {
            if (zapoceto || kraj) Restart();
        }
    });

    $(".odabir").click(function() {
        if (!zapoceto) return;
        let polje="#Igrac"+(turn+1);
        if (!turn) {
            polje+=pokusaji1;
            polje+=pozicija1;
        }
        else {
            polje+=pokusaji2;
            polje+=pozicija2;
        }
        let slika=$("<img>").attr("src",$(this).find("img").attr("src"));
        $(polje).append(slika);
        if (!turn) {
            let string=$(slika).attr("src");
            komb1.push(string.slice("skocko-dodatno".length+1,string.length-4));
            ++pozicija1;
            if (pozicija1==4){
                let pobeda=Provera(1);
                ++pokusaji1;
                pozicija1=0;
                turn=1;
                komb1=[];
                if (pobeda){
                    crtajResenja();
                    setTimeout(function(){alert("Pobednik je Igrac1");},1000);
                    zapoceto=false;
                    kraj=true;
                }
            }
        }
        else {
            ++pozicija2;
            let string=$(slika).attr("src");
            komb2.push(string.slice("skocko-dodatno".length+1,string.length-4));
            if (pozicija2==4){
                let pobeda=Provera(2);
                ++pokusaji2;
                pozicija2=0;
                turn=0;
                komb2=[];
                if (pokusaji2==7 || pobeda){
                    zapoceto=false;   
                    let string="DRAW!";
                if (pobeda) string="Winner is player 2!";
                kraj=true;
                crtajResenja();
                setTimeout(function() {alert(string);},1000)
                }
        }
    }});
});