// === CONFIGURAÇÃO DO SUPABASE ===
// ⚠️ Substitua pelos dados do seu projeto!
const SUPABASE_URL = "https://afobiejrsjolurxeqnuz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmb2JpZWpyc2pvbHVyeGVxbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NTkxMDAsImV4cCI6MjA3ODEzNTEwMH0.dhHgjXnOzZE5f3HDBzgBjuZss33LrGPuM1ckKeG6-bw";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === MOSTRAR / ESCONDER SENHA ===
const toggleSenha = document.getElementById("toggleSenha");
const inputSenha = document.getElementById("senha");

toggleSenha.addEventListener("click", () => {
  const tipo = inputSenha.getAttribute("type");
  if (tipo === "password") {
    inputSenha.setAttribute("type", "text");
    toggleSenha.src = "../assets/img/olhoAberto.png";
  } else {
    inputSenha.setAttribute("type", "password");
    toggleSenha.src = "../assets/img/olhoFechado.png";
  }
});

// === BOTÃO ENTRAR ===
document.getElementById("entrar").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) throw error;

    // Redireciona para a home após login bem-sucedido
    window.location.href = "../pages/home.html";
  } catch (err) {
    alert("❌ Erro ao fazer login: " + err.message);
  }
});

// === BOTÃO CADASTRAR ===
document.getElementById("cadastro").addEventListener("click", () => {
  window.location.href = "../pages/cadastro.html";
});
