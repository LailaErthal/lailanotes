let currentTab = null;
let notes = {};

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input.toLowerCase() === "medicina") {
    document.getElementById("auth").style.display = "none";
    document.getElementById("main").style.display = "flex";
    loadFromFirebase();
  } else {
    alert("Senha incorreta.");
  }
}

function addTab() {
  const name = prompt("Nome da nova aba:");
  if (name && !notes[name]) {
    notes[name] = "";
    updateTabList();
    switchTab(name);
    saveToFirebase();
  }
}

function deleteTab(name) {
  if (confirm(`Apagar aba "${name}"?`)) {
    delete notes[name];
    updateTabList();
    currentTab = null;
    document.getElementById("note").value = "";
    saveToFirebase();
  }
}

function updateTabList() {
  const tabList = document.getElementById("tab-list");
  tabList.innerHTML = "";
  Object.keys(notes).forEach(tab => {
    const li = document.createElement("li");
    li.textContent = tab;
    li.onclick = () => switchTab(tab);

    const del = document.createElement("span");
    del.textContent = "✕";
    del.className = "delete";
    del.onclick = (e) => {
      e.stopPropagation();
      deleteTab(tab);
    };

    li.appendChild(del);
    tabList.appendChild(li);
  });
}

function switchTab(name) {
  currentTab = name;
  document.getElementById("note").value = notes[name] || "";
}

document.getElementById("note").addEventListener("input", () => {
  if (currentTab) {
    notes[currentTab] = document.getElementById("note").value;
    saveToFirebase();
  }
});