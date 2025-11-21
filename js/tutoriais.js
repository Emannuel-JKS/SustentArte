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
