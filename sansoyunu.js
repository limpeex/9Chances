const baslamaButonu = document.querySelector("#baslamaButonu");
const bitirmeButonu = document.querySelector("#bitirmeButonu");
const anlikBakiyeSpan = document.querySelector("#bakiye");
let bahisDegeri = document.querySelector("#bahisDegeri");
let baslayabilir = true;
const butonListesi = new Array();
let anlikBakiyeInt = parseInt(anlikBakiyeSpan.innerText);
let anlikPara = anlikBakiyeInt;
let deneme = 1;
let bittiMi = false;


for (let i = 0; i < 9; i++) {
    butonListesi[i] = document.querySelector(`#button${i + 1}`);
}

const diziKopya = [...butonListesi];

for (let i = 0; i < 9; i++) {
    butonListesi[i].addEventListener("click", butonTikla);
}


function rastgeleIndex(dizi) {
    for (let i = butonListesi.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = diziKopya[i];
        diziKopya[i] = diziKopya[j];
        diziKopya[j] = k;
    }
    for (let i = 0; i < 3; i++) {
        dizi[i] = diziKopya[i];
    }
    return dizi;
}

function butonTikla() {
    if (baslayabilir == false) {
        bittiMi = false;
        if (!bittiMi) {

            let sahipMi = false;
            let dizi = [...rastgeleIndex([])];
            for (let i = 0; i < dizi.length; i++) {
                if (this.id == dizi[i].id) sahipMi = true;
            }


            if (sahipMi) {
                this.style.backgroundColor = 'red'
                bittiMi = true;
                baslayabilir = true;
            }
            else this.style.backgroundColor = 'green';


            if (deneme === 9) {
                bittiMi = true;
            }
            else deneme++;

        }
    }
}


function clear() {
    for (let i = 0; i < butonListesi.length; i++) {
        butonListesi[i].style.backgroundColor = "initial";
    }
    bahisDegeri.value = "";
}

baslamaButonu.addEventListener("click", () => {

    if (baslayabilir) {
        bahisDegeriInt = parseInt(bahisDegeri.value);
        if (anlikPara >= bahisDegeriInt) {
            
            bahisDegeriInt = parseInt(bahisDegeri.value);
            baslayabilir = false;
            anlikPara -= bahisDegeriInt;
            anlikBakiyeSpan.innerText = `${anlikPara}`
            clear();
            alert("Oyuna başlamış bulunuyorsunuz");
        }else {
            alert("Bakiyeniz yeterli değil");
        }

    } else {
        alert("Şu anda oyun zaten oynanıyor!");
    }
});


bitirmeButonu.addEventListener("click", () => {
    if (!baslayabilir) {
        bittiMi = true;
        let sayi = 0;
        for (let i = 0; i < butonListesi.length; i++) {
            if (butonListesi[i].style.backgroundColor == "green")
                sayi++;
        }
        anlikPara = anlikPara + bahisDegeriInt + (sayi * (bahisDegeriInt * 1.2));
        anlikBakiyeSpan.innerText = anlikPara;
        baslayabilir = true;
        clear();
    } else {
        console.log("Henüz oyun başlamadı...")
    }
});



