# Simple Blackjack Game

A straightforward implementation of the classic card game Blackjack, also known as 21. This game is designed to run in the console and provides a basic interface for playing against the dealer. The project is structured into three main classes: `Deck`, `Card`, and `Blackjack`, each handling different aspects of the game.

## Classes

### Card

Represents a single playing card with a suit and value. The card's value is used to calculate the score in the game.

- **Attributes:**
  - `suit`: A string representing the card's suit (Hearts, Diamonds, Clubs, or Spades).
  - `value`: An integer or string representing the card's value (2-10, Jack, Queen, King, or Ace).

### Deck

Represents a standard deck of 52 playing cards.

- **Attributes:**
  - `cards`: A list of `Card` objects representing the deck.

- **Methods:**
  - `shuffle()`: Randomizes the order of the cards in the deck.
  - `deal()`: Removes and returns the top card from the deck.

### Blackjack

Contains the rules and logic for a game of Blackjack.
Deployed on github pages here: https://arvchahal.github.io/Blackjack/
No external libraries are required to run this game, as it uses standard Python libraries.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Enjoy playing Blackjack!
