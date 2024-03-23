export default class Card {
  static suits = ['spades', 'hearts', 'diamonds', 'clubs'];
  static ranks = ['ace', 'king', 'queen', 'jack', 'ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two'];

  constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
  }

  getRank() {
      return Card.ranks[this.rank];
  }

  getSuit() {
      return Card.suits[this.suit];
  }

  getCard() {
      return this.getRank() + ' of ' + this.getSuit();
  }


}
