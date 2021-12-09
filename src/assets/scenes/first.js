
// You can write more code here

/* START OF COMPILED CODE */

class first extends Phaser.Scene {
	
	constructor() {
	
		super("first");
		
	}
	
	_create() {
	
		let graphics = this.add.graphics()
			graphics.fillStyle(0x040010, 1)
			graphics.fillRect(0, 0, 1800, 800)
		
		this.add.image(900,400, 'back-first').setOrigin(0.5)

		let sneg = this.add.sprite(900,320, 's1').setOrigin(0.5)
			
		this.btn = this.add.sprite(900,650, 'btn-first').setOrigin(0.5).setInteractive({ useHandCursor: true  } )

			this.anims.create({
				key: 'sneg',
				frames: [{
					key: 's1'
					}, {
						key: 's2'
					}, {
						key: 's3'
					}, {
						key: 's4'
					}, {
						key: 's5'
					}
				],
				frameRate: 8,
				repeat: -1
			})

			sneg.anims.play('sneg')
	
	}
	/* START-USER-CODE */

	create(){
		this._create();

		this.btn.on('pointerover', function () {
			this.btn.setTexture('btn_hwr-first')
		}, this);

		this.btn.on('pointerout', function () {

			this.btn.setTexture('btn-first')

		}, this);
		
		
		this.btn.on('pointerdown', () =>{		
			this.btn.destroy()	
			this.scene.start("anotation");	
			dataLayer.push({
				'event':'whitenoise',
					'eventCategory':'квест', 
					'eventAction':'клик', 
					'eventLabel':'старт'
			});
		}, this);	
	}

	update(){
		
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
