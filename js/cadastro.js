// js/cadastro.js

// === CONFIGURAÇÃO DO SUPABASE ===
const SUPABASE_URL = "https://afobiejrsjolurxeqnuz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmb2JpZWpyc2pvbHVyeGVxbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NTkxMDAsImV4cCI6MjA3ODEzNTEwMH0.dhHgjXnOzZE5f3HDBzgBjuZss33LrGPuM1ckKeG6-bw";
const supabase = window.supabase && window.supabase.createClient
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// aguarda DOM
document.addEventListener('DOMContentLoaded', () => {
  // elementos
  const inputSenha = document.getElementById('senha');
  const inputConfirmar = document.getElementById('confirmarSenha');
  const toggleSenha = document.getElementById('toggleSenha');
  const toggleConfirmar = document.getElementById('toggleConfirmar');
  const mascote = document.getElementById('mascote');
  const form = document.getElementById('registerForm');

  // caminhos (relativos a pages/)
  const IMG_OLHO_ABERTO = "../assets/img/olhoAberto.png";
  const IMG_OLHO_FECHADO = "../assets/img/olhoFechado.png";
  const IMG_MASCOTE_ABERTO = "../assets/img/mascote.png";
  const IMG_MASCOTE_FECHADO = "../assets/img/mascoteBlind.png";

  // segurança
  if (!inputSenha || !inputConfirmar || !toggleSenha || !toggleConfirmar || !mascote || !form) {
    console.error('Elementos do formulário de cadastro não encontrados. Verifique IDs em cadastro.html.');
    return;
  }

  // estado: true = campos estão ocultos (password), false = visíveis (text)
  let camposEstaoOcultos = true; // início com password

  // função que sincroniza ambos os campos/icons/mascote
  function sincronizarVisibilidade(novoEstadoOculto) {
    camposEstaoOcultos = novoEstadoOculto;
    const tipo = novoEstadoOculto ? 'password' : 'text';

    // aplica tipo aos dois campos
    inputSenha.type = tipo;
    inputConfirmar.type = tipo;

    // atualiza ícones
    const olhoSrc = novoEstadoOculto ? IMG_OLHO_FECHADO : IMG_OLHO_ABERTO;
    toggleSenha.src = olhoSrc;
    toggleConfirmar.src = olhoSrc;

    // atualiza mascote
    mascote.src = novoEstadoOculto ? IMG_MASCOTE_FECHADO : IMG_MASCOTE_ABERTO;

    // animação curta (piscar)
    mascote.classList.add('piscando');
    setTimeout(() => mascote.classList.remove('piscando'), 450);
  }

  // handler comum para ambos os ícones (inverte estado)
  function handleToggleClick() {
    sincronizarVisibilidade(!camposEstaoOcultos);
  }

  // eventos nos dois ícones
  toggleSenha.addEventListener('click', handleToggleClick);
  toggleConfirmar.addEventListener('click', handleToggleClick);

  // função de cadastro (exposta globalmente como handleCadastro, chamada pelo onsubmit)
  window.handleCadastro = async function handleCadastro() {
    const email = document.getElementById('email').value.trim();
    const senha = inputSenha.value.trim();
    const confirmar = inputConfirmar.value.trim();

    if (!email || !senha || !confirmar) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    if (senha !== confirmar) {
      alert('As senhas não coincidem!');
      return;
    }

    // se supabase não disponível, simula sucesso (útil para desenvolvimento local)
    if (!supabase) {
      console.warn('Supabase não inicializado. Cadastro simulado.');
      alert('Cadastro (simulado) realizado com sucesso — redirecionando para login.');
      window.location.href = 'login.html';
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
      });

      if (error) throw error;

      alert('✅ Cadastro realizado com sucesso! Verifique seu e-mail para confirmar.');
      window.location.href = 'login.html';
    } catch (err) {
      console.error('Erro no signUp:', err);
      alert('❌ Erro ao cadastrar: ' + (err.message || err));
    }
  };

  // inicializa estado (garante ícones corretos)
  sincronizarVisibilidade(true);
});
