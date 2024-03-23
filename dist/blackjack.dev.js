"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _deck = _interopRequireDefault(require("./deck.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BlackJack =
/*#__PURE__*/
function () {
  function BlackJack() {
    var chips = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

    _classCallCheck(this, BlackJack);

    this.bet = 0;
    this.deck = new _deck["default"](); // Initialize a new deck of cards

    this.chips = chips; // Starting chips amount
    // Initialize game state variables

    this.hasDealerBJ = false;
    this.endRound = false;
    this.winner = false;
    this.canDouble = true;
    this.playerSum = 0;
    this.hasPlayerBJ = false;
    this.deck.shuffle(); // Shuffle the deck
    // Card value mapping

    this.cardMap = {
      'ace': [1, 11],
      'king': 10,
      'queen': 10,
      'jack': 10,
      'ten': 10,
      'nine': 9,
      'eight': 8,
      'seven': 7,
      'six': 6,
      'five': 5,
      'four': 4,
      'three': 3,
      'two': 2
    };
  }

  _createClass(BlackJack, [{
    key: "startRound",
    // Methods for game logic
    value: function startRound(bet) {
      this.playerFirst = this.deck.draw();
      this.dealerShown = this.deck.draw();
      this.playerSecond = this.deck.draw();
      this.dealerHidden = this.deck.draw();
      this.bet = bet;
      this.chips -= this.bet;
      this.playerSum = this.calcSum(this.playerFirst, this.playerSecond);
      this.dealerSum = this.calcSum(this.dealerHidden, this.dealerShown);
      this.hasDealerBJ = this.hasBlackJack(this.dealerHidden, this.dealerShown);
      this.hasPlayerBJ = this.hasBlackJack(this.playerFirst, this.playerSecond);

      if (this.hasDealerBJ || this.hasPlayerBJ) {
        this.playerStand();
      } //this.canBuyInsurance = (this.dealerShown.getRank() ==='ace');
      //this.canDouble = this.double();

    }
    /*
    ****************************
    Player Methods
    ****************************
    */

  }, {
    key: "getPlayerSum",
    value: function getPlayerSum() {
      return this.playerSum;
    } //player wins logic 

  }, {
    key: "playerWin",
    value: function playerWin() {
      if (this.endRound) {
        // Check for player blackjack
        if (this.hasBlackJack(this.playerFirst, this.playerSecond) && !this.hasBlackJack(this.dealerShown, this.dealerHidden)) {
          this.chips += this.bet * 1.5 + this.bet;
          return true;
        } // Handle soft hand (Ace present)


        var playerBestSum = Array.isArray(this.playerSum) ? Math.max.apply(Math, _toConsumableArray(this.playerSum.filter(function (sum) {
          return sum <= 21;
        }))) : this.playerSum;
        var dealerBestSum = Array.isArray(this.dealerSum) ? Math.max.apply(Math, _toConsumableArray(this.dealerSum.filter(function (sum) {
          return sum <= 21;
        }))) : this.dealerSum; // Compare player's best sum with dealer's sum

        if (playerBestSum <= 21 && playerBestSum > dealerBestSum || dealerBestSum > 21) {
          this.chips += 2 * this.bet;
          return true;
        } else if (this.playerTie) {
          this.chips += this.bet;
        }

        return false;
      }
    } // there is a tie logic

  }, {
    key: "playerTie",
    value: function playerTie() {
      var playerBestSum = Array.isArray(this.playerSum) ? Math.max.apply(Math, _toConsumableArray(this.playerSum.filter(function (sum) {
        return sum <= 21;
      }))) : this.playerSum;
      var dealerBestSum = Array.isArray(this.dealerSum) ? Math.max.apply(Math, _toConsumableArray(this.dealerSum.filter(function (sum) {
        return sum <= 21;
      }))) : this.dealerSum; // Check for a tie

      return playerBestSum === dealerBestSum;
    } //player hits logic

  }, {
    key: "playerHit",
    value: function playerHit() {
      var _this = this;

      if (!this.endRound) {
        var nextCard = this.deck.draw();

        if (nextCard.getRank() === 'ace') {
          if (Array.isArray(this.playerSum)) {
            this.playerSum = this.playerSum.map(function (element) {
              return element + 1;
            });
          } else {
            if (this.playerSum + 11 > 21) {
              this.playerSum += 1;
            } else {
              this.playerSum = [this.playerSum + 1, this.playerSum + 11];
            }
          }
        } else if (Array.isArray(this.playerSum)) {
          this.playerSum = this.playerSum.map(function (element) {
            return element + _this.cardMap[nextCard.getRank()];
          });

          if (this.playerSum[1] > 21) {
            this.playerSum = this.playerSum[0];
          }
        } else {
          this.playerSum += this.cardMap[nextCard.getRank()];

          if (this.playerSum > 21) {
            this.endRound = true;
            this.winner = false;
          }
        }

        return nextCard;
      }

      return null;
    }
  }, {
    key: "playerStand",
    value: function playerStand() {
      if (Array.isArray(this.playerSum)) {
        this.playerSum = playerSum[1];
      }

      this.endRound = true;
    }
    /* 
    *****************************
    dealer methods
    ****************************
    */
    // dealer hits

  }, {
    key: "dealerHit",
    value: function dealerHit() {
      var nextCard = this.deck.draw(); //hand does not have an ace in it

      if (!Array.isArray(this.dealerSum)) {
        this.dealerSum = [this.dealerSum, this.dealerSum];
      } //while(this.dealerSum[1]<=16){


      if (nextCard.getRank() === 'ace') {
        if (this.dealerSum[1] + 11 < 21) {
          this.dealerSum[0] += 1;
          this.dealerSum[1] += 11;
        } else {
          this.dealerSum[0] += 1;
          this.dealerSum[1] += 1;
        }
      } //next card is not an ace
      else {
          this.dealerSum = [this.dealerSum[0] + this.cardMap[nextCard.getRank()], this.dealerSum[1] + this.cardMap[nextCard.getRank()]];
        }

      if (this.dealerSum[1] > 21) {
        this.endRound = true;
        this.winner = true;
      }

      return nextCard;
    }
  }, {
    key: "dealerStand",
    value: function dealerStand() {
      if (Array.isArray(this.dealerSum)) {
        this.dealerSum = this.dealerSum[1];
      }

      this.endRound = true;
      return this.playerWin();
    }
  }, {
    key: "getDealerSum",
    value: function getDealerSum() {
      return this.dealerSum;
    }
    /*
    ****************************
    chip Methods
    ****************************
    */

  }, {
    key: "getchips",
    value: function getchips() {
      return this.chips;
    }
  }, {
    key: "chipsToString",
    value: function chipsToString() {
      return "Chip Counter: " + this.chips;
    }
    /*
    ****************************
    Extraneous methods 
    ****************************
    */
    // Starts a new round with a given bet
    //can double extra implementation for future updates

  }, {
    key: "double",
    value: function double() {
      if (this.playerSum == 11 && this.canDouble) {
        this.playerHit();
        this.canDouble = false;
        this.playerStand();
      }
    } //can split for future updates

  }, {
    key: "canSplit",
    value: function canSplit(card1, card2) {
      return card1.getRank() == card2.getRank();
    } // self explanatory

  }, {
    key: "hasBlackJack",
    value: function hasBlackJack(card1, card2) {
      if (card1.getRank() == 'ace' && ['king', 'queen', 'jack', 'ten'].includes(card2.getRank()) || card2.getRank() == 'ace' && ['king', 'queen', 'jack', 'ten'].includes(card1.getRank())) {
        this.endRound = true;
        return true;
      }

      return false;
    } //sum of two cards

  }, {
    key: "calcSum",
    value: function calcSum(card1, card2) {
      var _this2 = this;

      if (card1.getRank() == 'ace' && card2.getRank() == 'ace') {
        return 2;
      } else if (card1.getRank() == 'ace') {
        var temp = this.cardMap['ace'];
        temp = temp.map(function (element) {
          return element + _this2.cardMap[card2.getRank()];
        });

        if (temp[1] == 21) {
          return 21;
        } else {
          return temp;
        }
      } else if (card2.getRank() == 'ace') {
        var _temp = this.cardMap['ace'];
        _temp = _temp.map(function (element) {
          return element + _this2.cardMap[card1.getRank()];
        });

        if (_temp[1] == 21) {
          return 21;
        } else {
          return _temp;
        }
      } else {
        return this.cardMap[card1.getRank()] + this.cardMap[card2.getRank()];
      }
    }
  }]);

  return BlackJack;
}(); //end of class


exports["default"] = BlackJack;