// === CONFIGURAÇÃO DO SUPABASE ===
const SUPABASE_URL = "https://afobiejrsjolurxeqnuz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmb2JpZWpyc2pvbHVyeGVxbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NTkxMDAsImV4cCI6MjA3ODEzNTEwMH0.dhHgjXnOzZE5f3HDBzgBjuZss33LrGPuM1ckKeG6-bw";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === ELEMENTOS DO LOGIN ===
const toggleSenha = document.getElementById("toggleSenha");
const inputSenha = document.getElementById("senha");
const mascote = document.getElementById("mascote");
const formLogin = document.getElementById("loginForm");
const btnCadastro = document.getElementById("cadastro");

// === ELEMENTOS DO MODAL ===
const modal = document.getElementById("modalRecuperar");
const btnEnviar = document.getElementById("btnEnviarRecuperar");
const btnFechar = document.getElementById("btnFecharModal");
const linkEsqueci = document.getElementById("esqueciSenhaLink");

const somAbrir = document.getElementById("somAbrir");
const somFechar = document.getElementById("somFechar");

// === MOSTRAR / ESCONDER SENHA + MASCOTE ===
toggleSenha.addEventListener("click", () => {
  const isPassword = inputSenha.type === "password";
  inputSenha.type = isPassword ? "text" : "password";

  // muda ícone do olho
  toggleSenha.src = isPassword
    ? "../assets/img/olhoAberto.png"
    : "../assets/img/olhoFechado.png";

  // muda mascote (olhos abertos / fechados)
  mascote.src = isPassword
    ? "../assets/img/mascote.png"
    : "../assets/img/mascoteBlind.png";
});

// === LOGIN ===
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = inputSenha.value.trim();

  if (!email || !senha) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) throw error;

    window.location.href = "../pages/home.html";
  } catch (err) {
    alert("❌ Erro ao fazer login: " + err.message);
  }
});

// === CADASTRO ===
btnCadastro.addEventListener("click", () => {
  window.location.href = "../pages/cadastro.html";
});

// ==== MODAL: abrir ====
linkEsqueci.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
  somAbrir.currentTime = 0;
  somAbrir.play();
});

// ==== MODAL: fechar ====
btnFechar.addEventListener("click", () => {
  modal.style.display = "none";
  somFechar.currentTime = 0;
  somFechar.play();
});

// ==== MODAL: enviar email de recuperação ====
btnEnviar.addEventListener("click", async () => {
  const email = document.getElementById("recuperarEmail").value.trim();

  if (!email) {
    alert("Digite um email válido!");
    return;
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://emannuel-jks.github.io/SustentArte/pages/reset-password.html"
  });

  if (error) {
    alert("Erro: " + error.message);
    return;
  }

  alert("Enviamos um link para recuperar sua senha!");
  modal.style.display = "none";
});
