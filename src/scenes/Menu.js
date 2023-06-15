class Menu extends Phaser.Scene{
    constructor() {
        super('menuScene');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Fantasy',
            fontSize: '28px',
            backgroundColor: '#303030',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let smallConfig = {
            fontFamily: 'Fantasy',
            fontSize: '17px',
            backgroundColor: '#303030',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
 
        // menu text
        this.add.text(game.config.width/2, game.config.height/6, 'Tokyo Story', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press SPACE to start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/5, game.config.height/1.15, 'Press D for credits', smallConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.25, game.config.height/1.15, 'Press A for controls', smallConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.05, 'By Abel Goy and Marlene Inoue', smallConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // Play mode
            this.sound.play('sfx_select');            
            this.scene.start("introScene");    
        }

        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            // Credits mode
            this.sound.play('sfx_select');
            this.scene.start("creditsMusicScene");    
        }

        if (Phaser.Input.Keyboard.JustDown(keyA)) {
           // Control mode
           this.sound.play('sfx_select');
           this.scene.start("controlsScene");    
       }
    }
}
