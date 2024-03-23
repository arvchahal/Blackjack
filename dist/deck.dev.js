"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _card = _interopRequireDefault(require("./card.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Deck =
/*#__PURE__*/
function () {
  function Deck() {
    _classCallCheck(this, Deck);

    this.deck = [];
    this.currIdx = 0;

    for (var i = 0; i < 13; i++) {
      for (var j = 0; j < 4; j++) {
        this.deck.push(new _card["default"](i, j));
      }
    } //card order this is an inorder deck of cards


    this.arr = [];

    for (var index = 0; index < 52; index++) {
      this.arr[index] = index;
    }
  } //draw from a deck logic


  _createClass(Deck, [{
    key: "draw",
    value: function draw() {
      if (this.currIdx < this.deck.length) {
        var tempCard = this.deck[this.currIdx];
        this.deck[this.currIdx] = null;
        this.currIdx++;
        return tempCard;
      }

      return null;
    } //shuffle cards logic

  }, {
    key: "shuffle",
    value: function shuffle() {
      this.arr.sort(function () {
        return Math.random() - .5;
      });
      this.currIdx = 0;
      var cardExt = this.deck.slice();

      for (var i = 0; i < this.arr.length; i++) {
        this.deck[this.arr[i]] = cardExt[i];
      }
    } //is equal logic for two decks completly unneeded but just
    // for fun

  }, {
    key: "isEqual",
    value: function isEqual(obj) {
      if (obj instanceof Deck && obj.deck.length === this.deck.length) {
        for (var i = 0; i < this.deck.length; i++) {
          if (!this.deck[i].equals(obj.deck[i])) {
            return false;
          }
        }

        return true;
      }

      return false;
    }
  }]);

  return Deck;
}();

exports["default"] = Deck;