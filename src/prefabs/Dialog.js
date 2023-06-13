/**
 * Credits to Alex Groff for inspiration of a Dialog class
 */

class Dialog {
    constructor(scene, dialog, show = false, isTalkingToMe = false, isTalkingToSomeoneElse = false) {

        // set location of character icon
        this.charX = game.config.width / 8;
        this.charY = game.config.height - 75;

        // set text location
        this.textX = game.config.width / 3.5;
        this.textY = game.config.height - 100;

        // set dialog box location
        this.dialogBoxX = game.config.width / 1.65;
        this.dialogBoxY = game.config.height - 75;

        this.scene = scene;

        // 2D array, inner array has character icon or script description and the text for that character or the type for the script description
        this.dialog = dialog;

        // whether to show the dialog
        this.show = show;

        // to know when to advance when talking to this character
        this.isTalkingToMe = isTalkingToMe;

        // to not advance if talking to another character
        this.isTalkingToSomeoneElse = isTalkingToSomeoneElse;

        // to indicate finished the dialog with this character
        this.finishedDialog = false;

        // index to keep track of dialog location
        this.currDialogIndex = 0;

        // setting the character iamge, text, and dialog box
        this.dialogBox = this.scene.add.image(this.dialogBoxX, this.dialogBoxY, 'dialog_box').setOrigin(0.5, 0.5).setVisible(false);
        this.currCharacter = this.scene.add.image(this.charX, this.charY, this.dialog[0][0]).setVisible(false);
        this.currText = this.scene.add.text(this.textX, this.textY, this.dialog[0][1]).setOrigin(0, 0).setWordWrapWidth(game.config.width / 1.5).setVisible(false);
    }

    update() {
        // return back to beginning of update function since finished dialog
        if (this.getFinishedDialog()) {
            return;
        }

        // advance to next dialog when space is pressed and dialog is currently being shown
        if (this.show) {
            // get out if is talking to another sprite
            if (this.isTalkingToSomeoneElse) {
                return;
            }

            if (this.currDialogIndex >= this.dialog.length - 1) {
                // remove all dialog visuals
                this.currCharacter.setVisible(false);
                this.currText.setVisible(false);
                this.dialogBox.setVisible(false);

                // change conditionals
                this.setFinishedDialog(true);
                this.setIsTalkingToMe(false);

                return;
            }

            if (this.currDialogIndex == 0) {
                this.dialogBox.setVisible(true);
                this.currCharacter.setVisible(true);
                this.currText.setVisible(true);

                this.setIsTalkingToMe(true);
            }

            // display the dialog
            if (this.currDialogIndex == 0 || Phaser.Input.Keyboard.JustDown(this.scene.cursors.space)) {
                // play audio if given sound
                if (this.dialog[this.currDialogIndex][0] == 'sound') {
                    this.sfx = this.scene.sound.add(this.dialog[this.currDialogIndex][1]);
                    this.sfx.play();
    
   
                // pause the dialog
                } else if (this.dialog[this.currDialogIndex][0] == 'pause') {
                   this.scene.time.delayedCall(this.dialog[this.currDialogIndex][1], () => {});
                // otherwise set the text and character
                } else {
                    this.currCharacter.setTexture(this.dialog[this.currDialogIndex][0]);
                    this.currText.setText(this.dialog[this.currDialogIndex][1]);
                }
    
                ++this.currDialogIndex;
             }

      }

    }

    getCurrDialogIndex() {
        return this.currDialogIndex;
    }

    // gets the current information if the dialog is finished
    getFinishedDialog() {
        return this.finishedDialog;
    }

    // sets the dialog to finished
    setFinishedDialog(isFinished) {
        this.finishedDialog = isFinished;
    }

    getIsTalkingToMe() {
        return this.isTalkingToMe;
    }

    setIsTalkingToMe(myTurn) {
        this.isTalkingToMe = myTurn;
    }

    getIsTalkingToSomeoneElse() {
        return this.isTalkingToSomeoneElse;
    }

    setIsTalkingToSomeoneElse(notMyTurn) {
        this.isTalkingToSomeoneElse = notMyTurn;
    }

    getIsShowing() {
        return this.show;
    }

    setIsShowing(willShow) {
        this.show = willShow;
    }
}
