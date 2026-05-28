
//view.js

var playerTemp = 0;

var dealerTemp = 0;

var firstCard = document.getElementById("facedownPlayer");
//function
var dealerFirstCard = document.getElementById("facedownDealer");

function disableAllButtons(){

    let stayButton = getStayButton();
    let hitButton = getHitButton();
    let dealButton = getDealButton();
    let incButton = getIncrementButton();
    let decButton = getDecrementButton();

    disableButton(stayButton);
    disableButton(hitButton);
    disableButton(dealButton);
    disableButton(incButton);
    disableButton(decButton);
}

function disableButton(button){

    button.disabled = true;
}
function enableButton(button){

    button.disabled = false;
}
function getIncrementButton(){

    return document.getElementById("bet-inc");
}
function getDecrementButton(){

    return document.getElementById("bet-dec");
}
function getDealButton(){

    return document.getElementById("deal");
}
function getHitButton(){

    return document.getElementById("hit");
}
function getStayButton(){

    return document.getElementById("stay");
}
function checkBet(){

    let setBet = document.getElementById("bet-amount").innerHTML; // Retrieve bet amount from input
    setBet = parseInt(setBet, 10);  // Converts the string to an integer (base 10)
    if(setBet === 0){

        let dealButton = getDealButton();
        let hitButton = getHitButton();
        let stayButton = getStayButton();

        //disableButton(dealButton);
        disableButton(hitButton);
        disableButton(stayButton);

        return false;
    }
    else{
        gamePlay.Blackjack.setBet(setBet);
        return true;
    }
    
}

function resetDealerCards(){

    dealerTemp = 0;

    dealerFirstCard.id = "facedownDealer";

    // Remove all sibling divs that were appended to firstCard
    let dealerNextSibling = dealerFirstCard.nextSibling;

    while (dealerNextSibling) {
        let toRemove = dealerNextSibling;
        dealerNextSibling = dealerNextSibling.nextSibling;  // Move to the next sibling
        if (toRemove.tagName === "DIV") {       // Ensure it's a div element
            toRemove.remove();  // Remove the div
        }
    }
}
function resetCards(theElement){

    dealerFirstCard.id = "facedownDealer";

    // Remove all sibling divs that were appended to firstCard
    let dealerNextSibling = dealerFirstCard.nextSibling;

    while (dealerNextSibling) {
        let toRemove = dealerNextSibling;
        dealerNextSibling = dealerNextSibling.nextSibling;  // Move to the next sibling
        if (toRemove.tagName === "DIV") {       // Ensure it's a div element
            toRemove.remove();  // Remove the div
        }
    }    
}

function resetPlayerCards(){

    // Reset the first card's id and content (reset playerHand)
    firstCard.id = "facedownPlayer";  // Reset id to original id

    // Remove all sibling divs that were appended to firstCard
    let nextSibling = firstCard.nextSibling;

    while (nextSibling) {
        let toRemove = nextSibling;
        nextSibling = nextSibling.nextSibling;  // Move to the next sibling
        if (toRemove.tagName === "DIV") {       // Ensure it's a div element
            toRemove.remove();  // Remove the div
        }
    }
}

function restOfDealerCards(){

    resetDealerCards();

    for(let i = 0; i < gamePlay.Blackjack.dealer.cards.length; i++){

        console.log(dealerTemp);

        showDealtCard("dealer", false);

        //dealerTemp++;

        //console.log(dealerTemp);

    } 

    /*

    for(dealerTemp; dealerTemp < gamePlay.Blackjack.dealer.cards.length; dealerTemp++){

        let dealerCard = gamePlay.Blackjack.dealer.cards[dealerTemp];

        let dealerCardId = `${dealerCard.getSuit()}${dealerCard.getRank()}`;
        //console.log("dealerFirstCard ID before:" , dealerFirstCard.id);
        //dealerFirstCard.id = `${dealerCard.getSuit()}${dealerCard.getRank()}`;
        //console.log("dealerFirstCard ID after:" , dealerFirstCard.id);
        let newDealerDiv = document.createElement("div");
        //newDealerDiv.id = dealerFirstCard.id;
        newDealerDiv.id = dealerCardId;
        newDealerDiv.className = "card_deck";  // Optionally, give it a class name
    
        // Add the new div next to the existing one (after "firstCard")
        //dealerFirstCard.appendChild(newDealerDiv);
        dealerFirstCard.parentNode.insertBefore(newDealerDiv, dealerFirstCard.nextSibling);

    } 

    */
}

function dealerFirstCards(){

    showDealtCard("dealer", true);
    showDealtCard("dealer", false);

    /*

    let dealerCard = gamePlay.Blackjack.dealer.cards[dealerTemp];

    let dealerCardId = `${dealerCard.getSuit()}${dealerCard.getRank()}`;

    let newDealerDiv = document.createElement("div");
    newDealerDiv.id = dealerCardId;
    newDealerDiv.className = "card_deck";  // Optionally, give it a class name
    
    // Add the new div next to the existing one (after "firstCard")
    dealerFirstCard.parentNode.insertBefore(newDealerDiv, dealerFirstCard.nextSibling);

    */
}

function playerFirstCards(){

    showDealtCard("player", false);
    showDealtCard("player", false);

    /*

    let card = gamePlay.Blackjack.player.userhand.cards[playerTemp];
    //console.log(card);

    // Construct an id string using the suit and rank of the card
    let cardId = `${card.getSuit()}${card.getRank()}`;

    firstCard.id = cardId;
    playerTemp++;

    let card2 = gamePlay.Blackjack.player.userhand.cards[playerTemp];

    let cardid = `${card2.getSuit()}${card2.getRank()}`;

    // Dynamically create a new div element for the next card
    let newDiv = document.createElement("div");
    newDiv.id = cardid;
    newDiv.className = "card_deck";  // Optionally, give it a class name
    
    // Add the new div next to the existing one (after "firstCard")
    firstCard.parentNode.insertBefore(newDiv, firstCard.nextSibling);

    */
}

function hitPlayer(){

    //playerTemp++;

    showDealtCard("player", false);



    /*

    let card3 = gamePlay.Blackjack.player.userhand.cards[playerTemp];

    let cardid = `${card3.getSuit()}${card3.getRank()}`;

    // Dynamically create a new div element for the next card
    let newDiv = document.createElement("div");
    newDiv.id = cardid;
    newDiv.className = "card_deck";  // Optionally, give it a class name
    

    // Add the new div next to the existing one (after "firstCard")
    firstCard.parentNode.insertBefore(newDiv, firstCard.nextSibling);

    */
}

function resetView(){

    playerTemp = 0;

    dealerTemp = 0;

    resetPlayerCards();

    resetDealerCards();

    document.getElementById("dealerScore").innerHTML = "";

    document.getElementById("playerScore").innerHTML = "";


    showDiv("facedownDealer");

    // Re-enable buttons
    let incButton = getIncrementButton();
    let decButton = getDecrementButton();
    let hitButton = getHitButton();
    let dealButton = getDealButton();
    let stayButton = getStayButton();

    disableButton(hitButton);
    disableButton(stayButton);

    enableButton(dealButton)
    enableButton(incButton);
    enableButton(decButton);

    // Reset the dealer's hand display if it exists
    let dealerHand = document.getElementById("dealerHand");
}

function showDealtCard(player, facedown) {
    let card, cardId, cardElement;

    // Determine if the card is for the player or dealer
    if (player === "player") {
        // Get the player's next card
        card = gamePlay.Blackjack.player.userhand.cards[playerTemp];
        cardId = `${card.getSuit()}${card.getRank()}`;
        
        // If the card is face down
        if (facedown) {
            cardId = "facedownPlayer";  // Change id to reflect that it's face down
        }

        // If it's the first card, change the id of the existing 'firstCard'
        if (playerTemp === 0) {
            firstCard.id = cardId;
        } else {
            // Create a new div for subsequent cards
            cardElement = document.createElement("div");
            cardElement.id = cardId;
            cardElement.className = "card_deck"; // Ensure 'card_deck' is styled appropriately
            firstCard.parentNode.insertBefore(cardElement, firstCard.nextSibling);
        }

        playerTemp++;  // Increment to track the next card

    } else if (player === "dealer") {
        // Get the dealer's next card
        card = gamePlay.Blackjack.dealer.cards[dealerTemp];
        console.log(card);
        cardId = `${card.getSuit()}${card.getRank()}`;
        
        // If the card is face down
        if (facedown) {
            cardId = "facedownDealer";  // Change id to reflect that it's face down
        }

        // If it's the first card, change the id of the existing 'dealerFirstCard'
        if (dealerTemp === 0) {
            dealerFirstCard.id = cardId;
        } else {
            // Create a new div for subsequent cards
            cardElement = document.createElement("div");
            cardElement.id = cardId;
            cardElement.className = "card_deck";  // Ensure 'card_deck' is styled appropriately
            dealerFirstCard.parentNode.insertBefore(cardElement, dealerFirstCard.nextSibling);
        }

        dealerTemp++;  // Increment to track the next card
    }
}

function showPlayerScore(){

    let Pscore = document.getElementById("playerScore");

    changeText(Pscore, gamePlay.Blackjack.player.userhand.getScore());
}

function showDealerScore(){

    let Dscore = document.getElementById("dealerScore");

    changeText(Dscore, gamePlay.Blackjack.dealer.getScore());
}
function showWallet(){

    let theWallet = document.getElementById("wallet");

    changeText(theWallet, gamePlay.Blackjack.player.userWallet.getValue());
}

function showCardsLeft(){

    let cardsLeftDiv = document.getElementById("card-count");

    changeText(cardsLeftDiv, gamePlay.Blackjack.carddeck.getNumCardsLeft());

}

function showBet(){

    let betDiv = document.getElementById("bet-amount");

    changeText(betDiv,gamePlay.Blackjack.getBet());
}

function updateBet(bet){

    gamePlay.Blackjack.player.setUserBet(bet);

    let betDiv = document.getElementById("bet-amount");

    changeText(betDiv,bet);

}

function hasClass(element, className) { 

    return element.classList.contains(className);
}

//addClass(element, className) – adds a given class to an element if it does not have the class. Does nothing otherwise.
function addClass(element, className) {
    if (element.classList)
        element.classList.add(className);
    else if (!hasClass(element, className))
        element.className += " " + className;
}
//removeClass(element, className) – removes a given class from an element if the class has it. Does nothing otherwise.
function removeClass(element, className) {
    if (element.classList)
        element.classList.remove(className);
}

//changeText(element, msg) – changes the text of a given element to the given message
function changeText(element, msg) {
    if (element !== null)
        element.innerHTML = msg;
}
//clearMessages – Removes all messages from the message div.
function clearMessages() {
    var messageDiv = document.getElementById("message");
    if (messageDiv !== null)
        messageDiv.innerHTML = null;
}

//Displays username on the game page
function setUsername(userName) {
    var usernameDiv = document.getElementById("usernameDiv");
    changeText(usernameDiv,userName);
    addMessage(userName);
}

//addMessage(msg) – adds a given text (msg) to the message div.
function addMessage(msg) {
    var messageDiv = document.getElementById("message");
    if (messageDiv !== null)
        messageDiv.innerHTML += msg+"<br>";
    //scroll the message div to see new messages
    messageDiv.scrollTop = messageDiv.scrollHeight;
}

//show a div given the div's ID
function showDiv(divID) {
    var userDiv = document.getElementById(divID);
    if (userDiv !== null)
        userDiv.style.visibility = "visible";
}
//hide a div given the div's ID
function hideDiv(divID) {
    var userDiv = document.getElementById(divID);
    if (userDiv !== null)
        userDiv.style.visibility = "hidden";

}

