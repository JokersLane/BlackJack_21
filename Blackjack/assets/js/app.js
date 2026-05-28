
//app.js
var gamePlay = {

    Blackjack: Object.create(blackjack),

    getUserName: function() {

        var currentURL = window.location + "";
        var theURLsplit = currentURL.split("=");
        return theURLsplit[1];
    },
    playGame: function(){

        let stayButton = getStayButton();
        let hitButton = getHitButton();

        disableButton(stayButton);
        disableButton(hitButton);

        this.reset();


    },

    isGameOver: function() {

        if(this.Blackjack.player.userWallet.getValue() === 0){

            clearMessages();
            addMessage("Out of Money.");
            addMessage("Game Over.");
            addMessage("Reset the Game.");

            return true;
            
        }else{
            return false;
        }

        
    },

    reset: function() {
        clearMessages();
        this.Blackjack.initialize();
        
        showCardsLeft();
        showBet();
        updateBet(this.Blackjack.getBet());
        showWallet();

    }



};

//start a blackjack game
var username = gamePlay.getUserName();
setUsername(username);
gamePlay.playGame();
