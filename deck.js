//create different methods for a deck
import Card from './card.js';
export default class Deck{


  constructor(){
    this.deck = [];
    this.currIdx =0;
    for( let i=0;i<13;i++){
      for(let j=0;j<4;j++){
        this.deck.push(new Card(i,j));
      }
    }
    //card order this is an inorder deck of cards
    this.arr = [];
    for (let index = 0; index < 52; index++) {
      this.arr[index] = index;
      
    }
  }

  //draw from a deck logic
  draw(){
    if(this.currIdx<this.deck.length){
    let tempCard = this.deck[this.currIdx];
    this.deck[this.currIdx]=null;
    this.currIdx++;

    return tempCard;
  }
    return null;
  }

  //shuffle cards logic
  shuffle(){
    this.arr.sort(() => Math.random()-.5) ;
    this.currIdx =0;
    let cardExt = this.deck.slice();
    for(let i =0;i<this.arr.length;i++){
      this.deck[this.arr[i]]= cardExt[i];
    }
    
  }
  //is equal logic for two decks completly unneeded but just
  // for fun
  isEqual(obj){
    if (obj instanceof Deck && obj.deck.length === this.deck.length) {
      for (let i = 0; i < this.deck.length; i++) {
          if (!this.deck[i].equals(obj.deck[i])) {
              return false;
          }
      }
      return true;
  }
  return false;
}


}
