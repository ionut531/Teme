var list = [];

        async function editare() {
            var i = window.location.search.substring(4);
            document.querySelector(".backgroundLoader").classList.remove("hidden");
            var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/produse.json`);
            list = await response.json();
            document.querySelector(".backgroundLoader").classList.add("hidden");

            document.querySelector("[name='nume']").value = list[i].nume;
            document.querySelector("[name='imagine']").value = list[i].imagine;
            document.querySelector("[name='descriere']").value = list[i].descriere;
            document.querySelector("[name='pret']").value = list[i].pret;
            document.querySelector("[name='stoc']").value = list[i].stoc;
        }

        async function adauga(event) {
            event.preventDefault();
            var i = window.location.search.substring(4);
            var obj = {
                nume: document.querySelector("[name='nume']").value,
                imagine: document.querySelector("[name='imagine']").value,
                descriere: document.querySelector("[name='descriere']").value,
                pret: document.querySelector("[name='pret']").value,
                stoc: document.querySelector("[name='stoc']").value,
            }
            list[i] = obj;
            document.querySelector(".backgroundLoader").classList.remove("hidden");
            var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/produse/${i}.json`, {
                method: "put",
                body: JSON.stringify(obj)
            });
            document.querySelector(".backgroundLoader").classList.add("hidden");
            location.href = "../AdminPage/admin.html";
        }