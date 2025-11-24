// ======== Tempo de exibição da tela inicial ========
// (em milissegundos — 5000 = 5 segundos)
const tempoAnimacao = 5000;

// ======== Redirecionamento automático ========
setTimeout(() => {
  window.location.href = "pages/login.html"; // caminho atualizado
}, tempoAnimacao);


// ======== Logout ========
async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Erro ao sair:", error.message);
    alert("Erro ao sair. Tente novamente.");
  } else {
    window.location.href = "../pages/login.html";
  }
}
