var list = [];

        async function draw() {
            document.querySelector(".backgroundLoader").classList.remove("hidden");
            var response = await fetch("https://proiect-final-bd83a.firebaseio.com/produse/.json")
            window.list = await response.json();
            document.querySelector(".backgroundLoader").classList.add("hidden");
            var str = "";
            for (var i in list) {
                str += `
                <div class="col-lg-3 col-sm-6 col-xs-12 product">
                    <div class="boxBorder">
                        <div id="imgBox">
                            <img class="imgProd" src="../Poze/${list[i].imagine}" alt="${list[i].nume}">
                        </div>
                        <div  id="nameBox">
                            <p id="nameObj">${list[i].nume}</p>
                        </div>
                        <div id="bottomBox">
                            <span id="price">${list[i].pret}</span> 
                            <span>Lei</span>
                            <a href="../DetailsPage/details.html?id=${i}">
                                <button id="detailsBottom">Detalii</button>
                            </a>
                        </div>
                    </div>
                </div>   
            `
                document.querySelector("#showProducts").innerHTML = str;
            }
        }