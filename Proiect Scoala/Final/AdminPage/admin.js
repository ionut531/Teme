async function drawT() {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/produse/.json`);
    window.list = await response.json();
    document.querySelector(".backgroundLoader").classList.add("hidden");
    var str = "";

    for (var i in list) {
        if (list[i] === null) continue;
        str += ` 
                    <tr>
                        <th id="imgProp" scope="row" name="imagine"> <img class="imgProd" src="../poze/${list[i].imagine}" alt="${list[i].nume}"></th>
                        <th scope="row" name="nume"><a href="detalii.html?id=${i}">${list[i].nume} </a></th>
                        <td name="pret">${list[i].pret} <span>Lei</span></td>
                        <td name="cantitate">${list[i].stoc}</td> 
                        <td>
                            <input type="button" value="Modifica" class="modBut" onclick="location.href='modifica.html?id=${i}'" onsubmit="">
                            <input type="button" value="Sterge" class="delBut" onclick="sterge(event,'${i}')">
                        </td>
                       
                    </tr>
    `
    }
    document.querySelector("#drawTable table tbody").innerHTML = str;
}

async function sterge(event, i) {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/produse/${i}.json`, {
        method: "delete",
    });
    document.querySelector(".backgroundLoader").classList.add("hidden");
    alert("Esti sigur ca vrei sa stergi acest produs");
    drawT();
}

