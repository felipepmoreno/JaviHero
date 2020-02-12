var canvas, ctx, audio,

//var t = 5; é o tempo de spawn dos inimigos, ele aumentara para dificultar o jogo futuramente
	//objeto Inimigos
	enemies = {
		//atributos do objeto
		x: 550,
		y: (Math.random()*jogo.height),
		height:36,
		width:25,
		speed:1,
		direction: 0,
		bornspeed: 300,
		inimigos: 0,

	};
	//objeto Player
	player = {
		//atributos do objeto
		x: 50,
		y: 200,
		height: 50,
		width: 50,
		speed: 10,
		direction: 5,
		life: 5,
		points: 0,
		state: 0,
		draw: function(){
			img = new Image();
			img.src = "nave.png";
			ctx.drawImage(img, this.x, this.y);
		},
	};
	tiro = {
		x: player.x + 10,
		y: player.y,
		speed: 1000,
		direction: 0,
		height: 5,
		width: 10,
		cor: 'red',
}


//detecta a colisão entre o tiro e o inimigo
function inimigo_morto(){
//parte logica da colisão
colisao1 = (tiro.x + tiro.width >= enemies.x+0.5) && (enemies.x+0.5 + enemies.width >= tiro.x);
colisao2 = (tiro.y + tiro.height >= enemies.y+0.5) && (enemies.y+0.5 + enemies.height >= tiro.y);
//caso houver colisão 
if((colisao1 && colisao2)){
 	player.points++;
	enemies.x = 550
	enemies.y = (Math.random()*jogo.height);
	tiro.x = 600;
}
};

desenho_tiro = function(){
	ctx.fillStyle = tiro.cor; 
	ctx.fillRect(tiro.x, tiro.y, tiro.width, tiro.height); 
	tiro.x+=tiro.speed;
}
	//Desenha os elementos animados do game
	function draw(){
		//Limpa o canvas, para redesenhar os elementos animados
		ctx.clearRect(0, 0, canvas.width, canvas.height);		
		//Intancia a imagem do fundo e o desenha no canvas
		img = new Image();
		img.src = "fundo.jpg";
		ctx.drawImage(img, 0, 0);
		//Invoca a função para desenhar os objetos
		player.draw();		
		//desenha inimigos a cada 5s
		desenha_inimigo();
		//desenha os tiros		
		desenho_tiro();
		//altera velocidade do tiro
		tiro.speed = 25;
		tiro.y = player.y + 25; //ponto de partida do tiro
		document.addEventListener("keydown", atirar);
		function atirar(e){//função para atirar
				tiro.direction = e.keyCode//direção do tiro

				//analisa valores para atirar
			switch(tiro.direction){
				case 32:
					if(tiro.x > 550) 
					{
						tiro.x = player.x + 10;
						desenho_tiro();
						tiro.x += tiro.speed;
					}
					break;					
			}
	}
}
	
//função para desenhar os inimigos
function desenha_inimigo(){
		if (enemies.x > 30){
			img = new Image();
			img.src = "Inimigo.png";
			ctx.drawImage(img, enemies.x, enemies.y);//desenha
			enemies.x--;//vão na direção do player
			if (enemies.y < 60){
				enemies.y = 60;}
			if (enemies.y > 400){
				enemies.y = 400;}
		}		
		if (enemies.x == 30){
			enemies.x = 550
			enemies.y = (Math.random()*jogo.height);
			//definindo limites para o sapwn dos inimigos
			enemies.inimigos++;//aumenta numero de inimigos
			if (enemies.inimigos % 5 == 0){//Se 10 inimigos estiverem vivos, perde-se uma vida
				player.life--;
				/*t= t-0.1; //a dificuldade aumenta!
				if (t==0.1){
					t = 0.2;
				}*/
				//setInterval(desenha_inimigo,155);
		}
	}
}

	//Função principal
	function main(){
		

		audio = new Audio();
		audio.src = "musica.mp3";

		//chama a função para movimentar o player (PlayerDirection) quando uma tecla for pressionada, passando o evento(tecla) como parâmetro
		document.addEventListener("keydown", PlayerDirection);

		//movimenta o player de acordo com o código da tecla passado via parâmetro pela função keydown
		function PlayerDirection(e){
			player.direction = e.keyCode; //define a direção do player como o código da tecla passado

			//analisa os valores da direção do player
			switch(player.direction){	
				case 38: //se for 38 (seta para cima), a posição do jogador y no canvas é decrementada com a sua velocida, ou seja, ele sobe
					player.y -= player.speed;
					if (player.y < 30){
						player.y = 30;
					}
					break
				case 40: //se for 40 (seta para baixo), a posição do jogador y no canvas é incrementada com a sua velocidade, ou seja, ele desce
					player.y += player.speed;
					if (player.y > 400){
						player.y = 400;
					}
					break
				case 82:
					jogarnovamente();
					break;
				}					
		}

		function jogarnovamente(){
			location.reload();
		}
		//invoca a função run, para rodar o game
		run();
	}

	//Roda o game em loop, chamando sempre a função de desenhar, atualizar os elementos animados e as informações na tela
	function run(){

		audio.play();
		inimigo_morto();
		
		draw();//elementos animados
		//placares
		ctx.fillStyle = 'white';
  		ctx.font = '20px Helvetica';
  		ctx.textAlign = 'left';
  		ctx.textBaseline = 'top';
  		ctx.fillText('Invasores: ' + enemies.inimigos, 16, 16);

  		ctx.fillStyle = 'white';
  		ctx.font = '20px Helvetica';
  		ctx.textAlign = 'left';
  		ctx.textBaseline = 'top';
  		ctx.fillText('Vidas: ' + player.life, 450, 16);

  		ctx.fillStyle = 'white';
  		ctx.font = '20px Helvetica';
  		ctx.textAlign = 'left';
  		ctx.textBaseline = 'top';
  		ctx.fillText('Pontuação: ' + player.points, 210, 16);

  		//se o jogador fizer 50pontos ele vence!
  		if (player.points >= 50){
  			ctx.fillStyle = 'white';
  			ctx.font = '110px Helvetica';
  			ctx.textAlign = 'left';
  			ctx.textBaseline = 'top';
  			ctx.fillText('VENCEU!', 35, 180);
  		//valores se tornam fixos
  			player.points = 50;
  			player.life = ' :D';
  			enemies.inimigos = 0;
  			player.y = 50;
  		//opção de jogar novamente
  			ctx.fillStyle = 'white';
  			ctx.font = '15px Helvetica';
  			ctx.textAlign = 'left';
  			ctx.textBaseline = 'down';
  			ctx.fillText('Pressione a tecla "R" para reiniciar...', 35, 300);
  		}
  		//se perder todas vidas, ele perde... :(
  		if (player.life <= 0){
  			ctx.fillStyle = 'white';
  			ctx.font = '110px Helvetica';
  			ctx.textAlign = 'left';
  			ctx.textBaseline = 'top';
  			ctx.fillText('PERDEU!', 35, 180);

  			player.points = 0;
  			player.life = 0;
  			enemies.inimigos = 0;
  			player.y = 50;
  			//opção de jogar novamente
  			ctx.fillStyle = 'white';
  			ctx.font = '15px Helvetica';
  			ctx.textAlign = 'left';
  			ctx.textBaseline = 'down';
  			ctx.fillText('Pressione a tecla "R" para reiniciar...', 35, 300);
  		}

		//deixa a função run em loop
		window.requestAnimationFrame(run);
	}

	//Instancia o canvas e define o seu contexto
canvas = document.getElementById("jogo");
ctx = canvas.getContext("2d");
//chama a função principal toda vez q a página for iniciada
/*if (player.points >= 20){
	setInterval(desenha_inimigo2,0.3);
}*/
var s = document.getElementById("estado");
estado  = 0;

function main2(){
		img2 = new Image();
		img2.src = "fundo.jpg";
		ctx.drawImage(img2, 0, 0);
		//Invoca a função para desenhar os objetos
		player.draw();		
		//desenha inimigos a cada 5s
		desenha_inimigo();
		//desenha os tiros	
		audio2 = new Audio();
		audio2.src = "intro_msc.mp3";
		audio2.play()
		ctx.fillStyle = 'blue';
		ctx.font = '100px Helvetica';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillText('JaviHero', 35, 180);
		ctx.fillStyle = 'blue';
		ctx.font = '20px Helvetica';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'down';
		ctx.fillText('Pressione a tecla "J" para começar', 50, 300);
		document.addEventListener("keydown", jogar);
		function jogar(e){
				estado = e.keyCode
				switch(estado){
					case 74:
					main();
					setInterval(desenha_inimigo,1);
					//isto NÃO é para estar dentro do loop! Chama a funçao desenha_inimigo a cada tempo 't', JA É UM LOOP DE 't' EM 't'!!!
					break;
				}
  			}
	}

main2();//chama main

