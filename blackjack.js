import Deck from './deck.js';

export default class BlackJack{


  constructor(chips = 1000){
    this.bet = 0;
    this.deck = new Deck(); // Initialize a new deck of cards
    this.chips = chips; // Starting chips amount

    // Initialize game state variables
    this.hasDealerBJ = false;
    this.endRound = false;
    this.winner = false;
    this.canDouble = true;
    this.playerSum = 0;
    this.hasPlayerBJ =false;
    this.deck.shuffle(); // Shuffle the deck

    // Card value mapping

     this.cardMap = {
      'ace': [1, 11],
      'king':10,
      'queen':10,
      'jack':10,
      'ten':10,
      'nine':9,
      'eight':8,
      'seven':7,
      'six':6,
      'five':5,
      'four':4,
      'three':3,
      'two':2};

     


    };
  // Methods for game logic

  startRound(bet){
      
    this.playerFirst = this.deck.draw();
    this.dealerShown = this.deck.draw();
    this.playerSecond = this.deck.draw()
    this.dealerHidden = this.deck.draw();
    this.bet = bet;
    this.chips -= this.bet;
    this.playerSum = this.calcSum(this.playerFirst,this.playerSecond);
    this.dealerSum = this.calcSum(this.dealerHidden,this.dealerShown);
    this.hasDealerBJ = this.hasBlackJack(this.dealerHidden,this.dealerShown);
    this.hasPlayerBJ=this.hasBlackJack(this.playerFirst,this.playerSecond)
    if(this.hasDealerBJ || this.hasPlayerBJ){
      this.playerStand();
    }
    //this.canBuyInsurance = (this.dealerShown.getRank() ==='ace');
    //this.canDouble = this.double();


  }
  

/*
****************************
Player Methods
****************************
*/


  getPlayerSum(){
    return this.playerSum;
  }



//player wins logic 
  playerWin() {
    if (this.endRound) {
      // Check for player blackjack
      if (this.hasBlackJack(this.playerFirst, this.playerSecond) && !this.hasBlackJack(this.dealerShown, this.dealerHidden)) {
        this.chips += this.bet * 1.5+this.bet;
        return true;
      }
  
      // Handle soft hand (Ace present)
      let playerBestSum = Array.isArray(this.playerSum) ? Math.max(...this.playerSum.filter(sum => sum <= 21)) : this.playerSum;
      let dealerBestSum = Array.isArray(this.dealerSum) ? Math.max(...this.dealerSum.filter(sum => sum <= 21)) : this.dealerSum;
  
      // Compare player's best sum with dealer's sum
      if ((playerBestSum <= 21 && playerBestSum > dealerBestSum) || dealerBestSum > 21) {
        this.chips += 2*this.bet;
        return true;
      } 
      else if(this.playerTie) {
        this.chips+=this.bet;
      }


    return false;
  }
}

// there is a tie logic
  playerTie() {
    let playerBestSum = Array.isArray(this.playerSum) ? Math.max(...this.playerSum.filter(sum => sum <= 21)) : this.playerSum;
    let dealerBestSum = Array.isArray(this.dealerSum) ? Math.max(...this.dealerSum.filter(sum => sum <= 21)) : this.dealerSum;
  
    // Check for a tie

    return playerBestSum === dealerBestSum;
  }
  

  //player hits logic

  playerHit(){
    if(!this.endRound){
    let nextCard = this.deck.draw();
    if(nextCard.getRank() ==='ace'){
      if(Array.isArray(this.playerSum)){
        this.playerSum = this.playerSum.map(element=>element+1);
      }
      else{
        if(this.playerSum + 11> 21){
          this.playerSum += 1;
        }
        else{ 
          this.playerSum = [this.playerSum+1,this.playerSum+11];
        }
      }
    }
    else if(Array.isArray(this.playerSum) ){
      this.playerSum = this.playerSum.map(element=>element+ this.cardMap[nextCard.getRank()]);
      if(this.playerSum[1]>21){
        this.playerSum = this.playerSum[0];
      }
    }
    else {
      this.playerSum += this.cardMap[nextCard.getRank()];
      if(this.playerSum>21){

        this.endRound=true;
        this.winner =false;
        
        }
      }
      return nextCard;

    }
    return null;
  }

  playerStand(){
    if(Array.isArray(this.playerSum)){
      this.playerSum = playerSum[1];
    }
    this.endRound =true;
  }



/* 
*****************************
dealer methods
****************************
*/

// dealer hits

  dealerHit(){
    let nextCard = this.deck.draw();

    //hand does not have an ace in it
    if(!Array.isArray(this.dealerSum)){
      this.dealerSum = [this.dealerSum,this.dealerSum];}
    //while(this.dealerSum[1]<=16){
    if(nextCard.getRank() ==='ace'){
      if(this.dealerSum[1]+11<21){
        this.dealerSum[0]+=1;
        this.dealerSum[1]+=11;}
      else{
        this.dealerSum[0]+=1;
        this.dealerSum[1]+=1;

      }
    }
    //next card is not an ace
    else{
      this.dealerSum = [this.dealerSum[0]+this.cardMap[nextCard.getRank()],this.dealerSum[1]+this.cardMap[nextCard.getRank()]];
      
    }
  
    if (this.dealerSum[1] > 21) {
      this.endRound = true;
      this.winner = true;
    }
    return nextCard;

  }
  
    dealerStand(){
    if(Array.isArray(this.dealerSum)){
      this.dealerSum = this.dealerSum[1];
    }
    this.endRound = true;
    return this.playerWin();
    }


    getDealerSum(){
    return this.dealerSum;
    }


  
  /*
  ****************************
  chip Methods
  ****************************
  */

  getchips(){
  return this.chips;
  }

  chipsToString(){
  return "Chip Counter: "+this.chips;
  }


/*
****************************
Extraneous methods 
****************************
*/


    // Starts a new round with a given bet



    //can double extra implementation for future updates

  double(){
    if(this.playerSum ==11 && this.canDouble){
      this.playerHit();
      this.canDouble = false;
      this.playerStand();
    }
  }

  //can split for future updates
  canSplit(card1,card2){
    return card1.getRank() == card2.getRank()
  
  }

  // self explanatory
  hasBlackJack(card1,card2){
    
    if( (card1.getRank()=='ace' &&   ['king', 'queen', 'jack','ten'].includes(card2.getRank())) 
    || card2.getRank()== 'ace'  && ['king', 'queen', 'jack','ten'].includes(card1.getRank())){
      this.endRound =true;
      return true;

  
    }
    return false;
  }

  //sum of two cards

  calcSum(card1,card2){
    if(card1.getRank() =='ace' && card2.getRank() == 'ace'){
      return 2;
    }
    else if(card1.getRank()=='ace'){
      let temp = this.cardMap['ace'];
      temp = temp.map(element=>element+this.cardMap[card2.getRank()]);
      if(temp[1]==21){
        return 21;
      }
      else{
        return temp;
      }
    }
    else if(card2.getRank()=='ace'){
      let temp = this.cardMap['ace'];
      temp = temp.map(element=>element+this.cardMap[card1.getRank()]);
      if(temp[1]==21){
        return 21;
      }
      else{
        return temp;
      }
    }

    else{
      return this.cardMap[card1.getRank()]+this.cardMap[card2.getRank()];
    }
  }

  
}//end of class