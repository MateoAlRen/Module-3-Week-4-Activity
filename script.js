let saveBtn = document.getElementById("saveBtn");
let clearBtn = document.getElementById("clearBtn");
let outPut = document.getElementById("outPut");
let message = document.getElementById("message");
window.addEventListener('DOMContentLoaded', showData);


if (!sessionStorage.getItem("userIter")) {
    sessionStorage.setItem("userIter", 0);
};

function updateInteraction() {
    let count = parseInt(sessionStorage.getItem("userIter"))
    ++count;
    sessionStorage.setItem(`userIter`, count);
    console.log(`Iteractions in this session ${count}`);
}

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    showData();
    outPut.innerHTML = ``
    updateInteraction();
    document.getElementById("name").value = '';
    document.getElementById("age").value = '';
    message.style.display = "none";
    outPut.style.display = "none";
});


saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let id = crypto.randomUUID();
    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    age = parseFloat(age);
    if (!name || !age || isNaN(age) || age < 0 || age > 120) {
        outPut.textContent = `Please, introduce numbers or any info.`;
        outPut.style.display = "block";
        return;
    } else {
        const user = {
            "name": name,
            "age": age
        }
        localStorage.setItem(id, JSON.stringify(user));
        message.style.display = "block";
        message.textContent = `Hi, your name is ${name} and your age is ${age}!`
        showData();
        document.getElementById("name").value = '';
        document.getElementById("age").value = '';
        outPut.style.display = "block";
    }

    updateInteraction();
});

function showData() {
    outPut.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let user = JSON.parse(localStorage.getItem(key));

        const userDiv = document.createElement("div");
        userDiv.textContent = `Name: ${user.name}  | Age: ${user.age} `;
        outPut.style.display = "block";
        outPut.appendChild(userDiv)
    }
};