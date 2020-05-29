
        async function add(event) {
            document.querySelector(".backgroundLoader").classList.remove("hidden");
            event.preventDefault();
            var obj = {
                nume: document.querySelector("[name='nume']").value,
                imagine: document.querySelector("[name='imagine']").value,
                descriere: document.querySelector("[name='descriere']").value,
                pret: document.querySelector("[name='pret']").value,
                stoc: document.querySelector("[name='stoc']").value,
            }
            var response = await fetch(`https://proiect-final-bd83a.firebaseio.com/produse/.json`, {
                method: "post",
                body: JSON.stringify(obj)
            });
            document.querySelector(".backgroundLoader").classList.add("hidden");

            location.href = "../AdminPage/admin.html";
        }
