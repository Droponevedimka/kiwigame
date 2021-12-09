
class toda2 extends Phaser.Scene {
	
	constructor() {
	
		super("toda2");		
	}
		
	/* START-USER-CODE */

	init(data){	
		this.lifeZamok = 4
		this.speed = 1
		this.destroy = false
		this.items = 0
		this.mob = false
		this.lengthLvl = 25
		window.activeScene = 'toda2'
	}

	_create(){
		var graphics = this.add.graphics({ fillStyle: { color: 0x040010, alpha: 1 } });	
        var rect = new Phaser.Geom.Rectangle(0, 0, 1800, 800);
		graphics.fillRectShape(rect);

		this.nootebook = this.add.image(900, 400, 'notebookBack').setOrigin(0.5);	
		this.nootebook.scale = 1.6

		this.start = this.add.container(0, 0)

		var ship = this.add.image(900,250,'g-toda2', 'toda2').setOrigin(0.5)
		ship.scale = 1.5
		var textAfter = this.add.text(900,400, '',{ fontFamily: 'Minecraft', fontSize: 25, color: '#685e8e', align:'center' }).setOrigin(0.5)
		textAfter.text = "Защищай замок. \nНе дай рыцарям его разрушить"	
		this.go = this.add.sprite(890,500,'g-toda2', 'start').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.go.scale = 2
		
		this.start.add(ship)
		this.start.add(textAfter)
		this.start.add(this.go)


		this.game = this.add.container(0,0)

		this.zamok = this.add.image(900,500,'g-toda2','zamok-'+this.lifeZamok).setOrigin(0.5)
		this.zamok.scale = 1.6
		this.game.add(this.zamok)


		this.modal = this.add.container(0,0)
		this.modalText = this.add.text(900,300, '',{ fontFamily: 'Minecraft', fontSize: 45, color: '#b32508', align:'center' }).setOrigin(0.5)
		this.modalText.text = 'fdfds'
		this.modal.add(this.modalText)

		this.modalBtn = this.add.text(900,450, '',{ fontFamily: 'Minecraft', fontSize: 35, color: '#685e8e', align:'center' }).setOrigin(0.5).setInteractive({useHandCursor:true})
		this.modalBtn.text = 'Переиграть'
		this.modal.add(this.modalBtn)

		this.rapira = this.add.image(400,400, 'g-toda2', 'rapira').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.rapira.alpha = 0

		this.konec = this.add.image(900,350,'g-toda2', 'fin').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.konec.scale = 3
		this.konec.alpha = 0
	}

	create(){
        
		this._create();

		if (this.sys.game.device.input.touch) {
			console.log('mob')
			this.nootebook.y += 80
			this.nootebook.scale = 2.3
			this.start.scale = 1.5
			this.start.x -= 450
			this.start.y -= 100
			this.game.scale = 1.5
			this.game.x -= 450
			this.game.y -= 100
			this.modal.scale = 1.5
			this.modal.x -= 450
			this.modal.y -= 100
			this.lengthLvl = 12		
			this.rapira.scale = 2	
			this.mob = true
			this.konec.scale = 5
		}

		let data = 'g-toda2'
			this.anims.create({
				key: 'dead',
				frames: [{
					key: data,
					frame: "ant-1"
					}, {
						key: data,
						frame: "ant-2"
					}, {
						key: data,
						frame: "ant-3"
					}, 
				],
				frameRate: 2
			})

		this.itemsTextureObject = this.add.group({
			classType: ItemsTextureObject,
			maxSize: 8,
			runChildUpdate: true
		});

	
		this.game.alpha = 0
		this.start.alpha = 1
		this.modal.alpha = 0
		this.go.on('pointerdown', function(event) {		
			this.start.alpha = 0
			this.game.alpha = 1

			this.createGame()
			dataLayer.push({
				'event':'whitenoise',
					'eventCategory':'квест', 
					'eventAction':'Мини-игра', 
					'eventLabel':'Го сыграем в Toda2'// идентификатор мини-игры, которую проходит пользователь 
			});
		},this);


		this.konec.once('pointerdown', function(event) {			
			window.gamerMoney += 2000	
			window.getScore = true
			this.scene.switch('game');	
			this.scene.stop('toda2')
		},this);


		this.modalBtn.on('pointerdown', function(event) {		
			this.modal.alpha = 0
			this.game.alpha = 1
			this.speed -= 0.1
			this.destroy = false
			this.lifeZamok = 5		
			this.items = 0	
			this.createGame()	
			this.attackZamok()		
		},this);

		this.go.on('pointerover',function(pointer){
			this.go.setFrame('start-2');
		}, this)
		
		this.go.on('pointerout',function(pointer){
			this.go.setFrame('start');
		}, this)

		this.rapira.on('pointerdown', function(event) {	
			this.rapira.alpha = 0
			this.game.alpha = 0
			this.konec.alpha = 1		
		},this);

	
	}

	createGame(){
		this.timeObjectGame = this.time.addEvent({ delay: 1000, callback: function() {
			this.items++
			if(this.items < this.lengthLvl){
				var getObject = this.itemsTextureObject.get().setActive(true).setVisible(true);
				if(getObject){
					getObject.move(this, this.speed);
					}				
			} else {
				this.timeObjectGame.destroy()				
			}
		}, callbackScope: this, loop: true });
	}

	update() {
		
	}

	randomInteger(min, max) {
		let rand = min + Math.random() * (max - min);
		return Math.round(rand);
	}

	attackZamok(){
		this.lifeZamok--
		if(this.lifeZamok > 0){
			this.zamok.setTexture('g-toda2', 'zamok-'+this.lifeZamok)
		} else {
			this.timeObjectGame.destroy(true)
			this.destroy = true
			this.game.alpha = 0
			this.modal.alpha = 1
			this.modalText.text = 'Game Over'
		}
		
	}

}


class ItemsTextureObject extends Phaser.GameObjects.Sprite {

    constructor (scene, speed)
    {
		super(scene, speed);	
		this.movePers = true
		this.once = true
		this.end = false
		this.lvl = 1
		this.mobLeftX = 600
		this.mobRightX = 1200
		this.moveX = 0.8
		this.moveY = 1.5
	}
	init(){
		
	}

	move(scene, speed){		
		this.x = 900
		this.y = 120
		this.yOff = 450
		this.depth = 5
		this.scene = scene
		if(scene.mob) {
			this.yOff = 600
			this.scale = 2
			this.lvl = 1
			this.moveX = 1.3
			this.moveY = 3.5
		} else {
			this.scale = 1.4
		}
		
		this.speed = speed

		let randomInt = this.scene.randomInteger(1,3) 

		if(randomInt == 1){
			this.x = this.scene.mob ? this.mobLeftX : 700
		} else if(randomInt == 3) {
			this.x = this.scene.mob ? this.mobRightX : 1100
		}

		var obj = 'g-toda2'
		
		this.setTexture(obj, 'ant-1')
		this.setInteractive({useHandCursor:true})

		if(this.scene.items >= this.scene.lengthLvl - 1){
			this.end = true
		}
	
		this.on('pointerdown', function(event) {
			this.lvl--
			if(this.lvl < 1 && this.once){
					this.once = false
					this.movePers = false				
					this.anims.play('dead')
			} 
		},this);

		this.on('animationcomplete', () => {					
				this.scene.tweens.add({
					targets: this,
					alpha: 0,
					ease: 'Linear',
					duration: 1000,
					onComplete: () => {	
						if(this.end && this.scene.lifeZamok > 0){
							this.scene.rapira.alpha = 1						
							this.scene.rapira.x = this.x
							this.scene.rapira.y = this.y							
							console.log(this.scene.rapira.x)
						} else {
							this.setActive(false);
							this.setVisible(false);
							this.destroy(true)	
						}																		
					}
				}, this)			
		}, this);
	}

	update(){	
		if(!this.scene.destroy){

			if(this.movePers && this.y < this.yOff){
				this.y += this.moveY * this.speed
				if(this.x > 900){
					 this.x -= this.moveX * this.speed;
				} else {
					 this.x += this.moveX * this.speed;
				}
			}
			
			
	
			if(this.y >= this.yOff && this.once){
				this.once = false		
				this.setTexture('g-toda2', 'attack')	
				this.scene.tweens.add({
					targets: this,
					alpha: 0,
					ease: 'Linear',
					duration: 1000,
					onComplete: () => {					
						if(this.end && this.scene.lifeZamok > 0){
							this.scene.rapira.alpha = 1						
							this.scene.rapira.x = this.x
							this.scene.rapira.y = this.y							
							console.log(this.scene.rapira.x)
						} else {
							this.setActive(false);
							this.setVisible(false);
							this.destroy(true)	
						}				
					}
				}, this)
				this.scene.attackZamok()	
			} 
		} else {
			this.destroy(true)
		}
		
	}
}
