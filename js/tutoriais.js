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
