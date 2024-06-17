//variáveis intro
let play=0
let jogar


//variáveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;


//sons do jogo
let raquetada;
let ponto;
let trilha;

let colidiu = false;

function setup() {
  createCanvas(600, 400);
    trilha.loop();
}

function draw() {
     background(255, 203, 219);
   if(play>=-5){
     removeElements(jogar)
   }
  if(play >=5){
     
  
  mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    incluiPlacar(); 
    mostrarmenu();
     marcaPonto();
    linha();
   }
  else {
  intro();
  }
}
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
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

function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
   if(yRaquete >= 310){
      yRaquete -=10;
    }
  if(yRaquete <= 0){
      yRaquete +=10;
    }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *=-1;
     raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1;
        raquetada.play();
  }
}

function movimentaRaqueteOponente(){
    if (keyIsDown(87)){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)){
        yRaqueteOponente += 10;
    }
    if(yRaqueteOponente >= 310){
      yRaqueteOponente -=10;
    }
  if(yRaqueteOponente <= 0){
      yRaqueteOponente +=10;
    }
}


function incluiPlacar(){
  stroke(255)
    textAlign(CENTER);
    textSize(16);    
  fill(color (255,0, 0));
  rect(150, 10, 40, 20);
    fill(0);
    text(meusPontos, 170, 26);
    fill(color(255,0, 0));
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


function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function linha(){
stroke(255);
fill(255,15,192);
rect(290,0,10,400)
}
function intro() {
  jogar = createButton('JOGAR');
  jogar.position(200, 260);
  jogar.size(200, 90);
  jogar.style('background-color', '#90FFF1'); 
  jogar.mousePressed(jogoar);
}

function jogoar(){
  play +=10
  
}
function mostrarmenu(){
  if (keyIsDown(8)){
    play -=10
  }}
