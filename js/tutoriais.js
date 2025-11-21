// ======================================================
// 🔰 INICIALIZAÇÃO DO SUPABASE
// ======================================================
const supabaseUrl = "https://afobiejrsjolurxeqnuz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmb2JpZWpyc2pvbHVyeGVxbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NTkxMDAsImV4cCI6MjA3ODEzNTEwMH0.dhHgjXnOzZE5f3HDBzgBjuZss33LrGPuM1ckKeG6-bw"; // coloque sua anon key aqui
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ======================================================
// ❤️ LIKE LOCAL (futuramente vamos salvar no banco)
// ======================================================
function toggleLike(btn) {
  btn.classList.toggle("liked");

  const heart = btn.querySelector(".heart");
  heart.innerHTML = btn.classList.contains("liked")
    ? "&#10084;" // cheio
    : "&#9825;"; // vazio
}

// ======================================================
// 💬 ABRIR/FECHAR ÁREA DE COMENTÁRIOS
// ======================================================
function toggleCommentBox(btn) {
  const box = btn.parentElement.nextElementSibling;
  box.classList.toggle("hidden");
}

// ======================================================
// 👑 VERIFICAR SE O USUÁRIO É ADMIN
// ======================================================
async function checkAdmin() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.warn("Usuário não logado.");
    return;
  }

  const user = data.user;

  // Você habilitou o admin pelo campo "is_super_admin"
  if (user.is_super_admin === true) {
    document.getElementById("btn-add-video").style.display = "flex";
  }
}

checkAdmin();

// ======================================================
// ▶️ CARREGAR VÍDEOS DO SUPABASE
// ======================================================
async function loadVideos() {
  const container = document.querySelector(".tutorials-container");
  container.innerHTML = "<p>Carregando vídeos...</p>";

  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    container.innerHTML = "<p>Erro ao carregar vídeos.</p>";
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p>Nenhum vídeo cadastrado ainda.</p>";
    return;
  }

  // Limpa
  container.innerHTML = "";

  data.forEach(video => {
    const card = document.createElement("div");
    card.classList.add("tutorial-card");

    card.innerHTML = `
      <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/${video.youtube_id}" allowfullscreen></iframe>
      </div>

      <h3 class="tutorial-title">${video.title}</h3>

      <div class="tutorial-actions">
        <button class="like-btn" onclick="toggleLike(this)">
          <span class="heart">&#9825;</span>
        </button>

        <button class="comment-btn" onclick="toggleCommentBox(this)">
          💬 Comentários
        </button>
      </div>

      <div class="comment-box hidden">
        <textarea placeholder="Escreva um comentário..."></textarea>
        <button class="send-comment">Enviar</button>
      </div>
    `;

    container.appendChild(card);
  });
}

loadVideos();

// ======================================================
// ➕ MODAL: ABRIR / FECHAR
// ======================================================
document.getElementById("btn-add-video").addEventListener("click", () => {
  document.getElementById("modal-add-video").style.display = "flex";
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal-add-video").style.display = "none";
});

// ======================================================
// ▶️ EXTRATOR DE ID DO YOUTUBE
// ======================================================
function extractYoutubeId(url) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// ======================================================
// 📌 SALVAR NOVO VÍDEO
// ======================================================
document.getElementById("confirm-add-video").addEventListener("click", async () => {
  const youtubeUrl = document.getElementById("youtube-input").value.trim();
  const title = document.getElementById("title-input").value.trim();
  const youtubeId = extractYoutubeId(youtubeUrl);

  if (!youtubeId) {
    alert("Link inválido do YouTube.");
    return;
  }

  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    alert("Você precisa estar logado.");
    return;
  }

  const { error } = await supabase.from("videos").insert({
    youtube_url: youtubeUrl,
    youtube_id: youtubeId,
    title,
    created_by: userData.user.id
  });

  if (error) {
    console.error(error);
    alert("Erro ao adicionar vídeo.");
    return;
  }

  alert("Vídeo adicionado com sucesso!");
  location.reload();
});
