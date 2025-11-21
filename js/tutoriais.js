function toggleLike(btn) {
  btn.classList.toggle("liked");

  const heart = btn.querySelector(".heart");
  if (btn.classList.contains("liked")) {
    heart.innerHTML = "&#10084;"; // coração cheio
  } else {
    heart.innerHTML = "&#9825;"; // coração vazio
  }
}

function toggleCommentBox(btn) {
  const box = btn.parentElement.nextElementSibling;

  box.classList.toggle("hidden");
}

async function checkAdmin() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  // verifica se existe a chave role = admin no metadata
  const role = user.user_metadata?.role;

  if (role === "admin") {
    document.getElementById("btn-add-video").style.display = "flex";
  }
}
checkAdmin();

document.getElementById("btn-add-video").addEventListener("click", () => {
  document.getElementById("modal-add-video").style.display = "flex";
});

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal-add-video").style.display = "none";
});


function extractYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}


document.getElementById("confirm-add-video").addEventListener("click", async () => {
  const youtubeUrl = document.getElementById("youtube-input").value.trim();
  const title = document.getElementById("title-input").value.trim();
  const youtubeId = extractYoutubeId(youtubeUrl);

  if (!youtubeId) {
    alert("Link inválido do YouTube.");
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert("Você precisa estar logado.");
    return;
  }

  const { error } = await supabase.from("videos").insert({
    youtube_url: youtubeUrl,
    youtube_id: youtubeId,
    title,
    created_by: user.id
  });

  if (error) {
    console.error(error);
    alert("Erro ao adicionar vídeo.");
    return;
  }

  alert("Vídeo adicionado com sucesso!");
  location.reload();
});
