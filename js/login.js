// === CONFIGURAÇÃO DO SUPABASE ===
const SUPABASE_URL = "https://afobiejrsjolurxeqnuz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmb2JpZWpyc2pvbHVyeGVxbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NTkxMDAsImV4cCI6MjA3ODEzNTEwMH0.dhHgjXnOzZE5f3HDBzgBjuZss33LrGPuM1ckKeG6-bw";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === ELEMENTOS DOM ===
const toggleSenha = document.getElementById("toggleSenha");
const inputSenha = document.getElementById("senha");
const mascote = document.getElementById("mascote");
const formLogin = document.getElementById("loginForm");
const btnCadastro = document.getElementById("cadastro");

// === MOSTRAR / ESCONDER SENHA + MASCOTE ===
toggleSenha.addEventListener("click", () => {
  const isPassword = inputSenha.type === "password";
  inputSenha.type = isPassword ? "text" : "password";

  // Ícone do olho
  toggleSenha.src = isPassword 
    ? "../assets/img/olhoAberto.png"
    : "../assets/img/olhoFechado.png";

  // Mascote
  mascote.src = isPassword
    ? "../assets/img/mascote.png"        // olhos abertos
    : "../assets/img/mascoteBlind.png";  // olhos fechados
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

// === CADASTRAR ===
btnCadastro.addEventListener("click", () => {
  window.location.href = "../pages/cadastro.html";
});
