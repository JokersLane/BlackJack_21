
//listeners.js

var dealButtonIncrement = 0;

document.getElementById("hit").addEventListener("click", function() {


    //addMessage("You just HIT");

    let hitButton = document.getElementById("hit");

    if(gamePlay.Blackjack.player.userhand.roundResult[0] === 1 || gamePlay.Blackjack.player.userhand.roundResult[1] === 1){

        disableButton(hitButton);

    }else{
        enableButton(hitButton);

        gamePlay.Blackjack.hit();

        hitPlayer();

        showPlayerScore();
    }
    showCardsLeft();

    //Deal card to user
});
document.getElementById("deal").addEventListener("click", function() {

    let checkBetValue = checkBet();

    if(dealButtonIncrement > 0){
        resetView();
    }
    if(checkBetValue === true){

        // Disable buttons after dealing
        let incButton = getIncrementButton();
        let decButton = getDecrementButton();
        let dealButton = getDealButton();  // Get the deal button
        let hitButton = getHitButton();
        let stayButton = getStayButton();

        enableButton(hitButton);
        enableButton(stayButton);

        disableButton(decButton);  // Disable decrement button
        disableButton(incButton);  // Disable increment button
        disableButton(dealButton); // Disable deal button

        // Deal cards to the player and dealer
        gamePlay.Blackjack.deal();

        gamePlay.Blackjack.didDealerBust();

        playerFirstCards();  // Custom function to show player's cards

        showPlayerScore();

        dealerFirstCards();

        //showDealerScore();

        showCardsLeft();  // Custom function to show remaining cards

        dealButtonIncrement++;
    }
    else if(checkBetValue === false){

        clearMessages();
        addMessage("BET CANNOT BE $0!!");

    }
    
});
document.getElementById("stay").addEventListener("click", function() {


    let stayButton = document.getElementById("stay");
    let hitButton = document.getElementById("hit");
    let dealButton = document.getElementById("deal");
    let incButton = document.getElementById("bet-inc");
    let decButton = document.getElementById("bet-dec");

    disableButton(hitButton);
    disableButton(stayButton);

    enableButton(dealButton);
    enableButton(incButton);
    enableButton(decButton);

    restOfDealerCards();

    showDealerScore();

    gamePlay.Blackjack.bankTransfer();

    showWallet();

    updateBet(gamePlay.Blackjack.player.initializeBet);

    if(gamePlay.isGameOver() === true){

        disableAllButtons();
    }

});
document.querySelector("#reset").addEventListener("click", function() {

    resetView();

    gamePlay.reset();

    //addMessage("Game reset");

});
document.getElementById("bet-inc").addEventListener("click", function() {

    gamePlay.Blackjack.userBetPlus100();

    updateBet(gamePlay.Blackjack.getBet());

});
document.getElementById("bet-dec").addEventListener("click", function() {

    let decButton = getDecrementButton();

    if(gamePlay.Blackjack.userBetMinus100() === false){

        enableButton(decButton);
        updateBet(gamePlay.Blackjack.getBet());
    }
});

