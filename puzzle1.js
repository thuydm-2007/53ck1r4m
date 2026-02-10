document.addEventListener("DOMContentLoaded", () => {

  const botao = document.getElementById("btnDesvendar");
  const ativarSom = document.getElementById("ativarSom");
  const inputSenha = document.getElementById("senha");

  const mensagem = document.getElementById("mensagem");
  const erro = document.getElementById("erro");

  const audioSucesso = document.getElementById("audioSucesso");
  const audioErro = document.getElementById("audioErro");
  const bgm = document.getElementById("bgm");

  // 🔊 Volumes
  audioSucesso.volume = 1.0;
  audioErro.volume = 1.0;
  bgm.volume = 0.7;

  // 🔑 Palavra secreta
  const palavraSecreta = "zeckiram";

  let audioLiberado = false;

ativarSom.addEventListener("click", () => {
  // garante que o áudio não está mutado
  bgm.muted = false;

  // volume padrão da música
  bgm.volume = 0.7;

  bgm.play()
    .then(() => {
      audioLiberado = true;
      ativarSom.style.display = "none";
      console.log("Som ativado com sucesso");
    })
    .catch((err) => {
      console.log("Erro ao ativar som:", err);
      alert("Clique novamente para ativar o som.");
    });
});


  // ▶️ BOTÃO DESVENDAR
  botao.addEventListener("click", () => {

    if (!audioLiberado) {
      alert("Ative o som antes de prosseguir.");
      return;
    }

    const resposta = inputSenha.value.toLowerCase().trim();

    // Reset visual
    mensagem.style.display = "none";
    erro.style.display = "none";

    // Reset efeitos
    audioSucesso.pause();
    audioErro.pause();
    audioSucesso.currentTime = 0;
    audioErro.currentTime = 0;

    // 🔉 Abaixa BGM
    bgm.volume = 0.15;

    if (resposta === palavraSecreta) {
      mensagem.style.display = "block";

      audioSucesso.play();
      audioSucesso.onended = () => {
        bgm.volume = 0.3;
      };

    } else {
      erro.style.display = "block";

      audioErro.play();
      audioErro.onended = () => {
        bgm.volume = 0.3;
      };

      if (navigator.vibrate) navigator.vibrate(200);
    }
  });

});




