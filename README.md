# Blackjack game

## Brief Game Summary
  A web application designed to simulate the Blackjack card game. It is styled with an 8-bit retro arcade aesthetic using pixel-art fonts and a single CSS file to render cards dynamically. It enforces a strict validation rule that requires players to enter an alphabetical username between 3 and 50 characters before they can enter the game. Players start with a $1,000 bankroll and can adjust their stakes in increments of $100. The game blocks dealing if a bet is set to $0, and triggers a "Game Over" state if the wallet hits $0. Players can choose to Hit to draw more cards or Stay to freeze their total. Once the player stays, the dealer reveals their hand and must automatically hit until their score reaches at least 16. The engine tracks a 52-card standard deck. If the remaining deck drops below 16 cards, it automatically mixes the discard pile back into the deck, executes a randomized shuffle, and pushes an alert to the user interface.

# Architecture Summary
1. Data Models and Game Logic (models.js)

    card_deck: Handles initial creation of the standard 52-card matrix. Automatically handles dynamic index slicing swaps for shuffles and checks thresholds to auto-reshuffle the pile if fewer than 16 cards remain.

    hand: Evaluates active card matrix arithmetic totals. Automatically processes flexible calculations for soft Aces (reducing values from 11 down to 1 as the score threatens to exceed 21).

    blackjack: Governs core logic including absolute outcome tracking across round results, dealer draw sequences, score evaluations, and final wallet resolution changes.

2. UI Presenter (view.js)

    Translates Game State to the Screen: Acts as the bridge between your background game data and what the player actually sees, instantly updating the interface as the game state changes.

    Dynamic Card Rendering: Automatically builds and animations-in new cards right alongside the initial starting cards (facedownPlayer and facedownDealer).

    Interactive Button Safeguards: Automatically locks or unlocks interaction panels when appropriate. For instance, it disables betting controls mid-hand to prevent players from accidentally changing their stakes after the cards are dealt.

3. Controller (listeners.js)

    Deal: Checks if current bets exceed $0, locks parameters, and distributes cards.

    Hit: Sequentially pulls active card instances to append elements to the player context and runs live checks to flag any immediate bust states.

    Stay: Unveils the hidden house card layers, resolves trailing automated dealer hits, and runs comparisons to trigger capital settlement flows.

4. App Initializer (app.js)

    The Mission Control: Directs traffic across the entire app. It grabs the user’s name right at the door and boots up the main dashboard.

    Enforces the Game Over: Monitors the player's wallet balance on every hand. If the bankroll drops to $0, it locks down play and flashes the final "Game Over" alerts.

    Fresh Starts: Runs the main setup and cleanup routines—wiping out old message alerts, resetting the 52-card deck model, and re-syncing the UI text.
   
## How to Run

    Clone or download this project workspace directory locally.

    Open index.html in any standard web browser (Chrome, Firefox, Safari, Edge).

    Submit a valid user profile name (3-50 letters, no spaces/special symbols) to step directly into the game context loop.

    Keep the exact file placement and folders, if altered, the application may not properly deploy or function.

    The most I have won is $3,000. Have fun playing!!
