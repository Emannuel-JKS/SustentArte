// === SUPABASE ===
const SUPABASE_URL = "https://afobiejrsjolurxeqnuz.supabase.co";
const SUPABASE_ANON_KEY = "SEU KEY AQUI";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// Eventos
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

// === Salvar nova senha ===
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

  const { data, error } = await client.auth.updateUser({
    password: senha1
  });

  if (error) {
    console.log(error);
    alert("Erro ao atualizar senha: " + error.message);
    return;
  }

  alert("Senha redefinida com sucesso!");
  window.location.href = "../pages/login.html";
});
