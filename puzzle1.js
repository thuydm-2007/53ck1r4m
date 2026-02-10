const botao = document.getElementById("btnDesvendar");
const inputSenha = document.getElementById("senha");

const mensagem = document.getElementById("mensagem");
const erro = document.getElementById("erro");

const audioSucesso = document.getElementById("audioSucesso");
const audioErro = document.getElementById("audioErro");
const bgm = document.getElementById("bgm");

// 🔊 Volumes
audioSucesso.volume = 1.0;
audioErro.volume = 1.0;
bgm.volume = 0.3;

// 🔑 Palavra secreta
const palavraSecreta = "zeckiram";

// 🎵 Controle da música de fundo
let bgmIniciada = false;

// ▶️ Inicia BGM no PRIMEIRO clique em qualquer lugar
document.addEventListener("click", () => {
  if (!bgmIniciada) {
    bgm.play().then(() => {
      bgmIniciada = true;
      console.log("BGM iniciada com sucesso");
    }).catch(err => {
      console.log("Bloqueio de autoplay:", err);
    });
  }
}, { once: true });

botao.addEventListener("click", () => {
  const resposta = inputSenha.value.toLowerCase().trim();

  // Reset visual
  mensagem.style.display = "none";
  erro.style.display = "none";

  // Reset efeitos
  audioSucesso.pause();
  audioErro.pause();
  audioSucesso.currentTime = 0;
  audioErro.currentTime = 0;

  // Abaixa BGM para efeitos
  bgm.volume = 0.15;

  if (resposta === palavraSecreta) {
    mensagem.style.display = "block";

    audioSucesso.play().catch(err => {
      console.log("Erro ao tocar sucesso:", err);
    });

    audioSucesso.onended = () => {
      bgm.volume = 0.3;
    };

  } else {
    erro.style.display = "block";

    audioErro.play().catch(err => {
      console.log("Erro ao tocar falha:", err);
    });

    audioErro.onended = () => {
      bgm.volume = 0.3;
    };

    // 📳 Vibração (mobile)
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  }
});
