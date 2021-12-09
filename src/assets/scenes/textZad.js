
class textZad extends Phaser.Scene {
	
	constructor() {
	
		super("textZad");		
	}
		
	/* START-USER-CODE */

	init(data){	
		this.once = true
		window.activeScene = 'textZad'
	}

	_create(){
		var graphics = this.add.graphics({ fillStyle: { color: 0x040010, alpha: 0.9 } });	
        var rect = new Phaser.Geom.Rectangle(0, 0, 1800, 800);
		graphics.fillRectShape(rect);

		this.nootebook = this.add.image(900, 400, 'notebookBack').setOrigin(0.5);	
		this.nootebook.scale = 1.6

		this.start = this.add.container(0, 0)

		var ship = this.add.image(900,250,'g_copy', 'ship').setOrigin(0.5)
		ship.scale = 1.5
		var textAfter = this.add.text(900,400, '',{ fontFamily: 'Minecraft', fontSize: 25, color: '#685e8e' }).setOrigin(0.5)
		textAfter.text = "Всем приветик в этом чатике"	
		this.go = this.add.image(900,500,'g_copy', 'go').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.go.scale = 1.4
		
		this.start.add(ship)
		this.start.add(textAfter)
		this.start.add(this.go)

		this.game = this.add.container(0,0)

		var backGame = this.add.image(620,345,'g_copy', 'back_game').setOrigin(0.5)
		backGame.scale = 1.6
		this.game.add(backGame)

		this.sneja = this.add.image(500,145, 'g_copy', 'sneja').setOrigin(0).setInteractive({useHandCursor:true})
		this.sneja.scale = 1.7
		this.game.add(this.sneja)
		
		this.krovo = this.add.image(500,220, 'g_copy', 'krovo').setOrigin(0).setInteractive({useHandCursor:true})
		this.krovo.scale = 1.7
		this.game.add(this.krovo)

		this.yY = this.add.image(500,295, 'g_copy', 'Y').setOrigin(0).setInteractive({useHandCursor:true})
		this.yY.scale = 1.7
		this.game.add(this.yY)

		this.smash = this.add.image(500,370, 'g_copy', 'smash').setOrigin(0).setInteractive({useHandCursor:true})
		this.smash.scale = 1.7
		this.game.add(this.smash)

		this.qiwi = this.add.image(500,445, 'g_copy', 'qiwi').setOrigin(0).setInteractive({useHandCursor:true})
		this.qiwi.scale = 1.7
		this.game.add(this.qiwi)

		this.hot = this.add.image(500,520, 'g_copy', 'hot').setOrigin(0).setInteractive({useHandCursor:true})
		this.hot.scale = 1.7
		this.game.add(this.hot)


	}

	check(e){
		console.log(e)
	}

	create(){
		       
				this._create();

				this.div1 = document.createElement('div');
				this.div1.setAttribute('class','custom-scroll')
 	 			this.div1.style = 'background: none; color:#6b6192; width: 500px; height: 490px; overflow: auto; font: 23px Minecraft; line-height:33px; font-weight: bold;   ';
				var textT = `Из каждой рекламы доносятся дружелюбные голоса банков: 
				«мы работаем для вашего 
				комфорта», «вы — наш приоритет». 
				А как на самом деле?
				
				Открыть счет можно только 
				по < <span class="ffff" style="color:#fff; cursor:pointer;" onClick="getQ(this,[0,1])">паспорту</span> / <span style="color:#fff; cursor:pointer;" onClick="getQ(this,[0,2])" >правам</span> / <span style="color:#fff; cursor:pointer;" onClick="getQ(this,[0,3])">фотке</span> >
				А что, если не хочется сливать информацию о себе? Ведь все слышали про эти «неувязочки» 
				с клиентскими паспортными данными. Поездка в офис съедает уйму времени. Чтобы узнать что к чему, во многих банках требуется 
				< <span style="color:#fff; cursor:pointer;" onClick="getQ(this,[1,1])">личное присутствие</span> / <span style="color:#fff; cursor:pointer;" onClick="getQ(this,[1,2])">запись голоса</span> / <span style="color:#fff; cursor:pointer;" onClick="getQ(this,[1,3])">SMS-сообщение</span> >. Иногда приходится пробираться через весь город, чтобы получить отказ. Доступ к < <span style="color:#fff; cursor:pointer;" onClick="getQ(this,[2,1])">деньгам</span> / <span style="color:#fff; cursor:pointer;" onClick="getQ(this,[2,2])">терминалам</span> / <span style="color:#fff; cursor:pointer;" onClick="getQ(this,[2,3])">активам</span> > ограничен. Захочешь снять или положить деньги, будь добр побегай по всему городу! Ну и как вообще этим 
				пользоваться… 
				
				<div style="width:100%">
					<img src="assets/sprites/not.png" class="gConnectNot" onClick="getVariant(false)" style=" display:block; width:70%; margin: 30px auto; cursor:pointer;" />
					<img src="assets/sprites/yes.png" class="gConnectYes" onClick="getVariant(true)" style=" display:none; width:70%; margin: 30px auto; cursor:pointer;" />
				</div>
				<img class="custom-sroll-game" src="assets/sprites/scroll.png"/>
				`;
				this.div1.innerHTML = textT				
	
				var element1 = this.add.dom(780, 100, this.div1).setOrigin(0);
				
				this.CustomScroll = document.querySelector(".custom-sroll-game")
				element1.setDepth(2);

						

				this.game.add(element1)

				this.konec = this.add.image(900,350,'g_copy', 'rez_copy').setOrigin(0.5).setInteractive({useHandCursor:true})
				this.konec.scale = 3
				this.konec.alpha = 0


				this.konec.once('pointerdown', function(event) {			
					window.gamerMoney += 2000
					window.getScore = true
					this.scene.switch('game');	
					this.scene.stop('textZad')
				},this);

				this.modalText = this.make.text({
					x: 720,
					y: 320,
					text: '',
					origin: { x: 0, y: 0 },
					style: {
						align: 'center',
						font: 'bold 25px Minecraft Arial',
						fill: '#685e8e',
						wordWrap: { width: 480 }
					}				
				});
				this.modalText.text = 'fdfds'

					
				this.game.alpha = 0
				this.start.alpha = 1
				this.modalText.alpha = 0

				if (this.sys.game.device.input.touch) {
					console.log('mob')		
					this.nootebook.y += 80
					this.nootebook.scale = 2.3	
					this.start.scale = 1.5
					this.start.x -= 450
					this.start.y -= 100
					this.modalText.scale = 1.5
					this.modalText.x -= 50
					this.modalText.y -= 0
					this.game.scale = 1.5
					this.game.x -= 450
					this.game.y -= 100	
					this.konec.scale = 5

				}
				
				this.sneja.on('pointerover', (event) => {
					// this.sneja.setTint(0xff0000);
				})
				this.go.on('pointerdown', function(event) {			
						// this.go.alpha = 0
						// this.textAfter.alpha = 0
						// this.ship.alpha = 0		
						this.start.alpha = 0
						this.game.alpha = 1

						dataLayer.push({
							'event':'whitenoise',
								'eventCategory':'квест', 
								'eventAction':'Мини-игра', 
								'eventLabel':'Го напишем статью'// идентификатор мини-игры, которую проходит пользователь 
						});
				},this);
				
				
	}

	callBackGame(e){
		this.time.delayedCall(2000, () => { 
			this.game.alpha = 1
			this.modalText.alpha = 0			
		}, [], this);
	}


	update() {

		this.CustomScroll.style.marginBottom =  "-" + (400 *(this.div1.scrollTop/442)) + "px"
		this.CustomScroll.style.opacity = ((442 - this.div1.scrollTop)/442)
		// ((442 - this.div1.scrollTop)/442)

		if(window.clickGameText){
			window.clickGameText = false
			if(window.clickGameWhat){
				if(window.gameTextArray[0] == 1 && window.gameTextArray[1] == 1 && window.gameTextArray[2] == 1){
					if(this.once){
						this.div1.remove()
						this.game.alpha = 0
						this.konec.alpha = 1 	
						this.once = false			
					}	
				} else {
					this.game.alpha = 0
					this.modalText.alpha = 1
					this.modalText.text = 'Вспомни разговор с Медведем'
					this.game.alpha = 0
					this.modalText.alpha = 1
					this.callBackGame()
				}
				
			} else {
				this.game.alpha = 0
				this.modalText.alpha = 1
				this.modalText.text = 'Вспомни разговор с Медведем'
				this.callBackGame()
			}
		}
	}

}


  