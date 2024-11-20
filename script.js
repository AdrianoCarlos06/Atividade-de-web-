const storyData = {
    inicio: {
      texto: `
        Você se encontra em uma cidade deserta, cercada por um silêncio inquietante. À sua direita, há uma casa de madeira, com janelas quebradas e a porta entreaberta, 
        como se estivesse esperando sua visita. À esquerda, um caminho escuro e estreito serpenteia em direção a uma floresta misteriosa, 
        onde as árvores parecem sussurrar segredos antigos.
        <br><br>
        O que você faz? Você pode <a href="?step=casa">entrar na casa</a>, desafiando o medo, ou 
        <a href="?step=caminho">seguir pelo caminho escuro</a> para descobrir o que está além.
      `,
      escolhas: [
        { texto: "entrar na casa", destino: "casa", modifica: { corajoso: true } },
        { texto: "seguir pelo caminho escuro", destino: "caminho" }
      ]
    },
    casa: {
      texto: `
        Ao entrar na casa, o som de seus passos ecoa pelo chão de madeira rangente. O ambiente cheira a mofo e abandono, 
        mas algo brilha no canto da sala: um baú velho, fechado com um cadeado enferrujado. 
        Você sente uma estranha atração pelo baú, como se ele guardasse algo de valor inestimável.
        <br><br>
        Você pode <a href="?step=bau">tentar abrir o baú</a> se tiver coragem suficiente, ou <a href="?step=inicio">sair da casa</a> rapidamente, antes que algo aconteça.
      `,
      escolhas: [
        { texto: "tentar abrir o baú", destino: "bau", condicao: { corajoso: true } },
        { texto: "sair da casa", destino: "inicio" }
      ]
    },
    caminho: {
      texto: `
        Você decide seguir pelo caminho escuro, seus passos esmagando as folhas secas espalhadas no chão. A luz da lua mal atravessa as copas das árvores,
        criando sombras inquietantes ao seu redor. De repente, um barulho interrompe o silêncio: um galho se quebra, seguido por um som baixo e gutural.
        Seu coração acelera. Será um animal selvagem ou algo mais perigoso? 
        <br><br>
        Você pode <a href="?step=barulhos">investigar os barulhos</a>, enfrentando o desconhecido, ou <a href="?step=inicio">voltar para a cidade</a>, buscando segurança.
      `,
      escolhas: [
        { texto: "investigar os barulhos", destino: "barulhos" },
        { texto: "voltar para a cidade", destino: "inicio" }
      ]
    },
    bau: {
      texto: `
        Você se aproxima do baú com o coração disparado. Com um pouco de esforço, o cadeado enferrujado cede. Ao abrir a tampa,
        uma luz dourada enche o ambiente. Dentro, você encontra um tesouro reluzente: moedas antigas, joias e um mapa misterioso com inscrições que brilham levemente.
        Parece que este é apenas o começo de uma nova jornada. 
        <br><br>
        Fim da aventura... por enquanto.
      `,
      escolhas: [],
      final: true
    },
    barulhos: {
      texto: `
        Avançando em direção aos barulhos, você se depara com uma criatura incomum: um lobo de pelo prateado, com olhos brilhando em tom azul.
        Ele não parece hostil. Na verdade, ele se aproxima e se senta, como se estivesse esperando por você. De repente, o lobo começa a andar,
        guiando você por um caminho oculto que leva à saída da floresta.
        <br><br>
        Fim da aventura... ou será um novo começo?
      `,
      escolhas: [],
      final: true
    }
  };
  
  function loadStory() {
    const params = new URLSearchParams(window.location.search);
    const currentStep = params.get("step") || localStorage.getItem("lastStep") || "inicio";
    const memory = JSON.parse(localStorage.getItem("memory")) || {};
    const path = JSON.parse(localStorage.getItem("path")) || [];
    renderStory(currentStep, memory, path);
  }
  
  // Renderiza o passo atual da estória
  function renderStory(step, memory, path) {
    const storyContainer = document.getElementById("chat-log");
    const choicesContainer = document.getElementById("choices-container");
  
    const currentData = storyData[step];
    localStorage.setItem("lastStep", step);
  
    if (!path.includes(step)) path.push(step);
    localStorage.setItem("path", JSON.stringify(path));
  
    // Adiciona o texto da estória
    const storyText = document.createElement("div");
    storyText.innerHTML = currentData.texto;
    storyContainer.appendChild(storyText);
    storyContainer.scrollTop = storyContainer.scrollHeight; // Rola para o final
  
    choicesContainer.innerHTML = ""; // Limpa escolhas anteriores
  
    if (currentData.final) {
      const finalMessage = document.createElement("p");
      finalMessage.textContent = "Você chegou ao fim da estória!";
      choicesContainer.appendChild(finalMessage);
  
      const pathMessage = document.createElement("p");
      pathMessage.textContent = `Caminho percorrido: ${path.join(" -> ")}`;
      choicesContainer.appendChild(pathMessage);
  
      const restartLink = document.createElement("a");
      restartLink.textContent = "Recomeçar";
      restartLink.href = "?step=inicio";
      restartLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        storyContainer.innerHTML = "";
        renderStory("inicio", {}, []);
      });
  
      choicesContainer.appendChild(restartLink);
    }
  }
  
  // Inicia a aplicação
  window.addEventListener("load", loadStory);
  