// === INICIALIZA O MAPA ===
let mapa;

function initMap() {
  mapa = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: -2.5307, lng: -44.3068 }, // São Luís
    mapTypeControl: false,
    streetViewControl: false
  });

  // Carregar pontos do JSON
  carregarPontos();

  // Tentar obter localização do usuário
  localizarUsuario();
}

// === LOCALIZAÇÃO DO USUÁRIO ===
function localizarUsuario() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userPos = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        new google.maps.Marker({
          position: userPos,
          map: mapa,
          title: "Você está aqui!",
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        });

        mapa.setCenter(userPos);
      },
      () => {
        console.warn("Usuário negou permissão ou falhou.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }
}

// === CARREGAR PONTOS DE RECICLAGEM DO JSON ===
function carregarPontos() {
  fetch("../assets/data/pontos-reciclagem.json")
    .then(response => response.json())
    .then(pontos => {
      pontos.forEach(ponto => {
        const marcador = new google.maps.Marker({
          position: { lat: ponto.lat, lng: ponto.lng },
          map: mapa,
          title: ponto.nome
        });

        // JANELA DE INFORMAÇÃO
        const info = new google.maps.InfoWindow({
          content: `
            <div style="font-family: Poppins; width: 230px;">
              <h3 style="margin:0; color:#2E7D32;">${ponto.nome}</h3>
              <p style="margin:4px 0;"><strong>Endereço:</strong> ${ponto.endereco}</p>
              <p style="margin:4px 0;"><strong>Materiais:</strong></p>
              <ul style="padding-left:16px; margin:0;">
                ${ponto.materiais.map(m => `<li>${m}</li>`).join("")}
              </ul>
            </div>
          `
        });

        marcador.addListener("click", () => {
          info.open(mapa, marcador);
        });
      });
    });
}
