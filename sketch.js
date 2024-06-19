
let play = 0;
let jogarSingle;
let jogarMulti;
let voltarMenu;
let placarParaVencer;
let modoDeJogo;
let dificuldade;
let botaoPlacar3;
let botaoPlacar5;
let botaoPlacar10;
let botaoFacil;
let botaoMedio;
let botaoDificil;

// Variáveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// Variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

// Velocidade da bolinha
let velocidadeXBolinha;
let velocidadeYBolinha;

// Variáveis da raquete do jogador
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Variáveis de som
let raquetada;
let ponto;
let trilha;

let colidiu = false;

function setup() {
createCanvas(600, 400); // Cria um canvas com tamanho 600x400 pixels
trilha.loop(); // Inicia a reprodução da música de fundo (presumindo que 'trilha' seja um som pré-carregado)
background(150, 80, 190); // Define a cor de fundo do canvas como roxo (150, 80, 190)

// Desenha a linha central do campo
stroke(255); // Define a cor do traço como branco
strokeWeight(4); // Define a espessura do traço como 4 pixels
line(width / 2, 0, width / 2, height); // Desenha uma linha vertical no centro do canvas
}

function draw() {
background(255, 203, 219);

if (play >= -5) {
removeElements(jogarSingle);
removeElements(jogarMulti);
removeElements(voltarMenu);
removeElements(botaoPlacar3);
removeElements(botaoPlacar5);
removeElements(botaoPlacar10);
}

if (play >= 5) {
mostraBolinha();
movimentaBolinha();
verificaColisaoBorda();
mostraRaquete(xRaquete, yRaquete);
movimentaMinhaRaquete();
verificaColisaoRaquete(xRaquete, yRaquete);
verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
mostraRaquete(xRaqueteOponente, yRaqueteOponente);
if (modoDeJogo === "multiplayer") {
movimentaRaqueteOponenteMultiplayer();
} else {
movimentaRaqueteOponenteSinglePlayer();
}
incluiPlacar();
linha();
mostraBotaoVoltar();
marcaPonto();
verificaVitoria();
} else if (play === 1) {
escolhePlacar();
} else if (play === 2) {
escolheDificuldade();
} else {
intro(); // Mostra a tela de introdução
}
}

function mostraBolinha() {
circle(xBolinha, yBolinha, diametro); // Desenha a bolinha
}

function movimentaBolinha() {
xBolinha += velocidadeXBolinha;
yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
if (xBolinha + raio > width || xBolinha - raio < 0) {
velocidadeXBolinha *= -1;
}
if (yBolinha + raio > height || yBolinha - raio < 0) {
velocidadeYBolinha *= -1;
}
}

function mostraRaquete(x, y) {
rect(x, y, raqueteComprimento, raqueteAltura); // Desenha a raquete
}

function movimentaMinhaRaquete() {
if (keyIsDown(UP_ARROW)) {
yRaquete -= 10;
}
if (keyIsDown(DOWN_ARROW)) {
yRaquete += 10;
}
if (yRaquete >= 310) {
yRaquete -= 10;
}
if (yRaquete <= 0) {
yRaquete += 10;
}
}

function verificaColisaoRaquete(x, y) {
colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
if (colidiu) {
velocidadeXBolinha *= -1;
raquetada.play();
}
}

function movimentaRaqueteOponenteMultiplayer() {
if (keyIsDown(87)) { // Tecla W
yRaqueteOponente -= 10;
}
if (keyIsDown(83)) { // Tecla S
yRaqueteOponente += 10;
}
if (yRaqueteOponente >= 310) {
yRaqueteOponente -= 10;
}
if (yRaqueteOponente <= 0) {
yRaqueteOponente += 10;
}
}

function movimentaRaqueteOponenteSinglePlayer() {
// Movimento automático do oponente no modo single player
if (yBolinha < yRaqueteOponente + raqueteAltura / 2) {
yRaqueteOponente -= 6;
} else {
yRaqueteOponente += 6;
}
if (yRaqueteOponente >= 310) {
yRaqueteOponente = 310;
}
if (yRaqueteOponente <= 0) {
yRaqueteOponente = 0;
}
}

function incluiPlacar() {
stroke(255);
textAlign(CENTER);
textSize(16);
fill(color(255, 0, 0));
rect(150, 10, 40, 20);
fill(0);
text(meusPontos, 170, 26);
fill(color(255, 0, 0));
rect(450, 10, 40, 20);
fill(0);
text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
if (xBolinha > 590) {
meusPontos += 1;
ponto.play();
}
if (xBolinha < 10) {
pontosDoOponente += 1;
ponto.play();
}
}

function verificaVitoria() {
if (meusPontos >= placarParaVencer || pontosDoOponente >= placarParaVencer) {
play = 0;
meusPontos = 0;
pontosDoOponente = 0;
xBolinha = 100;
yBolinha = 200;
velocidadeXBolinha = 6;
velocidadeYBolinha = 6;
alert("Fim de jogo!");
}
}

function preload() {
trilha = loadSound("trilha.mp3");
ponto = loadSound("ponto.mp3");
raquetada = loadSound("raquetada.mp3");
}

function linha() {
noFill();
stroke(255);
strokeWeight(4);
for (let i = 0; i < height; i += 20) {
line(width / 2, i, width / 2, i + 10);
}
}

function intro() {
textAlign(CENTER);
textSize(32);
fill(0);
text("Jogo do Pong", width / 2, 100);
textSize(18);
text("by Leonardo 2A", width / 2, 130);

jogarSingle = createButton('Single Player');
jogarSingle.position(200, 180);
jogarSingle.size(200, 90);
jogarSingle.style('background-color', '#90FFF1');
jogarSingle.mousePressed(() => escolheModo("singleplayer"));

jogarMulti = createButton('Multiplayer');
jogarMulti.position(200, 300);
jogarMulti.size(200, 90);
jogarMulti.style('background-color', '#90FFF1');
jogarMulti.mousePressed(() => escolheModo("multiplayer"));
}

function escolheModo(mode) {
modoDeJogo = mode;
if (modoDeJogo === "singleplayer") {
play = 2;
} else {
play = 1;
}
}

function escolhePlacar() {
textAlign(CENTER);
textSize(24);
fill(0);
text("Escolha o placar para vencer", width / 2, 100);

botaoPlacar3 = createButton('3 Pontos');
botaoPlacar3.position(200, 150);
botaoPlacar3.size(200, 60);
botaoPlacar3.style('background-color', '#FFCC00');
botaoPlacar3.mousePressed(() => startGame(3));

botaoPlacar5 = createButton('5 Pontos');
botaoPlacar5.position(200, 220);
botaoPlacar5.size(200, 60);
botaoPlacar5.style('background-color', '#FFCC00');
botaoPlacar5.mousePressed(() => startGame(5));

botaoPlacar10 = createButton('10 Pontos');
botaoPlacar10.position(200, 290);
botaoPlacar10.size(200, 60);
botaoPlacar10.style('background-color', '#FFCC00');
botaoPlacar10.mousePressed(() => startGame(10));
}

function escolheDificuldade() {
textAlign(CENTER);
textSize(24);
fill(0);
text("Escolha a dificuldade", width / 2, 100);

botaoFacil = createButton('Fácil');
botaoFacil.position(200, 150);
botaoFacil.size(200, 60);
botaoFacil.style('background-color', '#00FF00');
botaoFacil.mousePressed(() => setDificuldade("facil"));

botaoMedio = createButton('Médio');
botaoMedio.position(200, 220);
botaoMedio.size(200, 60);
botaoMedio.style('background-color', '#FFC107');
botaoMedio.mousePressed(() => setDificuldade("medio"))

botaoDificil = createButton('Difícil');
botaoDificil.position(200, 289);
botaoDificil.size(200, 60);
botaoDificil.style('background-color', '#FF0000');
botaoDificil.mousePressed(() => setDificuldade("dificil"));
}

function setDificuldade(nivel) {
dificuldade = nivel;
if (dificuldade === "facil") {
velocidadeXBolinha = 3;
velocidadeYBolinha = 3;
} else if (dificuldade === "medio") {
velocidadeXBolinha = 6;
velocidadeYBolinha = 6;
} else if(dificuldade == "dificil"){
velocidadeXBolinha = 9;
velocidadeYBolinha = 9;
}
play = 1;
}

function startGame(placar) {
placarParaVencer = placar;
play += 10;
}

function mostraBotaoVoltar() {
voltarMenu = createButton('Voltar');
voltarMenu.position(277, 10);
voltarMenu.size(50, 40);
voltarMenu.style('background-color', '#FF5733');
voltarMenu.mousePressed(voltarParaMenu);
}

function voltarParaMenu() {
play = 0;
meusPontos = 0;
pontosDoOponente = 0;
xBolinha = 100;
yBolinha = 200;
}
function incluiPlacar() {

strokeWeight(2);
stroke(255);
fill('#FF5733');
rect(130, 10, 80, 40, 10);
noStroke();
fill(255);
textAlign(CENTER);
textSize(28);
text(meusPontos, 170, 35);
strokeWeight(2);
stroke(255);
fill('#FF5733');
rect(390, 10, 80, 40, 10);
noStroke();
fill(255);
textAlign(CENTER);
textSize(28);
text(pontosDoOponente, 430, 35);
}
