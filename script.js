let fixedTabs = ["Medicamentos", "Modelos", "Enfermaria", "Maternidade", "Ambulatório", "Paciente"];
let tabs = [...fixedTabs];
let subtabs = {
  "Ambulatório": ["Paciente A", "Paciente B"],
  "Enfermaria": ["Rotina", "Pendências"]
};
const tabsDiv = document.getElementById("tabs");
const noteArea = document.getElementById("noteArea");
const addTabBtn = document.getElementById("addTabBtn");
const statusEl = document.getElementById("status");

let activeTab = localStorage.getItem("lailanotes_activeTab") || tabs[0];
let notes = JSON.parse(localStorage.getItem("lailanotes_notes") || "{}");

function renderTabs() {
  tabsDiv.innerHTML = "";
  tabs.forEach(tab => {
    const btn = document.createElement("div");
    btn.className = "tab" + (tab === activeTab ? " active" : "");
    btn.textContent = tab;
    btn.onclick = () => {
      saveNote();
      activeTab = tab;
      localStorage.setItem("lailanotes_activeTab", tab);
      updateNoteArea();
      renderTabs();
    };

    if (!fixedTabs.includes(tab)) {
      const closeBtn = document.createElement("span");
      closeBtn.className = "close-btn";
      closeBtn.textContent = "×";
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        if (confirm("Deseja apagar a aba "" + tab + ""?")) {
          tabs = tabs.filter(t => t !== tab);
          delete notes[tab];
          if (activeTab === tab) activeTab = tabs[0];
          localStorage.setItem("lailanotes_activeTab", activeTab);
          localStorage.setItem("lailanotes_notes", JSON.stringify(notes));
          renderTabs();
          updateNoteArea();
        }
      };
      btn.appendChild(closeBtn);
    }

    tabsDiv.appendChild(btn);

    if (subtabs[tab]) {
      subtabs[tab].forEach(sub => {
        const subBtn = document.createElement("div");
        subBtn.className = "tab subtab" + (sub === activeTab ? " active" : "");
        subBtn.textContent = sub;
        subBtn.onclick = () => {
          saveNote();
          activeTab = sub;
          localStorage.setItem("lailanotes_activeTab", sub);
          updateNoteArea();
          renderTabs();
        };
        tabsDiv.appendChild(subBtn);
      });
    }
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
