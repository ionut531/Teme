var produse = [];
var i = window.location.search.substring(4);

async function draw() {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/produse/${i}.json`);
    window.produse = await response.json();
    document.querySelector(".backgroundLoader").classList.add("hidden");
    var str = "";

    str += `
        <div class="col-lg-12 col-sm-12 col-xs-12 product">
            <div id="imgBox">
                <img class="imgProd" src="../poze/${produse.imagine}" alt="${produse.nume}">
            </div>
            <div class="prodDetails">
                <div class="infoProducts">
                    <p id="nameObj">${produse.nume}</p>
                    <span id="price">${produse.pret} </span> <span>Lei</span> </br> </br>
                    <span id="stoc">In stoc:${produse.stoc}</span> </br> </br>
                    <span >Cantitate:</span> <input id="cantitate" type="number"  value="1" min="1" max="${produse.stoc}"> </br> </br>
                    <button onclick="cos(event,'${i}')" id="addButton">Adauga in cos</button>
                </div>
                
            </div>
        </div>

    `
    document.querySelector("#showInfo").innerHTML = str;
}

/**async function cos() {

    var obj = {
        imagine: product.imagine,
        nume: product.nume,
        pret: product.pret,
        stoc: product.stoc,
        cantitate: document.querySelector("[name='quantity']").value
    }
    var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/cos/${i}.json`, {
        method: "put",
        body: JSON.stringify(obj)
    });
    alert("Ai adaugat in cos")
} */


async function cos(event, i) {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/cos/${i}.json`);
    document.querySelector(".backgroundLoader").classList.add("hidden");
    productCos = await response.json();
    var found = false;
    var val = document.querySelector("#cantitate").value;
    if (productCos !== null) {
        if (confirm("Produsul a mai fost adaugat in cos. Esti sigur ca vrei sa continui?")) {
            if (parseInt(val) + parseInt(productCos.cantitate) <= produse.stoc) {
                productCos.cantitate = parseInt(productCos.cantitate) + parseInt(document.querySelector("#cantitate").value);
                var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/cos/${i}/cantitate.json`, {
                    method: "put",
                    body: productCos.cantitate
                });
            } else {
                alert('Cantitatea selectata depaseste stocul existent!');
            }

        }

    } else if (parseInt(val) <= produse.stoc) {
        var obj = {
            imagine: produse.imagine,
            nume: produse.nume,
            pret: produse.pret,
            stoc: produse.stoc,
            cantitate: document.querySelector("#cantitate").value

        }
        document.querySelector(".backgroundLoader").classList.remove("hidden");
        var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/cos/${i}.json`, {
            method: "put",
            body: JSON.stringify(obj)

        });
        document.querySelector(".backgroundLoader").classList.add("hidden");
        alert("Produsul a fost adaugat in cos")

    } else {
        alert('Cantitatea selectata depaseste stocul existent!');
    }
}
