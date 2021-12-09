
// You can write more code here
/* START OF COMPILED CODE */

class game extends Phaser.Scene {
	
	constructor() {
	
		super("game");
		this.count = 0;
	}
		
	/* START-USER-CODE */

	init(data){	
		this.cursors
		this.player
		this.changeScene = false
		this.whatIsScene
		this.whatIsValue
		this.nowChanel = 1		
		this.scenario
		this.right = true
		this.changeSwitch = true		
		// 358
		this.playerPosNow = 358;
		this.playerMove = new Phaser.Math.Vector2();
		this.theEnd = true
	}

	animationGamer(){	
		let data = 'walking-ded'
			this.anims.create({
				key: 'walk',
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
				key: 'turn',
				frames: [{
					key: 'turn'
					}
				],
				frameRate: 1
			})

			let mas = {}
			let j = '';
			mas.barmen = []
			mas.yachik = []
			mas.radio = []
			mas.elka = []
			mas.kirpich = []
			mas.notebook = []
			mas.mishka = []
			mas.otshelnik = []
			mas.sborshik = []
			mas.pdsvt = []
			for(let i=1; i<69; i++){
				mas.barmen[i] = {key:'barmen'}	
				if( i < 55 || i > 66) mas.barmen[i]['frame'] = 'barmen-'+i
			}
			for(let i=1; i<7; i++){
				mas.yachik[i] = {key:'anim-object'}
				mas.yachik[i]['frame'] = 'ya'+i
			}
			for(let i=1; i<4; i++){
				mas.radio[i] = {key:'anim-object'}
				mas.radio[i]['frame'] = 'r'+i
			}
			for(let i=1; i<5; i++){
				mas.elka[i] = {key: 'anim-object'}
				mas.elka[i]['frame'] = 'e'+i
				mas.notebook[i] = {key: 'anim-object'}	
				mas.notebook[i]['frame'] = 'n'+i
				mas.pdsvt[i] = {key: 'dialog-and-podsvet'}	
				mas.pdsvt[i]['frame'] = 'pdsvt000'+i		
			}
			for(let i=1; i<45; i++){
				mas.mishka[i] = {key: 'mishka'}
				if(i<10){ mas.mishka[i]['frame'] = '000'+i; }
				else if(i<23) {mas.mishka[i]['frame'] = '00'+i;	} else {mas.mishka[i]['frame'] = '0022'; }
					
			}
			for(let i=1; i<54; i++){
				mas.otshelnik[i] = {key: 'otshelnik'}
				if(i<10){ mas.otshelnik[i]['frame'] = '000'+i; }
				else if(i < 30){mas.otshelnik[i]['frame'] = '00'+i;	} else if(i<50) {
					mas.otshelnik[i]['frame'] = '0030';
				} else { mas.otshelnik[i]['frame'] = '00'+(i-20);}
					
			}
			for(let i=1; i<40; i++){
				mas.sborshik[i] = {key: 'sborshik'}
				if(i<10){ mas.sborshik[i]['frame'] = '000'+i; }
				else if(i<26) {mas.sborshik[i]['frame'] = '00'+i; } else {mas.sborshik[i]['frame'] = '0006' }
					
			}
			
			this.anims.create({
				key: 'barmen-move',
				frames: mas.barmen,
				frameRate:7,
				repeat: -1
			})


			this.anims.create({
				key: 'yachik-anim',
				frames: mas.yachik,
				frameRate:3
			})

			this.anims.create({
				key: 'radio-anim',
				frames: mas.radio,
				frameRate:3,
				repeat: -1
			})

			this.anims.create({
				key: 'elka-anim',
				frames: mas.elka,
				frameRate:4,
				repeat: -1
			})


			this.anims.create({
				key: 'kirpich-anim',
				frames: [				
					{
					key: 'anim-object',
					frame: "glaza1"
					},
					{
					key: 'anim-object',
					frame: "glaza2"
					}
				],
				frameRate:3,
				repeat: -1
			})

			this.anims.create({
				key: 'go-note',
				frames: mas.notebook,
				frameRate:4,
				repeat: 0
			})

			this.anims.create({
				key: 'mishka-anim',
				frames: mas.mishka,
				frameRate:7,
				repeat: -1
			})

			this.anims.create({
				key: 'otshelnik-anim',
				frames: mas.otshelnik,
				frameRate:5,
				repeat: -1
			})

			this.anims.create({
				key: 'sborshik-anim',
				frames: mas.sborshik,
				frameRate:7,
				repeat: -1
			})

			this.anims.create({
				key: 'pdsvt-anim',
				frames: mas.pdsvt,
				frameRate:4,
				repeat: -1
			})
			
	}

	_create(){
		
		this.gameBack = this.add.image(-200, -100, 'barBack').setOrigin(0).setInteractive()		
// Статик
		
		this.kirpich =	this.add.sprite(565,205, 'anim-object', 'kirp').setOrigin(0).setInteractive({ useHandCursor: true  } )
		this.add.image(1740,190, 'static-object', 'calendar').setOrigin(0)		
		this.add.image(1985,330, 'static-object', 'ramka').setOrigin(0)
		this.add.image(1092,125,'other-object', 'l_vikl').setOrigin(0)
		this.add.image(182,285,'other-object', 'ob3').setOrigin(0)
		this.add.image(198,235,'other-object', 'ob2')
		this.roga =	this.add.image(1025,215,'static-object', 'roga').setInteractive({ useHandCursor: true  } )
		this.add.image(700,440,'static-object', 'musorka')
		this.add.image(1195,225,'static-object', 'cvetki')
		
		
		

//move click		
		
		this.barmen = this.add.sprite(1270,227,'barmen').setOrigin(0).setInteractive({ useHandCursor: true  })
		
		
		
	
		// .setInteractive({ useHandCursor: true  } )
		
		this.tumba = this.add.sprite(2080,475,'other-object', 't_zak').setOrigin(1).setInteractive({ useHandCursor: true  } )
		this.kreslo = this.add.image(2067,345, 'other-object', 'kreslo').setOrigin(0)
		
		
		

		
// anims
		this.terminal = this.add.sprite(30,295, 'anim-object').setOrigin(0).setInteractive({ useHandCursor: true  } )
		// .setInteractive({ useHandCursor: true  } )
		
		this.radio = this.add.sprite(975,302, 'anim-object', 'r1').setOrigin(0).setInteractive({ useHandCursor: true  } )
		this.elka = this.add.sprite(2035,285, 'anim-object', 'e1').setOrigin(0).setInteractive({ useHandCursor: true  } )
		this.holod = this.add.sprite(1240,335, 'other-object', 'h_zak').setOrigin(1).setInteractive({ useHandCursor: true  } )


		this.dver = this.add.image(305,205, 'static-object', 'dver').setOrigin(0).setInteractive({ useHandCursor: true  } )
		this.add.image(1088,186, 'static-object', 'stoika').setOrigin(0)

		this.gameNootebook = this.add.sprite(1588,297,'anim-object', 'n1').setOrigin(0).setInteractive({ useHandCursor: true  } )
		this.gameNootebook.alpha = 0

		this.korobka = this.add.image(1667,410, 'other-object', 'k_zak').setOrigin(0)
		
		this.tlk = this.add.image(1124,312, 'static-object', 'stakany').setOrigin(0)
		this.add.image(1770,290, 'static-object', 'meshok').setOrigin(0)
		this.add.image(1778,90, 'static-object', 'big-lampa').setOrigin(0)

		this.mishka = this.add.sprite(855,470, 'mishka', '0001').setOrigin(0,1).setInteractive({ useHandCursor: true  } )
		this.otshelnik = this.add.sprite(2085,285, 'otshelnik', '0001').setOrigin(0).setInteractive({ useHandCursor: true  } )
		this.otshelnik.scale = 2
		this.sborshik = this.add.sprite(1410,215, 'sborshik', '0001').setOrigin(0).setInteractive({ useHandCursor: true  } )
		this.add.image(2115,345, 'other-object', 'krsl_bok').setOrigin(0)
		this.yachik = this.add.sprite(2230,412, 'anim-object', 'ya1').setOrigin(0).setInteractive({ useHandCursor: true  } )

		this.tlk = this.add.sprite(637,115, 'anim-object', 'tlk').setOrigin(0).setInteractive({ useHandCursor: true  } )
		this.tlkCanal = this.add.sprite(690,180, 'anim-object', 'canal1').setOrigin(0)

		
			

		//this.pdsvt = this.add.sprite(600,200, 'dialog-and-podsvet', 'pdsvt0000').setOrigin(0)
		// this.pdsvt.anims.play('pdsvt-anim')
		this.pdsvt = this.add.image(600,200, 'kursDialog').setOrigin(0)

		this.player = this.physics.add.sprite(this.playerPosNow, 220, "turn").setOrigin(0);	
		this.playerMove.y = this.player.y;	

		this.moneyContainer = this.add.container(0,0)
		var moneySprite =	this.add.image(275,165, 'q_money').setScrollFactor(0)
		moneySprite.scale = 0.7
		this.scoreText = this.add.text(330,150, '0',{ fontFamily: 'Minecraft', fontSize: 35, color: '#b16111' }).setScrollFactor(0) 
		this.scoreText.text = window.gamerMoney

		this.moneyContainer.add(moneySprite)
		this.moneyContainer.add(this.scoreText)
		if(window.roundNow < 1)	this.moneyContainer.alpha = 0		
	}


	
	create(){
		
		this._create()
		this.cameras.main.setBounds(0, 0, 2382, 800);
   		this.physics.world.setBounds(0, 0, 2382, 800);
		this.cursors = this.input.keyboard.createCursorKeys();	
	
		this.animationGamer();		

	
		this.player.setCollideWorldBounds(true)

		this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
		this.cameras.main.setZoom(1.3)
		this.scenario = this.cache.json.get('scenario');		
		

		this.barmen.anims.play('barmen-move')
		this.mishka.anims.play('mishka-anim')
		this.otshelnik.anims.play('otshelnik-anim')
		this.sborshik.anims.play('sborshik-anim')

		
		
		this.radio.anims.play('radio-anim')
		
		
		this.music = this.sound.add('bar_sound');
	  	this.music.play();



		
		

		this.gameNootebook.setInteractive({ useHandCursor: true  } );

		this.goNextDialog(); 

		let terminalId = false;
		this.terminal.on('pointerdown', function(event){
			terminalId = !terminalId
			let cont = '1'
			if(terminalId) cont = '2'
			this.terminal.setFrame('t'+cont)
		}, this)

		this.radio.on('pointerdown', function(event){
			if(!this.changeScene) this.getMove(event.worldX)
		}, this)

		this.roga.on('pointerdown', function(event){
			if(!this.changeScene) this.getMove(event.worldX)
		}, this)

		this.kirpich.on('pointerdown', function(){
			this.kirpich.anims.play('kirpich-anim')
		}, this)

		let holodI = 0
		this.holod.on('pointerdown', function(){
			holodI++
			if(holodI > 3) holodI = 2
			let content = ''
			switch(holodI){				
				case 1:
					content = 'h_otk'
				break;
				case 2:
					content = 'h_free'
				break;
				case 3:
					content = 'h_zak'
				break;
			}
			
			this.holod.setFrame(content)
		}, this)

		let tumbaI = 0
		this.tumba.on('pointerdown', function(){	
			tumbaI++
			if(tumbaI > 3) tumbaI = 2
			let content = ''
			switch(tumbaI){				
				case 1:
					content = 't_otkr'
				break;
				case 2:
					content = 't_free'
				break;
				case 3:
					content = 't_zak'
				break;
			}
			
			this.tumba.setFrame(content)					
		}, this)

		this.elka.on('pointerdown', function(){
			this.elka.anims.play('elka-anim');			
		}, this)

		this.yachik.on('pointerdown', function(){
			this.yachik.anims.play('yachik-anim')
		}, this)

		this.barmen.on('pointerdown', function(event) {	
			if(!this.changeScene){		
				this.whatIsScene = 'dialog'
				this.goStepScenario('barmen',[0,4,13], event)
			}		
		}, this);

		this.mishka.on('pointerdown', function(event) {	
			if(!this.changeScene){		
				this.whatIsScene = 'dialog'
				this.goStepScenario('mishka',[5], event)
			}				
		}, this);

		this.otshelnik.on('pointerdown', function(event) {	
			if(!this.changeScene){		
				this.whatIsScene = 'dialog'
				this.goStepScenario('otshelnik',[1,3,6,8,10,12], event)	
			}		
		}, this);

		this.gameNootebook.on('pointerdown', function(event) {
			if(!this.changeScene && this.changeSwitch){				
				let meta = false
				let metaName = ''			
				this.whatIsScene = 'switch'
				if(window.roundNow == 2){
					this.whatIsValue = 'toda2'
					meta = true
					metaName = 'ноутбук1'
				}
				if(window.roundNow == 7){
					this.whatIsValue = 'textZad'
					meta = true
					metaName = 'ноутбук2'
				}
				if(window.roundNow == 11){
					this.whatIsValue = 'program'
					meta = true
					metaName = 'ноутбук3'
				}
					
				this.goStepScenario('gameNootebook',[2,7,11], event)	
				this.whatIsScene = 'switch'		
				
				if(meta){
					
					dataLayer.push({
						'event':'whitenoise',
							'eventCategory':'квест', 
							'eventAction':'Мини-игра', 
							'eventLabel':metaName// идентификатор мини-игры, которую проходит пользователь 
					});
				}
			}
		}, this);

		this.sborshik.on('pointerdown', function(event) {
			if(!this.changeScene){
				this.whatIsScene = 'dialog'
				this.goStepScenario('sborshik',[9], event)	
			}				
		}, this);

		this.gameBack.on('pointerdown', function(event) {			
			if(!this.changeScene){ this.getMove(event.worldX);}
		}, this);

		this.dver.on('pointerdown', function(event) {		
			if(!this.changeScene){		
					this.changeScene = true
					this.whatIsScene = 'start'
					this.whatIsValue = 'street'
					this.getMove(event.worldX, 'start')	
			}					
		}, this);

		this.tlk.on('pointerdown', function(event) {
			this.nowChanel++
			if(this.nowChanel>3) this.nowChanel = 1				
			this.tlkCanal.setFrame('canal'+this.nowChanel)								
}, this);

	
	}


	update() {	
		 console.log(window.roundNow)
		if(window.theEnd && this.theEnd){
			this.changeScene = true
			this.whatIsScene = 'start'
			this.whatIsValue = 'street'
			this.getMove(200, 'start')	
			this.theEnd = false			
		}

		if(window.getScore){
			this.moneyContainer.alpha = 0
			this.tweens.add({
				targets: this.moneyContainer,
				alpha: 0.7,
				ease: 'Cubic.easeOut',
				duration: 300,
				repeat: 7
			})
			window.activeScene = 'game'
			this.scoreText.text = window.gamerMoney
			window.getScore = false
		} 

		if(window.animMoney < window.gamerMoney){
			this.scoreText.text = window.animMoney += 18
			if(window.animMoney > window.gamerMoney - 30) this.scoreText.text = window.animMoney = window.gamerMoney
		} else {
			this.scoreText.text = window.animMoney -= 48
			if(window.animMoney < window.gamerMoney + 60) this.scoreText.text = window.animMoney = window.gamerMoney
		}

		var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.playerMove.x, this.playerMove.y);

		
		if (distance < 4)
        {
			if(this.changeScene && this.changeSwitch){	
				if(this.whatIsScene == 'switch') this.changeSwitch = false	
				this.changeScene = false								
				this.goToEndMove(this.whatIsScene, this.whatIsValue)
				this.player.body.reset(this.playerMove.x, this.playerMove.y);				
				if(this.right) {this.player.setFlipX(true)} else {this.player.setFlipX(false)}	
				this.once = false					
			} else {			
				this.player.body.reset(this.playerMove.x, this.playerMove.y);
				this.player.anims.play('turn', true)
				if(this.right) {this.player.setFlipX(true)} else {this.player.setFlipX(false)}
			}
			
        }
	}

	goStepScenario(e, now, event){
		let gg = false
		for(let item of now){ if(window.roundNow == item){ gg = true; this.changeGameScene = true}}
		if(gg){
			this.changeScene = true			
			this.getMove(event.worldX,e)	
		} else {		
			this.getMove(event.worldX)
		}
				
	}

	getMove(e, who){
		let buf = e - this.player.width/2;		
		switch(who){
			case 'gameNootebook':			
				buf = this.gameNootebook.x - 110				
			break;
			case 'sborshik':
				buf = this.sborshik.x - 100		
			break;
			case 'otshelnik':
				buf = this.otshelnik.x - 100		
			break;
			case 'mishka':
				buf = this.mishka.x - 100		
			break;
			case 'barmen':
				buf = this.barmen.x - 100		
			break;
			case 'start':
				buf = this.dver.x + 50
			break;
		}
		
		this.playerMove.x = buf;
		
		if(this.playerPosNow < e){		
			this.physics.moveToObject(this.player, this.playerMove, 240);
			this.player.setFlipX(false)			
			this.right = false
			this.player.anims.play('walk', true)
		}else {
			this.physics.moveToObject(this.player, this.playerMove, 240);
			this.player.setFlipX(true)
			this.right = true
			this.player.anims.play('walk', true)
		}	
		this.playerPosNow = e		
	}

	goToEndMove(name, value){
					
		switch(name) {
			
			case 'start':  
				this.music.stop()
				this.scene.start(value, {kuda:148, first: false})				
			break;
			case 'switch': 	
				this.right = false					
				this.gameNootebook.anims.play('go-note');
				this.time.delayedCall(1000, () => {
					this.changeSwitch = true
					this.scene.switch(value);
					this.gameNootebook.setFrame('n1')	
					window.roundNow++
					this.goNextDialog()						
					this.once = true
				}, [], this)				
					
			break;	
			case 'dialog':	
				this.scene.launch('dialogScene', {name:this.scenario[window.roundNow].who, frame:this.scenario[window.roundNow].frame, contora:this.scenario[window.roundNow].contora, value:this.scenario[window.roundNow].dialog})	
				window.roundNow++
				this.goNextDialog()						
				this.once = true			
				this.scene.pause()					
			break;			
		  }			  
	}

	goNextDialog(){		
		
		if(window.roundNow > 1) this.gameNootebook.alpha = 1
		if(window.roundNow > 13){ 			
			//this.pdsvt.anims.stop(); 
			this.pdsvt.alpha = 0;			
		}		
		
		if(this.scenario[window.roundNow]){
			switch(this.scenario[window.roundNow].who){
				case 'bar':
					this.pdsvt.x = this.barmen.x + 35
					this.pdsvt.y = this.barmen.y - 50
				break;
				case 'otshelnik':
					this.pdsvt.x = this.otshelnik.x + 65
					this.pdsvt.y = this.otshelnik.y - 60
				break;
				case 'gameNootebook':
					this.pdsvt.x = this.gameNootebook.x + 45
					this.pdsvt.y = this.gameNootebook.y - 50
				break;
				case 'medved':
					this.pdsvt.x = this.mishka.x + 42
					this.pdsvt.y = this.mishka.y - 320
				break;
				case 'sborshik':
					this.pdsvt.x = this.sborshik.x + 75
					this.pdsvt.y = this.sborshik.y - 35
				break;
				case 'allPers':
					this.pdsvt.x = this.barmen.x + 35
					this.pdsvt.y = this.barmen.y - 50
				break;
			}
		}		
	}


	
	
}

/* END OF COMPILED CODE */

// Custom coint item('s)
