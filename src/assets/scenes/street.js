
// You can write more code here

/* START OF COMPILED CODE */

class street extends Phaser.Scene {
	
	constructor() {
	
		super("street");
		
	}

	init(data){
		this.playerPosNow = data.kuda
		this.cursors;
		this.player;
		this.once = true;
		this.changeScene = false;
		this.whatIsScene = '';
		this.playerMove = new Phaser.Math.Vector2();
		this.letsGo = true
		this.whatCar = true
		this.firstScene = false
		this.moveCar = true
		this.moveCarOnce = true
		this.right = true
		this.firstText = data.first
		this.theEnd = true
		window.activeScene = 'street'
	}

	_create() {
		var graphics = this.add.graphics({ fillStyle: { color: 0x000000} });	
        var rect = new Phaser.Geom.Rectangle(0, 0, 2700, 800);
		graphics.fillRectShape(rect);
		this.gameBack = this.add.image(0, 65,'ulicaBack').setOrigin(0).setInteractive()	
		// this.gameBack = this.add.tileSprite(0, 0, 2700, 583, 'ulicaBack').setOrigin(0);	
		// this.gameBack.fixedToCamera = true
		
		this.player = this.physics.add.sprite(this.playerPosNow, 330, "walking-ded-street", 's').setOrigin(0);
		this.player.flipX = true
		this.player.scale = 0.5
		this.player.depth = 5;	
		this.playerMove.y = this.player.y;		


		

		this.add.image(0, 122, 'street-pack', 'bar').setOrigin(0)
		this.dver = this.add.image(68, 288, 'street-pack', 'dver-street').setOrigin(0).setInteractive({ useHandCursor: true })
		this.ostanovka = this.add.image(2000, 190, 'street-pack', 'ostanovka').setOrigin(0).setInteractive({ useHandCursor: true })

		this.car = this.add.image(-500, 385, 'street-pack', 'mashina1').setOrigin(0)
		this.car.depth = 5
		this.cameras.main.setZoom(1.3)

		this.bus = this.add.sprite(-500, 185, 'avtobus-1').setOrigin(0)
		this.bus.alpha = 0;
		this.bus.depth = 6

		this.animationGamer();		
		
		this.player.setCollideWorldBounds(true);

		this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
		this.cameras.main.setZoom(1.2)
		
		this.gameBack.on('pointerdown', function(event) {								
			if(!this.changeScene && this.letsGo){ 
				this.getMove(event.worldX);				
			}
		}, this);

		this.dver.on('pointerdown', function(event) {	
			if(!this.changeScene && this.letsGo){
				this.whatIsScene = 'game';
				this.changeScene = true	
				this.getMove(event.worldX)
			}						
		}, this);

		this.ostanovka.on('pointerdown', function(event) {	
			if(!this.changeScene && this.letsGo){
				if(window.end){			
					this.whatIsScene = 'end';	
					this.changeScene = true			
					this.getMove(this.ostanovka.x + 400)				
				} else {
					this.getMove(event.worldX)
				}	
			}				
		}, this);
		
	}
	
	animationGamer(){	
		let data = 'walking-ded-street'
			this.anims.create({
				key: 'walk-street',
				frames: [{
					key: data,
					frame: "w1"
					}, {
						key: data,
						frame: "w2"
					}, {
						key: data,
						frame: "w3"
					}, {
						key: data,
						frame: "w4"
					}, {
						key: data,
						frame: "w5"
					}, {
						key: data,
						frame: "w6"
					}, {
						key: data,
						frame: "w7"
					}, {
						key: data,
						frame: "w8"
					}
				],
				frameRate: 8,
				repeat: -1
			})
		
			this.anims.create({
				key: 'turn-street',
				frames: [{
					key: 'walking-ded-street',
					frame: 's'
					}
				],
				frameRate: 8
			})

			this.anims.create({
				key: 'avtobus-go',
				frames: [{
					key: 'avtobus-1'
					},
					{
					key: 'avtobus-2'
					},
					{
					key: 'avtobus-3'
					},
				],
				frameRate: 6,
				repeat: -1
			})
			this.anims.create({
				key: 'avtobus-stop',
				frames: [{
					key: 'avtobus-1'
					}
				],
			})
	}
	
	/* START-USER-CODE */

	create(){
		this._create();		


		this.music = this.sound.add('sound-street');
	  	this.music.play();

		this.cameras.main.setBounds(0, 0, 2702, 800);
		this.physics.world.setBounds(0, 0, 2702, 800);
	 	this.cursors = this.input.keyboard.createCursorKeys();	

		if(this.playerPosNow < 500) this.firstScene = false
		this.bbl = this.add.image(2000,225, 'static-object', 'bbl').setOrigin(0)
		this.bbl.scale = 1.4
		this.bbl.setInteractive()
		this.bbl.alpha = 0
		this.myText = this.make.text({
			x: 2050,
			y: 235,
			text: '',
			origin: { x: 0.5, y: 0 },
			style: {
				font: 'bold 18px Minecraft',
				fill: '#ffffff',
				wordWrap: { width: 380 },
				lineSpacing: 5
			}
		});
		this.myText.setInteractive()
		
		if(this.firstText){
			this.letsGo = false
			this.player.x = this.playerPosNow
			this.playerMove.x = this.playerPosNow
			this.bbl.alpha = 1
			this.bbl.x = this.player.x - 400
			this.myText.x = this.player.x - 180		
			this.textForOut = 'Черт, что ж так холодно! Сколько раз зарекался не пить на работе... Как я вообще тут оказался?'
			this.textForInt = 0
			this.timedEvent = this.time.addEvent({ delay: 70, callback: this.show, callbackScope: this, loop: true });
		}
		
	}

	show(){
		this.myText.text += this.textForOut[this.textForInt];
		this.textForInt++;	
		
		if( this.textForInt === this.textForOut.length){
			this.timedEvent.remove(false);
			this.time.delayedCall(1000, () =>{				
				this.myText.alpha = 0
				this.bbl.alpha = 0
				this.letsGo = true
				this.player.body.reset(this.playerMove.x, this.playerMove.y);
			}, [], this)	
		}
	}

	bable(e){		
		this.myText.alpha = 1
		this.myText.text = ''
		this.changeScene = false	
		this.player.x = 720	
		this.playerMove.x = 720
		this.bbl.alpha = 1
		this.bbl.x = this.player.x - 400
		this.myText.x = this.player.x - 180	
		this.player.anims.play('turn-street')	
		this.textForOut = e
		this.textForInt = 0
		this.timedEvent = this.time.addEvent({ delay: 80, callback: this.show, callbackScope: this, loop: true });
	}

	update(){
		if(window.theEnd && this.theEnd){					
				this.theEnd = false
				this.whatIsScene = 'end';	
				this.changeScene = true		
				this.getMove(this.ostanovka.x + 400)							
		}

		this.car.x += 16
			if(this.moveCar){
				if(this.car.x > 3200){
					if(this.whatIsScene != 'end'){
						this.car.x = -500
					} else {
						this.car.alpha = 0;
						this.time.delayedCall(3000, () => {this.moveCar = false;}, [], this);							
					}
					if(this.whatCar){
						this.car.y = 390
						this.car.setFrame('mashina2')				
					} else {
						this.car.y = 385
						this.car.setFrame('mashina1')
					}
					this.whatCar = !this.whatCar
				}
			} else {
				if(this.moveCarOnce){
					this.moveCarOnce = false
					this.bus.alpha = 1;		
					this.bus.anims.play('avtobus-go');		
							this.tweens.add({
								targets: this.bus,
								x:1500,
								duration:5000,
								ease: 'Linear',
								onComplete: () =>{
									this.bus.anims.play('avtobus-stop');
									this.player.alpha = 0;		
									this.time.delayedCall(2000, ()=>{ this.bus.anims.play('avtobus-go');}, [], this);																						
										this.tweens.add({
											targets: this.bus,
											x:3000,
											duration:3000,
											ease: 'Linear',
											delay: 2000,
											onComplete: () =>{												
												document.querySelector('.final-container').style.display = 'flex'
												window.rotate = false
												dataLayer.push({
													'event':'whitenoise',
														'eventCategory':'квест', 
														'eventAction':'переход', 
														'eventLabel':'результат'
												});
											}
										})								
								}
							})
				}
			}
		
		
		if(this.firstScene){
			if(this.player.x < 720 && this.once){
				this.letsGo = false			
				this.once = false
				this.player.body.reset(this.playerMove.x, this.playerMove.y);
				this.bable('Приехали, походу. Допился до белой…«Белого шума»')
				
			}
		}
		if(this.letsGo){
			var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.playerMove.x, this.playerMove.y);

			if (distance < 4)
			{
				if(this.changeScene){			
					if(this.whatIsScene == 'end'){
						this.player.body.reset(this.playerMove.x, this.playerMove.y);						
						this.player.anims.play('turn-street', true)						
					} else{
						this.changeScene = false
						this.music.stop()	
						this.scene.start(this.whatIsScene)				
						this.player.body.reset(this.playerMove.x, this.playerMove.y);
					}				
				} else {			
					this.player.body.reset(this.playerMove.x, this.playerMove.y);
					this.player.anims.play('turn-street', true)	
					if(this.right){ this.player.setFlipX(true)	} else { this.player.setFlipX(false)	}
					
					
				}
			}
		}
	}

	getMove(e){		
		this.playerMove.x = e - (this.player.width/2);
		if(this.whatIsScene == 'game') this.playerMove.x = 130

		if(this.playerPosNow < e){					
			this.physics.moveToObject(this.player, this.playerMove, 240);
			this.player.setFlipX(false)	
			this.right = false		
			this.player.anims.play('walk-street', true)
		}else {
			this.physics.moveToObject(this.player, this.playerMove, 240);
			this.player.setFlipX(true)
			this.right = true
			this.player.anims.play('walk-street', true)
		}		
		this.playerPosNow = e		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
