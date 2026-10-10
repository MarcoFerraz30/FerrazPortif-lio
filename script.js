const botaoTema = document.getElementById("botao-tema");
const botaoVerTodos = document.getElementById("ver-todos");
const listaProjetos = document.getElementById("lista-projetos");
const formulario = document.getElementById("formulario-contato");
const retornoFormulario = document.getElementById("retorno-formulario");

// Recupera a preferência de tema, quando o navegador permitir.
let temaSalvo = null;

try {
  temaSalvo = localStorage.getItem("tema-portfolio");
} catch {
  // O site continua funcionando mesmo sem armazenamento disponível.
}

const preferenciaEscura = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const iniciarEscuro =
  temaSalvo === "escuro" || (temaSalvo === null && preferenciaEscura);

function aplicarTema(escuro) {
  document.body.classList.toggle("modo-escuro", escuro);

  botaoTema.setAttribute("aria-pressed", String(escuro));

  botaoTema.textContent = escuro
    ? "Ativar modo claro"
    : "Ativar modo escuro";
}

aplicarTema(iniciarEscuro);

botaoTema.addEventListener("click", () => {
  const escuro = !document.body.classList.contains("modo-escuro");

  aplicarTema(escuro);

  try {
    localStorage.setItem("tema-portfolio", escuro ? "escuro" : "claro");
  } catch {
    // Apenas a persistência da preferência fica indisponível.
  }
});

// Mostra ou esconde a lista dos quatro projetos.
botaoVerTodos.addEventListener("click", () => {
  const expandido = botaoVerTodos.getAttribute("aria-expanded") === "true";

  botaoVerTodos.setAttribute("aria-expanded", String(!expandido));
  listaProjetos.hidden = expandido;

  botaoVerTodos.innerHTML = expandido
    ? 'VER TODOS <span aria-hidden="true">→</span>'
    : 'OCULTAR LISTA <span aria-hidden="true">↑</span>';
});

// Demonstração local: valida, mas não envia nem armazena os dados.
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nome");
  const mensagem = document.getElementById("mensagem");

  nome.setCustomValidity(
    nome.value.trim() ? "" : "Digite seu nome."
  );

  mensagem.setCustomValidity(
    mensagem.value.trim() ? "" : "Digite uma mensagem."
  );

  if (!formulario.reportValidity()) {
    return;
  }

  retornoFormulario.textContent =
    "Os campos estão válidos. Nenhuma mensagem foi enviada: " +
    "é necessário conectar o formulário a um serviço de envio.";
});

formulario.addEventListener("input", (evento) => {
  if (typeof evento.target.setCustomValidity === "function") {
    evento.target.setCustomValidity("");
  }

  retornoFormulario.textContent = "";
});

document.getElementById("ano").textContent = new Date().getFullYear();