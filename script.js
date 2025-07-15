
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5xeus4xN5j4pMSQzPP2me6nm1ZwU5ZO0",
  authDomain: "lailanotes.firebaseapp.com",
  projectId: "lailanotes",
  storageBucket: "lailanotes.firebasestorage.app",
  messagingSenderId: "551627082757",
  appId: "1:551627082757:web:b84b724f18328e1d01a06c",
  measurementId: "G-BZ1JH02K9Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const senha = "medicina";

function promptSenha() {
  let tentativa = prompt("Digite a senha para acessar o LailaNotes:");
  if (tentativa !== senha) {
    alert("Senha incorreta.");
    window.location.reload();
  } else {
    carregarNotas();
  }
}

async function carregarNotas() {
  const notaRef = doc(db, "notas", "principal");
  const notaSnap = await getDoc(notaRef);
  if (notaSnap.exists()) {
    document.getElementById("note-area").value = notaSnap.data().texto || "";
  }
}

document.getElementById("note-area").addEventListener("input", async function () {
  const texto = this.value;
  await setDoc(doc(db, "notas", "principal"), { texto });
});

document.getElementById("new-tab").addEventListener("click", function () {
  alert("Funcionalidade de múltiplas abas será ativada em breve!");
});

promptSenha();
