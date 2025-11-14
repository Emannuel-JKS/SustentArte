// === SUPABASE ===
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://afobiejrsjolurxeqnuz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmb2JpZWpyc2pvbHVyeGVxbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NTkxMDAsImV4cCI6MjA3ODEzNTEwMH0.dhHgjXnOzZE5f3HDBzgBjuZss33LrGPuM1ckKeG6-bw";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === Capturar token da URL ===
const params = new URLSearchParams(window.location.search);
const token = params.get("token");
const type = params.get("type");

console.log("Token recebido:", token);
console.log("Tipo:", type);

// === Criar sessão TEMPORÁRIA para permitir trocar a senha ===
if (token && type === "recovery") {
  supabase.auth.exchangeCodeForSession(token).then(({ data, error }) => {
    if (error) {
      console.error("Erro ao criar sessão:", error.message);
      alert("Erro ao validar o link de recuperação.");
    }
  });
} else {
  alert("Link inválido ou expirado!");
}

// === ELEMENTOS ===
const novaSenha = document.getElementById("novaSenha");
const confirmarSenha = document.getElementById("confirmarSenha");
const toggleNova = document.getElementById("toggleNova");
const toggleConfirmar = document.getElementById("toggleConfirmar");
const mascote = document.getElementById("mascoteReset");
const btnSalvar = document.getElementById("btnSalvar");

// === Função para trocar visual dos olhos + mascote ===
function toggleCampo(campo, olhoIcon) {
  const isPassword = campo.type === "password";
  campo.type = isPassword ? "text" : "password";

  // Olho
  olhoIcon.src = isPassword
    ? "../assets/img/olhoAberto.png"
    : "../assets/img/olhoFechado.png";

  // Mascote reage
  mascote.src = isPassword
    ? "../assets/img/mascote.png"
    : "../assets/img/mascoteBlind.png";
}

// === Eventos de clique dos olhos ===
toggleNova.addEventListener("click", () => {
  toggleCampo(novaSenha, toggleNova);
  confirmarSenha.type = novaSenha.type;
  toggleConfirmar.src = toggleNova.src;
});

toggleConfirmar.addEventListener("click", () => {
  toggleCampo(confirmarSenha, toggleConfirmar);
  novaSenha.type = confirmarSenha.type;
  toggleNova.src = toggleConfirmar.src;
});

// === Atualizar senha ===
btnSalvar.addEventListener("click", async () => {
  const senha1 = novaSenha.value.trim();
  const senha2 = confirmarSenha.value.trim();

  if (!senha1 || !senha2) {
    alert("Preencha todos os campos!");
    return;
  }

  if (senha1 !== senha2) {
    alert("As senhas não coincidem!");
    return;
  }

  const { error } = await supabase.auth.updateUser({
    password: senha1,
  });

  if (error) {
    alert("Erro ao atualizar senha: " + error.message);
    return;
  }

  alert("Senha redefinida com sucesso!");
  window.location.href = "../pages/login.html";
});
