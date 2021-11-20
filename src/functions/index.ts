import Deck from "../class/deck";
import { User } from "../class/player";
import Table from "../class/table";
import { hiddenCard, card } from "../components/parts/card";

export const startGame = (table: Table) => {
    table.startBlackjack("ai");
};

export const initGame = (table: Table) => {
    table.players.push(new User("Hiro"));
    table.selectBet();
    table.deck = new Deck();
    table.deck.shuffle();
    table.blackjackAssignPlayerHands();
};

export const selectAction = (table: Table) => {
    table.action();
};

export const setAllHands = (table: Table) => {
    document.querySelector(".house-zone").innerHTML += hiddenCard(table.house.hand);
    document.querySelector(".ai1-zone").innerHTML += hiddenCard(table.players[0].hand);
    document.querySelector(".ai2-zone").innerHTML += hiddenCard(table.players[1].hand);
    document.querySelector(".ai3-zone").innerHTML += hiddenCard(table.players[2].hand);
    document.querySelector(".ai4-zone").innerHTML += hiddenCard(table.players[3].hand);
    document.querySelector(".user-zone").innerHTML += card(table.players[4].hand);
};

export const afterBet = (table: Table) => {
    document.querySelector(".bet-container").className += " none";
    document.querySelector("#task-display").innerHTML = "Task : Select Action";
    initGame(table);
    setAllHands(table);
    document.querySelector(".action-container").className = "action-container";
};
