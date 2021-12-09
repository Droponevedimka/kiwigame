// You can write more code here

/* START OF COMPILED CODE */

class anotation extends Phaser.Scene {
	
	constructor() {
	
		super("anotation");
		
    }
    
    init(){
        this.lvlVolume = 1
        this.muteVolume = false
    }
	
	_create() {
        let graphics = this.add.graphics()
			graphics.fillStyle(0x000000, 1)
			graphics.fillRect(0, 0, 1800, 800)
	
		this.video = this.add.video(900,350, 'anotation-video')
        
        this.skip = this.add.image(150,100,'skip').setInteractive({ useHandCursor: true  } )
        // this.make.text({
        //                 x: 1550,
        //     			y: 770,
        //     			text: 'Пропустить',
        //     			origin: { x: 0, y: 0 },
        //     			style: {
        //     				font: 'bold 25px Minecraft Arial',
        //     				fill: '#ffffff'            				
        //     			}}).setOrigin(0).setInteractive({ cursor: 'url(assets/img/check.png), pointer'})
        // this.content = [
        //     "«Новый год» перестал быть новым…все предопределено.", 
        //     "Мы больше не выбираем, во что верить, кем быть и на что тратить.",
        //     "Не осталось ни мечт, ни чудес — только цели, блин, «глобальные» и «важные».",
        //     "А чего еще ждать от мира, в котором Деду Морозу приходится вкалывать на чертовых корпоратах, чтобы хоть как-то вытянуть праздник?!",
        //     "«Хо-хо-хо! От всей души поздравляю дружный коллектив ОАО «Самотёк»…»", 
        //     "Тьфу! С другой стороны, деньги не пахнут… Ладно, отработаю на последнем, и больше никакого головняка.", 
        //     "В конце концов, это всего на пару часов..."
        // ]
        // this.idContent = 0
        // this.maxConten = this.content.length - 1
        // this.myText = this.make.text({
        //             x: 50,
		// 			y: 700,
		// 			text: '',
		// 			origin: { x: 0, y: 0 },
		// 			style: {
		// 				font: 'bold 30px Minecraft Arial',
		// 				fill: '#ffffff',
		// 				wordWrap: { width: 1700 }
		// 			}}).setOrigin(0)

	}
	/* START-USER-CODE */

	create(){
		this._create();
        this.video.play()
   
        this.video.on('complete', function(video){            
            this.muteVolume = true
            this.scene.start("street", {kuda: 2270, first:false}); 
        }, this);

        this.playing = this.add.image(900,400,"playVideo").setOrigin(0.5).setInteractive({ useHandCursor: true  })
        this.playing.alpha = 0
        this.playing.scale = 0.8
        

        this.playing.on('pointerdown', () =>{
            this.video.setPaused(false);
            this.playing.alpha = 0
        }, this)


        this.skip.on('pointerdown', function(event) {	
            this.muteVolume = true
            this.tweens.add({
                targets: this.video,
                alpha: 0,
                ease: 'Power1',
                duration: 1000,
                onComplete: () => {                  
                    this.scene.start("street", {kuda: 2270, first:false});
                }
            })
            dataLayer.push({
                'event':'whitenoise',
                    'eventCategory':'квест', 
                    'eventAction':'клик', 
                    'eventLabel':'пропустить'
            });
		}, this)
        // this.goshowText()  		
    }

    // goshowText(){
	// 	this.textForOut = this.content[this.idContent]
	// 	this.textForInt = 0
	// 	this.myText.text = ''
	// 	this.timedEvent = this.time.addEvent({ delay: 60, callback: this.show, callbackScope: this, loop: true });
	// }
    
    // show(){	
	// 	this.myText.text += this.textForOut[this.textForInt];
	// 	this.textForInt++;		
			
	// 	if( this.textForInt === this.textForOut.length){
    //         this.timedEvent.remove(false);	
    //         this.time.delayedCall(1000, () =>{	
    //             this.idContent++
    //             if(this.idContent <= this.maxConten){
    //                 this.goshowText()	
    //             } else {
    //                 this.myText.destroy(true)
    //                 this.tweens.add({
    //                             targets: this.video,
    //                             alpha: 0,
    //                             ease: 'Power1',
    //                             duration: 1000,
    //                             onComplete: () => {
    //                                 this.scene.start("street", {kuda: 2270, first:true});
    //                             }
    //                         })                  
    //             }		
	// 		}, [], this)		
	// 	}
	// }

	update(){
        
        if(!this.video.isPlaying()){this.playing.alpha = 0.5;}

        if(this.muteVolume){
            this.video.setVolume(this.lvlVolume -= 0.03)
        }
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
