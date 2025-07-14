const tabs = ["Medicamentos", "Modelos", "Enfermaria", "Maternidade", "Ambulatório", "Paciente"];
const tabsDiv = document.getElementById("tabs");
const noteArea = document.getElementById("noteArea");

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
}

noteArea.addEventListener("input", saveNote);

renderTabs();
updateNoteArea();
