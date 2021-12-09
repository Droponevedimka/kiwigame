class program extends Phaser.Scene {
	
	constructor() {
	
		super("program");		
	}
		
	/* START-USER-CODE */

	init(data){	
		this.activeBlock = null
		this.pust = [0,0]
		this.pos = [[0,1],[1,0],[1,1]]
		this.changeCheck = 0
		window.activeScene = 'program'
	}

	_create(){
		var graphics = this.add.graphics({ fillStyle: { color: 0x040010, alpha: 0.9 } });	
        var rect = new Phaser.Geom.Rectangle(0, 0, 1800, 800);
		graphics.fillRectShape(rect);

		this.nootebook = this.add.image(900, 400, 'notebookBack').setOrigin(0.5);	
		this.nootebook.scale = 1.6


		this.start = this.add.container(0, 0)

		var ship = this.add.image(900,250,'g_connect', 'logo').setOrigin(0.5)
		ship.scale = 1.5		
		this.go = this.add.image(850,450,'g_connect', 'start').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.go.scale = 1.6
		
		this.start.add(ship)
		this.start.add(this.go)

		this.game = this.add.container(0,0)

		this.up = this.add.image(700,400,'g_connect', 'up').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.up.scale = 1.5
		this.bottom = this.add.image(700,490,'g_connect', 'bottom').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.bottom.scale = 1.5
		this.left = this.add.image(610,490,'g_connect', 'left').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.left.scale = 1.5
		this.right = this.add.image(790,490,'g_connect', 'right').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.right.scale = 1.5

		

		var title = this.add.image(730,230,'g_connect', 'title').setOrigin(0.5)
		title.scale = 2.5

		var bagameBack = this.add.image(1100,350,'g_connect', 'game-back').setOrigin(0.5)
		bagameBack.scale = 1.8


		this.sqd2 = this.add.image(1057,390,'g_connect', 'vr-1').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.sqd3 = this.add.image(1145,390,'g_connect', 'vr-2').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.sqd1 = this.add.image(1145,305,'g_connect', 'vr-3').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.sqd1.scale = 1.8
		this.sqd2.scale = 1.8
		this.sqd3.scale = 1.8

		this.check = this.add.image(1057,390,'g_connect', 'check').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.check.scale = 1.75
		this.check.alpha = 0
		this.tweens.add({
			targets: this.check,
			scale: 1.9,
			duration: 1000,
			yoyo: true,
			repeat: -1
		})

		this.game.add(this.up)
		this.game.add(this.left)
		this.game.add(this.right)
		this.game.add(this.bottom)
		this.game.add(title)
		this.game.add(bagameBack)
		this.game.add(this.sqd1)
		this.game.add(this.sqd2)
		this.game.add(this.sqd3)
		this.game.add(this.check)


		this.konec = this.add.image(900,350,'g_connect', 'fin').setOrigin(0.5).setInteractive({useHandCursor:true})
		this.konec.scale = 3
		this.konec.alpha = 0
	}

	create(){
        
        this._create();
		
		
		this.game.alpha = 0
		this.start.alpha = 1
		
		this.go.on('pointerdown', function(event) {			
				this.start.alpha = 0
				this.game.alpha = 1
				dataLayer.push({
					'event':'whitenoise',
						'eventCategory':'квест', 
						'eventAction':'Мини-игра', 
						'eventLabel':'Го настроим сеть'// идентификатор мини-игры, которую проходит пользователь 
				});
		},this);

		this.konec.once('pointerdown', function(event) {			
			window.gamerMoney += 3000	
			window.getScore = true
			this.scene.switch('game');
			this.scene.stop('program')	
		},this);

		this.sqd1.on('pointerdown', function(event) {this.activeBlock = {"object": this.sqd1, "pos": 0}; this.check.alpha = 1; this.getCheckPosition(1);},this);
		this.sqd2.on('pointerdown', function(event) {this.activeBlock = {"object": this.sqd2, "pos": 1}; this.check.alpha = 1; this.getCheckPosition(2);},this);
		this.sqd3.on('pointerdown', function(event) {this.activeBlock = {"object": this.sqd3, "pos": 2}; this.check.alpha = 1; this.getCheckPosition(3);},this);

		this.up.on('pointerdown', function(event) {			
			if(this.activeBlock){
				if(this.pos[this.activeBlock.pos][0] == 1 && this.pos[this.activeBlock.pos][1] == this.pust[1]){
					this.activeBlock.object.y -= 85		
					let buf = []						
					buf = this.pust
					this.pust = this.pos[this.activeBlock.pos]
					this.pos[this.activeBlock.pos] = buf	
					this.getCheckPosition(this.activeBlock.pos + 1)
					this.whatFinal()									
				}
			 }
		},this);
		this.bottom.on('pointerdown', function(event) {
			if(this.activeBlock){
				if(this.pos[this.activeBlock.pos][0] == 0 && this.pos[this.activeBlock.pos][1] == this.pust[1]){
					this.activeBlock.object.y += 85
					let buf = []						
					buf = this.pust
					this.pust = this.pos[this.activeBlock.pos]
					this.pos[this.activeBlock.pos] = buf
					this.getCheckPosition(this.activeBlock.pos + 1)
					this.whatFinal()	
				}
			 }
		},this);
		this.left.on('pointerdown', function(event) {
			if(this.activeBlock){
				if(this.pos[this.activeBlock.pos][1] == 1 && this.pos[this.activeBlock.pos][0] == this.pust[0]){
					this.activeBlock.object.x -= 87
					let buf = []						
					buf = this.pust
					this.pust = this.pos[this.activeBlock.pos]
					this.pos[this.activeBlock.pos] = buf
					this.getCheckPosition(this.activeBlock.pos + 1)
					this.whatFinal()						
				}
			 }
		},this);
		
		this.right.on('pointerdown', function(event) {
			if(this.activeBlock){
				if(this.pos[this.activeBlock.pos][0] == this.pust[0] && this.pust[1] == 1){
					this.activeBlock.object.x += 87
					let buf = []						
					buf = this.pust
					this.pust = this.pos[this.activeBlock.pos]
					this.pos[this.activeBlock.pos] = buf	
					this.getCheckPosition(this.activeBlock.pos + 1)
					this.whatFinal()
				}
			 }
		},this);

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
			this.konec.scale = 5
		}

	}

	getCheckPosition(e){
		let posX = 0
		let posY = 0
		switch(e){
			case 1:
				posX = this.sqd1.x
				posY = this.sqd1.y
			break;
			case 2:
				posX = this.sqd2.x
				posY = this.sqd2.y
			break;
			case 3:
				posX = this.sqd3.x
				posY = this.sqd3.y
			break;
		}
		this.check.x = posX
		this.check.y = posY
	}

	whatFinal(){		
		if(JSON.stringify(this.pos) === JSON.stringify([[0,0],[1,1],[0,1]])){
				this.konec.alpha = 1
				this.game.alpha = 0	
		}
	}

	update() {
		
	}

}