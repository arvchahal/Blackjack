"use strict";

var _blackjack = _interopRequireDefault(require("./blackjack.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import the Blackjack class
// Game state variables
var checker = 0;
var number_map = {
  3: "third",
  4: "fourth",
  5: "fifth",
  6: "sixth",
  7: "seventh",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven"
}; // Event listener for DOMContentLoaded to ensure DOM is fully loaded

document.addEventListener('DOMContentLoaded', function (event) {
  var round = new _blackjack["default"]();
  var hasStand = false;
  var newRoundButtonAvail = false;
  var hasBet = false;
  var playerCard1, playerCard2, dealerCard1, dealerCard2;
  var totalPlayerHits = 3;
  var totalDealerHits = 3; // UI element references

  var betButton = document.getElementById("placeBet");
  var betAmount = document.getElementById("bet");
  var newRoundButton = document.getElementById("newRoundButton");
  var hitButton = document.getElementById("Hit_button");
  var standButton = document.getElementById("Stand_button"); // Event listeners for game actions (betting, hitting, standing, new round)

  betButton.addEventListener('click', function () {
    // Handle bet placement logic
    if (!hasStand && !newRoundButtonAvail && !hasBet) {
      var amount = betAmount.value;

      if (amount <= 0 || amount > round.getchips() || isNaN(amount)) {
        alert("Please enter a valid bet amount");
        return;
      }

      var tempAmt = parseInt(betAmount.value);
      round.startRound(tempAmt); //round.chips -=amount;

      checker = round.getchips();
      document.getElementById("chips").innerHTML = round.chipsToString();
      hasBet = true;
      playerCard1 = round.playerFirst;
      playerCard2 = round.playerSecond;
      dealerCard1 = round.dealerShown;
      dealerCard2 = round.dealerHidden;
      document.getElementById("first_card_image").src = "PNG-cards-1.3\\" + playerCard1.getRank() + "_of_" + playerCard1.getSuit() + ".png";
      document.getElementById("second_card_image").src = "PNG-cards-1.3\\" + playerCard2.getRank() + "_of_" + playerCard2.getSuit() + ".png";
      document.getElementById("shown_card_image").src = "PNG-cards-1.3\\" + dealerCard1.getRank() + "_of_" + dealerCard1.getSuit() + ".png";
      document.getElementById("handValue").innerHTML = "Card Value: " + round.getPlayerSum();

      if (round.hasBJ) {
        round.playerWin();
        newRoundButton.style.display = null; // Show new round button if blackjack

        standButton.style.display = 'none';
        hitButton.style.display = 'none';
      }
    }
  });
  hitButton.addEventListener('click', function () {
    // Handle player hitting logic
    if (!round.endRound && !hasStand && !round.hasDealerBJ && !round.hasPlayerBJ) {
      if (hasBet) {
        var playerCardNext = round.playerHit();
        document.getElementById("handValue").innerHTML = "Card Value: " + round.getPlayerSum();
        var playerimgid = number_map[totalPlayerHits] + '_card_img';
        totalPlayerHits++;
        document.getElementById(playerimgid).style.display = null;
        document.getElementById(playerimgid).src = "PNG-cards-1.3\\" + playerCardNext.getRank() + "_of_" + playerCardNext.getSuit() + ".png";

        if (round.getPlayerSum() > 21) {
          newRoundButton.style.display = null;
          newRoundButtonAvail = true;
        }
      }
    } else {
      if (round.hasPlayerBJ) {
        round.playerWin();
      }

      newRoundButton.style.display = null;
      newRoundButtonAvail = true;
    }
  });
  newRoundButton.addEventListener('click', function () {
    // Reset card images to face down
    document.getElementById('shown_card_image').src = 'PNG-cards-1.3\\face_down_card.jpg';
    document.getElementById('hidden_card_image').src = 'PNG-cards-1.3\\face_down_card.jpg';
    document.getElementById('first_card_image').src = 'PNG-cards-1.3\\face_down_card.jpg';
    document.getElementById('second_card_image').src = 'PNG-cards-1.3\\face_down_card.jpg'; // Repeat for all additional card images
    // Hide additional cards

    var diffDealer = totalDealerHits - 3;
    var diffPlayer = totalPlayerHits - 3;

    for (var i = 0; i < diffDealer; i++) {
      var cleanupImgDealer = 'dealer_' + number_map[i + 3] + '_card_img';
      document.getElementById(cleanupImgDealer).style.display = 'none';
    }

    for (var _i = 0; _i < diffPlayer; _i++) {
      var cleanupImgPlayer = number_map[_i + 3] + '_card_img';
      document.getElementById(cleanupImgPlayer).style.display = 'none';
    } // Reset text fields


    document.getElementById('handValue').innerHTML = 'Card Value: ';
    document.getElementById('dealerValue').innerHTML = 'Dealer Hand Value: '; // Reset game state

    var numb = round.getchips();
    round = new _blackjack["default"](numb);
    hasBet = false;
    hasStand = false;
    newRoundButtonAvail = false;
    totalDealerHits = 3;
    totalPlayerHits = 3; // Hide/show buttons

    newRoundButton.style.display = 'none';
    standButton.style.display = null;
    hitButton.style.display = null;
  });
  standButton.addEventListener('click', function () {
    // Handle player standing logic
    if (!hasStand) {
      document.getElementById("hidden_card_image").src = "PNG-cards-1.3\\" + dealerCard2.getRank() + "_of_" + dealerCard2.getSuit() + ".png";
      var dealerSumValue = Array.isArray(round.dealerSum) ? round.dealerSum[1] : round.dealerSum;
      document.getElementById('dealerValue').innerHTML = 'Dealer Value: ' + dealerSumValue; //dealer keeps hitting until gets up to 17

      while (dealerSumValue <= 16) {
        var dealercardnext = round.dealerHit();
        dealerSumValue = Array.isArray(round.dealerSum) ? round.dealerSum[1] : round.dealerSum;
        document.getElementById('dealerValue').innerHTML = 'Dealer Value: ' + dealerSumValue;
        var cardImgId = 'dealer_' + number_map[totalDealerHits] + '_card_img';
        document.getElementById(cardImgId).style.display = null;
        document.getElementById(cardImgId).src = "PNG-cards-1.3\\" + dealercardnext.getRank() + "_of_" + dealercardnext.getSuit() + ".png";
        totalDealerHits++;
        hasStand = true;
      }

      var winner = round.dealerStand();

      if (winner) {
        alert("You won");
      } else if (round.playerTie()) {
        alert("You push");
      } else {
        if (round.getchips() != checker) {
          round.chips = checker;
        }

        alert("You Lose");
      } //let chipsCountstr = "Chip Counter: "+ round.chips;


      document.getElementById("chips").innerText = round.chipsToString();
      newRoundButton.style.display = null; // Show new round button
    }
  });
});