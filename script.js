let tabs = ["Medicamentos", "Modelos", "Enfermaria", "Maternidade", "Ambulatório", "Paciente"];
const tabsDiv = document.getElementById("tabs");
const noteArea = document.getElementById("noteArea");
const addTabBtn = document.getElementById("addTabBtn");
const statusEl = document.getElementById("status");

let activeTab = localStorage.getItem("lailanotes_activeTab") || tabs[0];
let notes = JSON.parse(localStorage.getItem("lailanotes_notes") || "{}");

function renderTabs() {
  tabsDiv.innerHTML = "";
  tabs.forEach(tab => {
    const btn = document.createElement("button");
    btn.textContent = tab;
    btn.className = (tab === activeTab) ? "active" : "";
    btn.onclick = () => {
      saveNote();
      activeTab = tab;
      localStorage.setItem("lailanotes_activeTab", tab);
      updateNoteArea();
      renderTabs();
    };
    tabsDiv.appendChild(btn);
  });
}

function updateNoteArea() {
  noteArea.value = notes[activeTab] || "";
}

function saveNote() {
  notes[activeTab] = noteArea.value;
  localStorage.setItem("lailanotes_notes", JSON.stringify(notes));
  statusEl.textContent = "💾 Salvo!";
  setTimeout(() => {
    statusEl.textContent = "💾 Salvando automaticamente…";
  }, 1000);
}

noteArea.addEventListener("input", saveNote);

addTabBtn.addEventListener("click", () => {
  const newTab = prompt("Nome da nova aba:");
  if (newTab && !tabs.includes(newTab)) {
    tabs.push(newTab);
    renderTabs();
    activeTab = newTab;
    updateNoteArea();
    saveNote();
  }
});

renderTabs();
updateNoteArea();
