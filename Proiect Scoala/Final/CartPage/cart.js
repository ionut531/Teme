async function draw() {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/cos/.json`);
    window.list = await response.json();
    document.querySelector(".backgroundLoader").classList.add("hidden");
    var str = "";
    var total = 0;

    for (var i in list) {

        if (list[i] === null) continue;
        total = total + list[i].cantitate * list[i].pret;
              
        str += ` 
                    <tr>
                   
                        <th scope="row" name="nume"> <a href="../DetailsPage/details.html?id=${i}">${list[i].nume} </a></th>
                  
                        <td name="pret">${list[i].pret}</td>
                        <td name="cantitate">
                            <input type="button" value="-" id="minus" onclick="decrease(event,'${i}')">
                            <input type="number"  value="${list[i].cantitate}" min="1" id="numValue">  
                            <input type="button" value="+"  id="plus" onclick="increase(event,'${i}')"> 
                       </td>
                        <td name="subTotal">${list[i].cantitate * list[i].pret}</td>
                        <td><input type="button" value="Sterge" id="delBut" onclick="sterge(event,'${i}')"></td>
                    </tr>
    `
    }
    document.querySelector("#showProducts table tbody").innerHTML = str;
    document.querySelector("#products").innerHTML = Object.keys(list).length;
    document.querySelector("#transport").innerHTML = Object.keys(list).length * 5;
    document.querySelector("#totalPrice").innerHTML = total;

}

async function decrease(event, i) {
    if (list[i].cantitate > 0) {
        document.querySelector(".backgroundLoader").classList.remove("hidden");
        var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/cos/${i}/cantitate.json`, {
            method: "put",
            body: parseInt(list[i].cantitate) - 1
        });
        document.querySelector(".backgroundLoader").classList.add("hidden");
    } else {
        alert("Stoc minim");
    }
    draw();
}

async function increase(event, i) {
    if (list[i].cantitate < list[i].stoc) {
        document.querySelector(".backgroundLoader").classList.remove("hidden");
        var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/cos/${i}/cantitate.json`, {
            method: "put",
            body: parseInt(list[i].cantitate) + 1
        });
        document.querySelector(".backgroundLoader").classList.add("hidden");
    } else {
        alert("Stoc maxim");
    }
    draw();
}

async function sterge(event, i) {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/cos/${i}.json`, {
        method: "delete",
    });
    document.querySelector(".backgroundLoader").classList.add("hidden");
    alert("Esti sigur ca vrei sa stergi acest produs");
    draw();
}

