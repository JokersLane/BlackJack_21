const suits = ["H","S","C","D"];    //allowable suits
const maxCardsPerSuit = 13;     //max cards per suit

//card object defining setters and getters
var card = {
    suit: "",
    rank:0,
    //sets rank of card
    setRank: function (Rank) { 

        this.rank = Rank; },

    //gets rank of card
    getRank: function () { 
        
        return this.rank; },

    setSuit: function(Suit){

        this.suit = Suit;
    },
    getSuit: function(){

        return this.suit;

    }
};

//object to define a card deck
var card_deck = {
    deck: [],
    disCardPile: [],
    cardsleft: 0,
    standardDeckSize: 52,

    createCard: function(suit, rank){

        let newCard = Object.create(card);

        newCard.setSuit(suit);

        newCard.setRank(rank);

        return newCard;

    },
    //creates 52 cards (four suits: Hearts, Clubs, Spades, Diamonds, 13 each (Ace, 2-10, Jack, Queen, King))
    initialize: function () {  

        this.deck = []; // reset deck

        this.disCardPile = [];

        for(let i = 0; i < suits.length; i++){

            for(let j = 1; j <= maxCardsPerSuit; j++){

                let newCard = this.createCard(suits[i], j);

                this.deck.push(newCard);

                /*
                card.setSuit(suits[i]);
                card.setRank(j);
                this.deck[temp] = card.getSuit() + card.getRank();
                temp++;
                */

            }
        }
        this.cardsleft = this.deck.length;

        //this.shuffle();

        console.log(this.getNumCardsLeft());

        //console.log(this.deck);

    },

    shuffle: function(){

        for(let i = 0; i < this.standardDeckSize; i++){ // loop the entire deck to swap as much indexes as possible

            let index1 = Math.floor(Math.random() * this.deck.length); // find a random index in the deck array to swap

            let index2 = Math.floor(Math.random() * this.deck.length); // find another random index in the deck array to swap with the first found index

            while(index1 === index2){ // keeping looping until the each index is different from one another

                index2 = Math.floor(Math.random() * this.deck.length); // keep searching for a different index that is not the same as index 1
            }
            [this.deck[index1], this.deck[index2]] = [this.deck[index2], this.deck[index1]]; // swap the indexes in the array
 
        }

        //console.log(this.deck);

    },

    dealCard: function(){

        if(this.getNumCardsLeft() < 16){

            this.shuffleRemainingDeck();

            addMessage("Less than 16 cards. Deck shuffled.");


        }
        let topCard = this.deck.shift();

        this.disCardPile.push(topCard);

        this.cardsleft--;

        return topCard;

    },

    getNumCardsLeft: function(){

        return this.cardsleft;
    },

    shuffleRemainingDeck: function(){

        this.deck.push(...this.disCardPile);

        this.disCardPile = [];

        this.cardsleft = this.deck.length;

        this.shuffle();
    }
};
var hand = {
    roundResult: 0,
    cards: 0,
    score: 0,
    aceCount: 0,

    handResult: function(result, index){

        if(this.roundResult === 0){

            this.roundResult = [0,0,0];
            for(let i = 0; i <= index; i++){
                this.roundResult[index] = result;
            }
        }
        else{
            for(let i = 0; i <= index; i++){
                this.roundResult[index] = result;
            }
        }

    },

    addCard: function(card){

        this.valueOfCard(card); 

        
        if(this.cards === 0){

            this.cards = [card]; 
        }
        else
        this.cards.push(card);

    },
    valueOfCard: function(card){

        var numberRank = card.getRank();

        //console.log("card rank", card.getRank());

        if(numberRank > 10){

            this.setScore(10);

        }
        else if(numberRank >= 2 && numberRank <= 10){

            this.setScore(numberRank);
        }
        else if(numberRank === 1 ){
            this.aceCount++;
            this.setScore(11);
        }

        while(this.score > 21 && this.aceCount > 0){

            this.score -= 10;

            this.aceCount--;
        }

    },
    setScore: function(value){

        this.score = this.getScore() + value;

        //console.log(this.score);

    },
    getScore: function(){

        return this.score;
    },
    reset: function(){
        for(let i = 0; i < this.cards.length; i++){

            card_deck.disCardPile.push(this.cards[i]);

        }
        this.roundResult = 0;
        this.cards = 0;
        this.score = 0;
        this.aceCount = 0;
    }
};
//accounting model object for a player
var wallet = {
    value: 0,
    setValue: function(amount){

        this.value = amount;

    },
    getValue: function(){
        return this.value;
    },
    addValue: function(amount){

        this.value = this.value + amount;
    },
    decrementValue: function(amount){
    
        this.value = this.value - amount;
    }
};
//model for defining a user in the game
var user = {
    userhand: Object.create(hand),
    userBet: 0,
    initializeBet: 0,
    userWallet: Object.create(wallet),
    startAmount: 1000,
    betChangeAmount: 100,

    setUserBet: function(amount){

        this.userBet = amount;
    },

    initialize: function(){

        this.userWallet.setValue(this.startAmount);
        this.setUserBet(this.initializeBet);
    }
};
var blackjack = {
    carddeck: Object.create(card_deck),
    dealer: Object.create(hand),
    player: Object.create(user),
    dealersHitLimit: 16,
    twentyONE: 21,
    //Initializes a blackjack game (creates a deck, shuffles the deck, gets the users's chips ready)
    initialize: function () {
        addMessage("Game Initialized");
        addMessage("Good Luck!");
        this.carddeck.initialize();
        this.player.initialize();
        this.carddeck.shuffle();
    },
    deal: function(){

        this.player.userhand.reset();
        this.dealer.reset();

        for(let i = 0; i < 2; i++){

            this.player.userhand.addCard(this.carddeck.dealCard());
            this.dealer.addCard(this.carddeck.dealCard());
        } 
    },

    setBet: function(amount){

        console.log("setBet function:", typeof amount, "value: ", amount);

        this.player.setUserBet(amount);
    },
    getBet: function(){

        return this.player.userBet;
    },
    userBetPlus100: function(){

        if(this.player.userWallet.getValue() > this.player.userBet){

            let result = this.getBet() + this.player.betChangeAmount;

            this.setBet(result);

            clearMessages();
            addMessage("Your bet is $" + this.getBet());

        }

    },

    userBetMinus100: function(){

        if(this.player.betChangeAmount > this.getBet()){

            clearMessages();
            addMessage("Your bet is zero.");
            addMessage("Increment your bet.");

        }
        else if(this.getBet() > this.player.betChangeAmount){

            let theBet = this.getBet() - this.player.betChangeAmount;

            this.setBet(theBet);

            clearMessages();
            addMessage("Your bet is $" + this.getBet());

            return false;
    }

    },

    didDealerBust: function(){

        if(this.dealer.getScore() > this.twentyONE){

            this.dealer.handResult(1,0);
        }
        else if(this.dealer.getScore() <= this.twentyONE){

            this.dealer.handResult(0,0);

            this.didDealerGetTwentyOne();
        }

    },

    dealerHit: function() {
        
        // less than 16 give dealer another card

        this.dealer.addCard(this.carddeck.dealCard());

        this.didDealerBust();
    },

    didDealerGetTwentyOne: function(){

        if(this.dealer.getScore() == this.twentyONE){

            this.dealer.handResult(1,1);
        }

        if(this.dealer.getScore() != this.twentyONE){

            if(this.dealer.getScore() < this.dealersHitLimit){

                this.dealerHit();

            }
            if(this.dealer.getScore() > this.twentyONE || this.dealer.getScore() < this.twentyONE){

                this.dealer.handResult(0,1);
            }
        }

    },
    hit: function () {

        this.player.userhand.addCard(this.carddeck.dealCard());

        this.didPlayerBust();
    },

    didPlayerBust: function(){

        if(this.player.userhand.getScore() > this.twentyONE){

            this.player.userhand.handResult(1,0);

        }
        else if(this.player.userhand.getScore() <= this.twentyONE){

            this.player.userhand.handResult(0,0);

            this.didPlayerGetTwentyOne();
        }

    },

    didPlayerGetTwentyOne: function(){

        if(this.player.userhand.getScore() == this.twentyONE){

            this.player.userhand.handResult(1,1);
        }
        if(this.player.userhand.getScore() != this.twentyONE){

            this.player.userhand.handResult(0,1);
        }

    },

    bankTransfer: function(){

        this.compareScores();

        if(this.player.userhand.roundResult[2] === 1){

            console.log(typeof this.player.userWallet.getValue());

            this.player.userWallet.addValue(this.getBet());

            //console.log("adding to wallet: ",this.player.userWallet.getValue());

            clearMessages();
            addMessage("You won $" + this.getBet());

            //console.log("You won the round");
        }
        else if(this.dealer.roundResult[2] === 1){

            console.log(typeof this.player.userWallet.getValue());

            this.player.userWallet.decrementValue(this.getBet());

            console.log("Subtracting from wallet: ",this.player.userWallet.getValue());

            //addMessage("Dealer won the round");

            console.log("Dealer won the round");


        }


    },

    compareScores: function(){

        let playerScore = this.player.userhand.getScore();

        let dealerScore = this.dealer.getScore();

        if(this.dealer.roundResult[0] === 1 && this.player.userhand.roundResult[0] === 1){

            this.dealer.handResult(1,2);
            this.player.userhand.handResult(0,2);
        }

        else if(playerScore > dealerScore){

            if(this.player.userhand.roundResult[0] === 1 && this.dealer.roundResult[0] !== 1){

                this.dealer.handResult(1,2);
                this.player.userhand.handResult(0,2);

            }else{
                this.player.userhand.handResult(1,2);
                this.dealer.handResult(0,2);
            }
            //this.playerWon = true;
            //this.dealerWon = false;
        }

        else if(dealerScore > playerScore){

            if(this.dealer.roundResult[0] === 1 && this.player.userhand.roundResult[0] !== 1){

                this.player.userhand.handResult(1,2);
                this.dealer.handResult(0,2);
            }else{

                this.dealer.handResult(1,2);
                this.player.userhand.handResult(0,2);
            }
        }
        else if(playerScore === dealerScore && this.dealer.roundResult[0] !==1 && this.player.userhand.roundResult[0] !== 1){

            this.dealer.handResult(1,2);
            this.player.userhand.handResult(0,2);
        }

        else if(this.dealer.roundResult[1] === 1 && this.player.userhand.roundResult[1] === 1){

            this.dealer.handResult(1,2);
            this.player.userhand.handResult(0,2);

        }

        }
    
};

//[21 result],[Bust Result],[Won Result]

//handResult(result, index)


