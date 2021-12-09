import Phaser from 'phaser'
import './assets/scss/main.scss'
import MaskInput from 'mask-input';
import Stats from 'stats.js'


window.rotate = true
window.end = false
window.gameFirst = true
window.gamerMoney = 0
window.roundNow = 0
window.animMoney = 0
window.getScore = false
window.clickGameText = false
window.clickGameWhat = false
window.gameTextArray = []
window.beforeCont = []
window.theEnd = false
window.activeScene = null

// var stats = new Stats();
// stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild( stats.dom );

// function animate() {

// 	stats.begin();

// 	// monitored code goes here

// 	stats.end();

// 	requestAnimationFrame( animate );

// }

// requestAnimationFrame( animate );


var game = new Phaser.Game({
    "title": "Киви",
    "width": 1800,
    "height": 800, 
    "type": Phaser.AUTO,  		 
    "parent": "game-container",
    "physics": {
        "default": "arcade"
    },
    "multiTexture" : true , 
    "dom": {
        "createContainer": true
    },  
    "transparent"    : true,
        "scale": {
            "mode": Phaser.Scale.FIT,			
            "autoCenter": Phaser.Scale.CENTER_BOTH        
        }
    });

class Boot extends Phaser.Scene {
	
	constructor() {
    super({
        key: "preload",
        pack: {
			    files: [
			        { type: 'image', key: 'logo', url: 'assets/img/logo.png' } 				
			    ]
            }
     });
  }
	
	init(){
        var element = document.createElement('style');
        document.head.appendChild(element);
        var sheet = element.sheet;
        var styles = '@font-face { font-family: "Minecraft"; src: url("fonts/Minecraft.ttf"); }\n';
        sheet.insertRule(styles, 0);

		
	}

	preload() {		
        document.body.style.height = window.innerHeight+'px';
        var containterAll = this.add.container(0,0);
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0xcccccc, 0.8);
            progressBox.fillRect(750, 480, 320, 50);

               
        var progressBar = this.add.graphics();
        progressBar.fillStyle(0x45222c, 1);
           
            var loadingText = this.make.text({
                x: width/2 + 20,
                y: height/2 + 150,
                text: 'Loading...',
                style: {
					fontFamily:'Minecraft Arial',
                    fontSize: '20px',
                    fill: '#ffffff'
                }
            });

            var logo = this.add.image(width/2, 350, 'logo');
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2 + 10,
                y: height / 2 + 105,
                text: '0%',
                style: {
                    fontFamily:'Minecraft Arial',
                    fontSize: '20px',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);


            
            containterAll.add(progressBox)
            containterAll.add(logo)                       
            containterAll.add(progressBar)
            containterAll.add(percentText) 
            containterAll.add(loadingText)
            
            this.load.on('progress', function (value) {
                percentText.text = `${parseInt(value * 100)} %`;
                progressBar.clear();
                progressBar.fillStyle(0x45222c, 1);
                progressBar.fillRect(750, 480, 320 * value, 50);
            }, this);
            
            

            this.load.on('fileprogress', function (file){          
               loadingText.setText(`Loading asset: ${file.key}`);               
            },this);

            this.load.on('complete', function () {
                        this.tweens.add({
                            targets: containterAll,
                            alpha: 0,
                            duration: 1000
                       })   
            }, this);

            this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
            this.load.video('anotation-video', 'assets/video/anotation.mp4', 'loadeddata', true, false);
            this.load.video('anotation-video', 'assets/video/1.mp4', 'loadeddata', true, false);            
            this.load.pack("pack", "assets/pack/pack.json");
            this.load.json('scenario', "assets/scenes/data/data.json")

            
	}
	
	create() {        
        var scene = this.scene
        WebFont.load({
			custom: {
				families: [ 'Minecraft' ]
			},
			active: function ()
			{ 
                // scene.start("street", {kuda: 1170, first:true});
                scene.start("first");
            }
        })				
	}

}


        game.scene.add("Boot", Boot, true);
        
   
        if(window.innerWidth < window.innerHeight){	       
            document.getElementById("pause-game").style.display = "flex"	
        }   
    
  
        const maskInput = new MaskInput(document.querySelector('.phone-input'), {
            mask: '7 000 000 00 00',
            alwaysShowMask: true,
            maskChar: '_',
          });





window.onresize = function(event) {

    
        document.body.style.height = window.innerHeight+'px';
        document.getElementById('all-html').style.height = window.innerHeight+'px';
        if(window.rotate){
            if (window.innerWidth < window.innerHeight) {		
                document.getElementById("pause-game").style.display = "flex";	
                if(game && window.activeScene) { game.scene.pause(window.activeScene);	}
            } else {
                document.getElementById("pause-game").style.display = "none";			
                if(game && window.activeScene) { game.scene.resume(window.activeScene); }
            }  
        }
 
}







