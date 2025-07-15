import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5xeu4x5iJ49MpSQzPPnze6mniZwW5Z00",
  authDomain: "lailanotes.firebaseapp.com",
  databaseURL: "https://lailanotes-default-rtdb.firebaseio.com",
  projectId: "lailanotes",
  storageBucket: "lailanotes.appspot.com",
  messagingSenderId: "515760278257",
  appId: "1:515760278257:web:fa4b1f00efdddb48d1d06e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dataRef = ref(db, "notes");

window.saveToFirebase = () => {
  set(dataRef, window.notes);
};

window.loadFromFirebase = () => {
  get(dataRef).then((snapshot) => {
    if (snapshot.exists()) {
      window.notes = snapshot.val();
      window.updateTabList();
    } else {
      window.notes = {};
    }
  });
};