document.getElementById("cadastrarAnimal").addEventListener("click", function() {
    esconderMenu();
    document.getElementById("content").innerHTML = `
        <h2>Cadastrar Animal</h2>
        <br>

        <form id="animalForm">
            <input type="text" id="nomeAnimal" placeholder="Nome do Animal" required>
            <label for="fotosAnimal">Foto do Animal</label>
            <input type="file" id="fotosAnimal" multiple accept="image/*">
            <div id="previewFotos"></div> <!-- Container para mostrar as fotos selecionadas -->
            <button type="submit" class="submit-btn">Cadastrar</button>
        </form>
    `;

    // Variável para armazenar as fotos em Base64
    let fotosBase64 = [];

    // Exibir as fotos selecionadas no preview e convertê-las para Base64
    document.getElementById("fotosAnimal").addEventListener("change", function(event) {
        const previewContainer = document.getElementById("previewFotos");
        previewContainer.innerHTML = ""; // Limpa o preview anterior
        fotosBase64 = []; // Limpa o array de Base64

        Array.from(event.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.width = "100px";
                img.style.margin = "10px";
                previewContainer.appendChild(img);

                // Salva a foto em Base64 no array
                fotosBase64.push(e.target.result);
            };
            reader.readAsDataURL(file); // Lê o arquivo de imagem e converte para Base64
        });
    });

    document.getElementById("animalForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nomeAnimal = document.getElementById("nomeAnimal").value;
        const fotosAnimal = fotosBase64; // Usa o array com as fotos em Base64

        const animaisCadastrados = JSON.parse(localStorage.getItem("animais")) || [];
        const novoAnimal = { nome: nomeAnimal, fotos: fotosAnimal };

        animaisCadastrados.push(novoAnimal);
        localStorage.setItem("animais", JSON.stringify(animaisCadastrados));

        // Redireciona para o menu
        mostrarMenu();
    });
});

document.getElementById("monitoramento").addEventListener("click", function() {
    esconderMenu();
    document.getElementById("content").innerHTML = `
        <h2>Monitoramento</h2>
        <br>

        <ul id="monitoramentoAnimais"></ul>
    `;

    const historico = JSON.parse(localStorage.getItem("animais")) || [];
    const lista = document.getElementById("monitoramentoAnimais");

    historico.forEach((animal, index) => {
        const li = document.createElement("li");
        li.style.cursor = "pointer";
        li.style.backgroundColor = "white";
        li.style.padding = "10px";
        li.style.width = "15rem";
        li.style.margin = "10px";
        li.style.display = "flex";
        li.style.alignItems = "center";

        // Adiciona a imagem (ou gif no futuro)
        const img = document.createElement("img");
        img.src = animal.fotos[0] || "gato1.jpg"; // Usa a primeira foto ou uma padrão
        img.style.width = "70px"; // Tamanho pequeno da imagem
        img.style.height = "70px";
        img.style.marginRight = "10px";

        li.prepend(img); // Adiciona a imagem antes do nome

        // Adiciona o nome do animal
        li.appendChild(document.createTextNode(animal.nome));

        // Cria o botão de deletar
        const deleteButton = document.createElement("button");
        deleteButton.style.background = "none"; // Remove fundo do botão
        deleteButton.style.border = "none"; // Remove borda do botão
        deleteButton.style.cursor = "pointer"; // Muda o cursor ao passar o mouse

        // Cria um span para o ícone de lixeira
        const deleteIcon = document.createElement("span");
        deleteIcon.textContent = "🗑️"; // Ícone de lixo
        deleteIcon.style.fontSize = "1.5rem"; // Aumenta o tamanho do ícone
        deleteIcon.style.marginLeft = "10px"; // Margem à esquerda para espaçamento

        deleteButton.appendChild(deleteIcon); // Adiciona o ícone ao botão

        deleteButton.addEventListener("click", function(event) {
            event.stopPropagation(); // Para não ativar o clique no animal
            const animaisCadastrados = JSON.parse(localStorage.getItem("animais")) || [];
            animaisCadastrados.splice(index, 1); // Remove o animal do array
            localStorage.setItem("animais", JSON.stringify(animaisCadastrados)); // Atualiza o localStorage
            li.remove(); // Remove o item da lista
        });

        li.appendChild(deleteButton); // Adiciona o botão de deletar
        lista.appendChild(li);

        
        li.addEventListener("click", function() {
            mostrarGif(); // Exibe o gif do gato ao clicar no nome do animal
        });
    });
});

// Função para exibir o GIF em vez do vídeo
function mostrarGif() {
    document.getElementById("content").innerHTML = `
        <img src="gatogif.gif" style="width: 400px; height: auto;">
    `;
    document.getElementById("backButton").style.display = "block"; // Garante que o botão volte a aparecer
}

// Evento do botão de voltar
document.getElementById("backButton").addEventListener("click", function() {
    mostrarMenu();
    document.getElementById("content").innerHTML = ""; // Limpa o conteúdo ao voltar
});



function mostrarGif() {
    document.getElementById("content").innerHTML = `
        <img src="gatogif.gif" style="width: 400px; height: auto;">
    `;
    document.getElementById("backButton").style.display = "block"; // Garante que o botão volte a aparecer
}

// Evento do botão de voltar
document.getElementById("backButton").addEventListener("click", function() {
    mostrarMenu();
    document.getElementById("content").innerHTML = ""; // Limpa o conteúdo ao voltar
});


function mostrarDetalhesAnimal(animal) {
    document.getElementById("content").innerHTML = `
        <h2>${animal.nome}</h2>
        <video src="videogato.mp4" controls style="width: 400px; margin: 10px;"></video>
        <div id="fotosContainer"></div>
        <div id="videosContainer"></div>
        <button class="back-button" id="backButtonDetalhes">← Voltar</button>
    `;

    const fotosContainer = document.getElementById("fotosContainer");
    if (animal.fotos.length > 0) {
        animal.fotos.forEach(foto => {
            const img = document.createElement("img");
            img.src = foto;
            img.style.width = "100px"; // Ajuste o tamanho conforme necessário
            img.style.margin = "10px";
            fotosContainer.appendChild(img);
        });
    }

    const videosContainer = document.getElementById("videosContainer");
    if (animal.videos.length > 0) {
        animal.videos.forEach(video => {
            const videoElement = document.createElement("video");
            videoElement.src = video;
            videoElement.controls = true; // Adiciona controles de vídeo
            videoElement.style.width = "600px"; // Ajuste o tamanho conforme necessário
            videoElement.style.margin = "10px";
            videosContainer.appendChild(videoElement);
        });
    }

    // Evento de voltar
    document.getElementById("backButtonDetalhes").addEventListener("click", function() {
        mostrarMenu(); // Mostra o menu novamente
        document.getElementById("content").innerHTML = ""; // Limpa o conteúdo
    });
}




document.getElementById("historicoMonitoramento").addEventListener("click", function() {
    esconderMenu();
    document.getElementById("content").innerHTML = `
        <h2>Histórico de Monitoramento</h2>
        <br>
        <ul id="historicoAnimais"></ul>
    `;

    const historico = JSON.parse(localStorage.getItem("animais")) || [];
    const lista = document.getElementById("historicoAnimais");

    historico.forEach(animal => {
        const li = document.createElement("li");
        li.textContent = animal.nome;
        li.style.cursor = "pointer";
        li.style.backgroundColor = "white";
        li.style.padding = "10px";
        li.style.width = "15rem";
        li.style.margin = "10px";
        li.style.display = "flex";
        li.style.alignItems = "center";

        const img = document.createElement("img");
        img.src = animal.fotos[0] || "gato1.jpg"; // Usa a primeira foto ou uma padrão
        img.style.width = "70px"; // Tamanho pequeno da imagem
        img.style.height = "70px";
        img.style.marginRight = "10px";

        li.prepend(img); // Adiciona a imagem antes do nome

        li.addEventListener("click", function() {
            mostrarDetalhesAnimal(animal); // Exibe detalhes do animal ao clicar
        });

        lista.appendChild(li);
    });
});

// Histórico de Testagens
document.getElementById("historicoTestagens").addEventListener("click", function () {
    esconderMenu();
    document.getElementById("content").innerHTML = `
        <h2>Histórico de Testagens</h2>
        <br>
        <ul id="historicoTestagensAnimais"></ul>
    `;

    const historico = JSON.parse(localStorage.getItem("animais")) || [];
    const lista = document.getElementById("historicoTestagensAnimais");

    historico.forEach(animal => {
        const li = document.createElement("li");
        li.textContent = animal.nome;
        li.style.cursor = "pointer";
        li.style.backgroundColor = "white";
        li.style.padding = "15px";
        li.style.width = "200px";
        li.style.margin = "10px";
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.borderRadius = "12px";
        li.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        li.style.transition = "all 0.3s ease";

        li.onmouseover = function () {
            li.style.transform = "scale(1.05)";
            li.style.backgroundColor = "#f0f0f0";
        };
        li.onmouseout = function () {
            li.style.transform = "scale(1)";
            li.style.backgroundColor = "white";
        };

        const img = document.createElement("img");
        img.src = animal.fotos[0] || "gato1.jpg"; // Usa a primeira foto ou uma padrão
        img.style.width = "70px"; // Tamanho pequeno da imagem
        img.style.height = "70px";
        img.style.borderRadius = "50%";
        img.style.marginRight = "10px";

        li.prepend(img); // Adiciona a imagem antes do nome

        li.addEventListener("click", function () {
            mostrarOpcoesDeTestes(animal); // Exibe a lista de opções de teste ao clicar
        });

        lista.appendChild(li);
    });
});

// Função para exibir as opções de teste ao clicar no nome do animal
function mostrarOpcoesDeTestes(animal) {
    document.getElementById("content").innerHTML = `
        <h2>Testes disponíveis para ${animal.nome}</h2>
        <br>
        <button class="teste-button" id="teste1">Teste 1</button>
        <button class="teste-button" id="teste2">Teste 2</button>
        <button class="teste-button" id="teste3">Teste 3</button>
        <button class="teste-button" id="teste4">Teste 4</button>
        <br>
        <button class="back-button" id="backButtonTestes">← Voltar</button>
    `;

    // Estilos adicionais para os botões de teste
    const buttons = document.querySelectorAll(".teste-button");
    buttons.forEach(button => {
        button.style.padding = "15px 30px"; // Aumenta o tamanho do botão
        button.style.margin = "10px";
        button.style.backgroundColor = "white"; // Torna o botão branco
        button.style.color = "#4A90E2"; // Cor do texto
        button.style.border = "2px solid #4A90E2"; // Borda azul
        button.style.borderRadius = "8px"; // Bordas arredondadas
        button.style.cursor = "pointer";
        button.style.fontSize = "16px"; // Aumenta o tamanho da fonte
        button.style.transition = "transform 0.3s, background-color 0.3s, box-shadow 0.3s"; // Transição suave

        // Efeito ao passar o mouse
        button.onmouseover = function () {
            button.style.transform = "scale(1.05)"; // Aumenta levemente o tamanho
            button.style.backgroundColor = "#f0f0f0"; // Muda para cinza claro
            button.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.1)"; // Adiciona sombra leve
        };
        button.onmouseout = function () {
            button.style.transform = "scale(1)"; // Volta ao tamanho original
            button.style.backgroundColor = "white"; // Volta ao branco
            button.style.boxShadow = "none"; // Remove a sombra
        };
    });

    // Adiciona eventos para os botões de teste
    document.getElementById("teste1").addEventListener("click", function () {
        mostrarTeste(animal, 1);
    });
    document.getElementById("teste2").addEventListener("click", function () {
        mostrarTeste(animal, 2);
    });
    document.getElementById("teste3").addEventListener("click", function () {
        mostrarTeste(animal, 3);
    });
    document.getElementById("teste4").addEventListener("click", function () {
        mostrarTeste(animal, 4);
    });

    // Estilos para o botão de voltar
    const backButton = document.getElementById("backButtonTestes");
    backButton.style.padding = "10px 20px";
    backButton.style.marginTop = "20px";
    backButton.style.backgroundColor = "#4A90E2";
    backButton.style.color = "white";
    backButton.style.border = "none";
    backButton.style.borderRadius = "5px";
    backButton.style.cursor = "pointer";

    // Botão de voltar
    backButton.addEventListener("click", function () {
        mostrarMenu(); // Volta ao menu principal
    });
}

// Função para exibir o teste selecionado
function mostrarTeste(animal, testeNumero) {
    document.getElementById("content").innerHTML = `
        <h2>Resultados do Teste ${testeNumero} para ${animal.nome}</h2>
        <br>
        <ul style="list-style: none; padding: 0;">
        <li style="background-color: #f9f9f9; padding: 10px; margin: 5px; border-radius: 8px; text-align: left;">Leucócitos: 4 (0-5)</li> 
        <li style="background-color: #f9f9f9; padding: 10px; margin: 5px; border-radius: 8px; text-align: left;">Urobilinogênio: 0.6 mg/dL (0.1-1.0 mg/dL)</li> 
        <li style="background-color: #f9f9f9; padding: 10px; margin: 5px; border-radius: 8px; text-align: left;">Bilirrubina: 0.2 mg/dL (0-0.2 mg/dL)</li>
        <li style="background-color: #f9f9f9; padding: 10px; margin: 5px; border-radius: 8px; text-align: left;">Hemoglobina: 11.0 g/dL (8.0 - 15.0 g/dL)</li>
        <li style="background-color: #f9f9f9; padding: 10px; margin: 5px; border-radius: 8px; text-align: left;">Nitrito: - (-)</li>
        <li style="background-color: #f9f9f9; padding: 10px; margin: 5px; border-radius: 8px; text-align: left;">pH: 6.5 (4.5 - 8.0)</li>
        <li style="background-color: #f9f9f9; padding: 10px; margin: 5px; border-radius: 8px; text-align: left;">Densidade: 1.020 (1.005 - 1.030)</li>
        <li style="background-color: #f9f9f9; padding: 10px; margin: 5px; border-radius: 8px; text-align: left;">Proteína: 10 mg/dL (< 10 mg/dL)</li>
        <li style="background-color: #f9f9f9; padding: 10px; margin: 5px; border-radius: 8px; text-align: left;">Glicose: - (-)</li>
        <li style="background-color: #f9f9f9; padding: 10px; margin: 5px; border-radius: 8px; text-align: left;">Corpos Cetônicos: - (-)</li>
        </ul>
        <br>
        <button class="back-button" id="backButtonTeste">← Voltar</button>
    `;

    // Estilos para o botão de voltar
    const backButtonTeste = document.getElementById("backButtonTeste");
    backButtonTeste.style.padding = "10px 20px";
    backButtonTeste.style.marginTop = "20px";
    backButtonTeste.style.backgroundColor = "#4A90E2";
    backButtonTeste.style.color = "white";
    backButtonTeste.style.border = "none";
    backButtonTeste.style.borderRadius = "5px";
    backButtonTeste.style.cursor = "pointer";

    // Adiciona evento para o botão de voltar
    backButtonTeste.addEventListener("click", function () {
        mostrarOpcoesDeTestes(animal); // Volta para as opções de testes
    });
}


// Funções para esconder e mostrar o menu
function esconderMenu() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("backButton").style.display = "block"; // Mostra o botão de voltar
}

function mostrarMenu() {
    document.getElementById("menu").style.display = "flex"; // Use flex para centralizar
    document.getElementById("backButton").style.display = "none"; // Esconde o botão de voltar
    document.getElementById("content").innerHTML = ""; // Limpa o conteúdo
}

document.getElementById("backButton").addEventListener("click", function() {
    mostrarMenu();
});

