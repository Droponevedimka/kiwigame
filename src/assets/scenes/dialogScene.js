
class dialogScene extends Phaser.Scene {
	
	constructor() {	
		super("dialogScene");		
	}
		
	/* START-USER-CODE */

	init(data){	
		this.data = data
		// this.data = {name:"allPers",  value:[{"iam":true,"who": "ded", "text":"Давай скорее терминал! Автобус скоро приедет!"},
		// 										{"iam":false,"who": "bar", "text":"5 сек… Готово, держи билет!"},
		// 											{"iam":false,"who": "sborshik", "text":"Вы уж не обессудьте, но можно вас, как Деда Мороза, попросить напоследок? Есть у меня одно желание — хочу открыть онлайн-магазин «Ломовая затея» для ценителей металла. Сам не справлюсь: документы в райцентре подай, бюрократов обойди…"},
		// 												{"iam":false,"who": "medved", "text":"Может, и мне тогда счет откроем? А что, всем можно, а мне нельзя?"},
		// 													{"iam":false,"who": "bar", "text":"Ставлю на то, что волшебник хочет помочь кое-кому с беттингом…"},
		// 														{"iam":true,"who": "ded", "text":"Вы что, так ничего и не поняли? Да нет никаких чудес, вы не в долбанную сказку попали! Это жизнь, настоящая, другой не будет. И тут каждый сам за себя вывозит! Хотите стать другими — виртуалка и ноут в помощь. Вы и сами все сможете, а я… Я выбрал свой путь."}]}
		
		this.frame = data.frame
		this.now = 0
		this.over = 0
		this.myText
		this.nextBtn
		this.stavka = true
		this.skip = true
		this.clickStavka = true
		this.finalStavka = false
		this.textStavka = ''
		this.switchBtn = true
		this.metaDialog 
	}

	create(){
		this.scene.bringToTop();
		var graphics = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.8 } });	
        var rect = new Phaser.Geom.Rectangle(0, 0, 1800, 800);
		graphics.fillRectShape(rect);	

		this.dialogBack = this.add.image(900,400,'dialog-back').setOrigin(0.5)
		this.dialogBack.scale = 1.5
		this.dialogBack.setInteractive({ useHandCursor: true  } )
		
		this.protaganist = this.add.image(350,345, 'dialog-and-podsvet', 'ded').setOrigin(0)
		this.antoganist = this.add.image(1305,345, 'dialog-and-podsvet', this.data.name == "allPers" ? this.data.value[1].who : this.data.name).setOrigin(0)
		
		

		graphics = this.add.graphics({ fillStyle: { color: 0x2D3540 } });

		var triangle = Phaser.Geom.Triangle.BuildEquilateral(580, 410, 40);
		Phaser.Geom.Triangle.Rotate(triangle, 0.5);
		
		this.triangleLeft = graphics.fillTriangleShape(triangle);

		var graphicsTwo = this.add.graphics({ fillStyle: { color: 0x2D3540 } });

		var triangleTwo = Phaser.Geom.Triangle.BuildEquilateral(1220, 410, 40);
		Phaser.Geom.Triangle.Rotate(triangleTwo, 1.5);

		this.triangleRight = graphicsTwo.fillTriangleShape(triangleTwo);

		this.triangleLeft.alpha = 0
		this.triangleRight.alpha = 0

				this.whoSpeakText = this.add.text(620,260, 'Дед',{
				font: 'bold 20px Minecraft Arial',
				fill: '#865ED3'
				}).setOrigin(0)

				this.myText = this.make.text({
					x: 620,
					y: 300,
					text: '...',
					origin: { x: 0, y: 0 },
					style: {
						font: 'bold 20px Minecraft Arial',
						fill: 'white',
						wordWrap: { width: 580 },
						lineSpacing: 8,
					}
				});

				this.nextBtn = this.make.text({
					x: 620,
					y: 520,
					text: '',
					origin: { x: 0, y: 0 },
					style: {
						font: 'bold 20px Minecraft Arial',
						fill: '#FF8C00',
						wordWrap: { width: 280 }
					}				
				});
				this.leftBtn = this.make.text({
					x: 620,
					y: 520,
					text: '',
					origin: { x: 0, y: 0 },
					style: {
						font: 'bold 20px Minecraft Arial',
						fill: '#fedd00',
						wordWrap: { width: 280 }
					}				
				});
				this.centerBtn = this.make.text({
					x: 860,
					y: 520,
					text: '',
					origin: { x: 0, y: 0 },
					style: {
						font: 'bold 20px Minecraft Arial',
						fill: '#fedd00',
						wordWrap: { width: 280 }
					}				
				});
				this.rightBtn = this.make.text({
					x: 1180,
					y: 520,
					text: '',
					origin: { x: 1, y: 0 },
					style: {
						font: 'bold 20px Minecraft Arial',
						fill: '#fedd00',
						wordWrap: { width: 280 }
					}				
				});
				this.leftBtn.setInteractive({ useHandCursor: true  } )
				this.centerBtn.setInteractive({ useHandCursor: true  } )
				this.rightBtn.setInteractive({ useHandCursor: true  } )
				this.leftBtn.alpha = 0
				this.centerBtn.alpha = 0
				this.rightBtn.alpha = 0

		
		this.nextBtn.alpha = 0
		this.nextBtn.depth = 5
		
		this.over = this.metaDialog = this.data.value.length
		
		this.leftBtn.on('pointerdown', function(pointer){
			if(this.stavka){
				this.skip = true
				this.stavka = false
				this.myText.text = 'Кто выйграет Вымпел или Метеор?'
				this.leftBtn.text = "Победа Вымпела"
				this.centerBtn.alpha = 1
				this.centerBtn.text = "Ничья"
				this.rightBtn.text = "Победа Метеора"
			} else {
				if(this.clickStavka){ this.loseGame(); this.clickStavka = false;}
			}
			
		}, this);
		this.centerBtn.on('pointerdown', function(pointer){
			if(this.clickStavka){ this.winGame(); this.clickStavka = false;}
		}, this);
		this.rightBtn.on('pointerdown', function(pointer){
			if(this.stavka){
				if(this.clickStavka){ this.nonGame(); this.clickStavka = false;}				
			} else {
				this.skip = true
				if(this.clickStavka){ this.loseGame(); this.clickStavka = false;}
			}
		}, this);

		this.goshowText(this.data.value[this.now])
	   	
		 rect = graphics.setInteractive();

		 this.dialogBack.on('pointerdown', () =>{

			if(this.switchBtn){
				this.switchBtn = !this.switchBtn
				if(this.skip){
					if(!this.stavka){				
						this.timedEvent.remove(false);
						this.myText.text = this.textForOut
						this.nextBtn.text = 'Дальше'
						this.leftBtn.alpha = 0
						this.centerBtn.alpha = 0
						this.rightBtn.alpha = 0
						this.nextBtn.alpha = 1
					} else {			
						this.timedEvent.remove(false);
						this.nextBtn.text = 'Дальше'
						this.nextBtn.alpha = 1
						this.myText.text = this.textForOut						
					}
				}
			} else {
				this.switchBtn = !this.switchBtn
				this.getNext()
			}			
		})
	}

	getNext(){
		if(this.now < this.over - 1){
			
			if(this.data.name == 'allPers' && this.now < this.over - 2){									
				this.antoganist.setFrame(this.data.value[this.now+1].who)		
								
			}
			this.nextBtn.alpha = 0
			if(this.now < this.metaDialog)
			{
				dataLayer.push({
					'event':'whitenoise',
						'eventCategory':'квест', 
						'eventAction':'клик', 
						'eventLabel': `${this.frame}-${this.now}` // в переменной требуется передавать идентификатор с порядковым номером экрана. Список переменных: 
				
				});
			}
			this.now++
			this.goshowText(this.data.value[this.now])				
			// this.now++
			// this.goshowText(this.data.value[this.now])
		} else {

			if(this.now < this.metaDialog)
			{
				dataLayer.push({
					'event':'whitenoise',
						'eventCategory':'квест', 
						'eventAction':'клик', 
						'eventLabel': `${this.frame}-${this.now}` // в переменной требуется передавать идентификатор с порядковым номером экрана. Список переменных: 
				
				});
			}
			if(this.data.contora){		
				if(this.finalStavka){							
					window.getScore = true
					this.scene.resume('game');
					this.scene.stop('dialogScene')						
				} else {					
				this.skip = false		
				this.nextBtn.alpha = 0
				this.leftBtn.alpha = 1
				this.leftBtn.text = "Сделать ставку"
				this.rightBtn.alpha = 1
				this.rightBtn.text = "Отказаться"
				this.finalStavka = true
				
				}
			} else {
				if(this.data.name == "allPers"){
					window.gamerMoney -= 6000
					window.getScore = true
					window.theEnd = true						
				}
				this.scene.resume('game');
				this.scene.stop('dialogScene')	
				this.now++				
			}				
		}		
	}

	update() {
		
	}

	nonGame(){
		this.stavka = false
		this.skip = true
		this.data.value.push({"iam":true, "text":"С ума сошел? Не, обойдусь, есть дела поважнее."})
		this.over = this.data.value.length
		this.now++
		
		this.switchBtn = true
		this.textForOut = this.data.value[this.now].text
		this.textForInt = 0
		this.myText.text = ''
		this.timedEvent = this.time.addEvent({ delay: 70, callback: this.showOff, callbackScope: this, loop: true });	
	}
	winGame(){
		this.data.value.push({"iam":false, "text":"Ты победил! Выигрыш 1000 зачислен на кошелек"})
		this.data.value.push({"iam":true, "text":"Офигеть! Офигеть! И зачем я столько лет пахал на корпоратах?! Уффф, аж ладошки вспотели. Наконец-то появился шанс выбраться отсюда!"})
		this.over = this.data.value.length
		this.now++		

		this.textForOut = this.data.value[this.now].text
		this.textForInt = 0
		this.switchBtn = true
		this.myText.text = ''
		window.gamerMoney += 1000
		this.timedEvent = this.time.addEvent({ delay: 60, callback: this.showOff, callbackScope: this, loop: true });		
	}

	loseGame(){
		this.data.value.push({"iam":false, "text":'Ты проиграл'})
		this.data.value.push({"iam":true, "text":'Да бл.. я из-за тебя все всадил! Тоже хорош, нашел кого слушать! К кому тут блин податься за нормальной помощью?'})
		this.over = this.data.value.length
		this.now++

		this.textForOut = this.data.value[this.now].text
		this.textForInt = 0
		this.switchBtn = true
		this.myText.text = ''
		window.gamerMoney -= 1000
		this.timedEvent = this.time.addEvent({ delay: 60, callback: this.showOff, callbackScope: this, loop: true });		
	}

	showOff(){	
		this.myText.text += this.textForOut[this.textForInt];
		this.textForInt++;		
			
		if( this.textForInt === this.textForOut.length){
			this.timedEvent.remove(false);
					this.nextBtn.text = 'Дальше'
					this.leftBtn.alpha = 0
					this.centerBtn.alpha = 0
					this.rightBtn.alpha = 0
					this.nextBtn.alpha = 1					
					
					// this.time.delayedCall(1000, () => {
					// 	this.myText.text = this.textForOut
					// 	this.textForOut = this.textStavka
					// 	this.textForInt = 0
					// 	this.myText.text = ''
					// 	this.timedEvent = this.time.addEvent({ delay: 70, callback: this.show, callbackScope: this, loop: true });
					// }, [], this)
		}
	}

	getWhoSpeak(e){
		switch(e){
			case 'ded':
				return 'Дед'
			break;
			case 'otshelnik':
				return 'Отшельник'
			break;
			case 'sborshik':
				return 'Сборщик'		
			break;
			case 'medved':
				return 'Медведь'		
			break;
			case 'bar':
				return 'Бармен'	
			break;			
		}
	}

	goshowText(e){			
		let whoSpeak = 'Дед'	
		if(this.data.name == 'allPers'){
			whoSpeak = this.getWhoSpeak(this.data.value[this.now].who)
		} else {			
			if(!e.iam){whoSpeak = this.getWhoSpeak(this.data.name);}
		}
		if(e.iam){
			this.triangleLeft.alpha = 1
			this.triangleRight.alpha = 0
			this.antoganist.alpha = 0.5
			this.protaganist.alpha = 1
		} else {			
			this.triangleLeft.alpha = 0
			this.triangleRight.alpha = 1
			this.protaganist.alpha = 0.5
			this.antoganist.alpha = 1
		}
		this.whoSpeakText.text = whoSpeak
		this.textForOut = e.text
		this.textForInt = 0
		this.myText.text = ''
		this.timedEvent = this.time.addEvent({ delay: 40, callback: this.show, callbackScope: this, loop: true });

	}

	show(){	
		this.myText.text += this.textForOut[this.textForInt];
		this.textForInt++;		
			
		if( this.textForInt === this.textForOut.length){
			this.timedEvent.remove(false);
			this.time.delayedCall(300, () =>{	
				this.nextBtn.alpha = 1	
				this.switchBtn = !this.switchBtn
				this.nextBtn.text = 'Дальше'			
			}, [], this)
		}
	}

}