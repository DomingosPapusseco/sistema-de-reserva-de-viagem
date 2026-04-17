import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Tua config (já tens)
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "alras-d2251.firebaseapp.com",
  projectId: "alras-d2251",
  storageBucket: "alras-d2251.firebasestorage.app",
  messagingSenderId: "419855488052",
  appId: "1:419855488052:web:5b5f8239bbcea87e5c2661"
};

// Inicializa
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Função para salvar
window.salvar = function () {
  const nome = document.getElementById("nome").value;

  set(ref(db, "usuarios/usuario1"), {
    nome: nome
  });

  alert("Salvo com sucesso!");
};
