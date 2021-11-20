import Deck from "../class/deck";
import Table from "../class/table";

export const startGame = (table: Table) => {
    table.startBlackjack("ai");
};

export const initGame = (table: Table) => {
    table.selectBet();
    table.deck = new Deck();
    table.deck.shuffle();
    table.blackjackAssignPlayerHands();
};

export const selectAction = (table: Table) => {
    table.action();
};
