import Deck from "../class/deck";
import { AbstractBlackjackPlayer, User } from "../class/player";
import Table from "../class/table";
import { hiddenCard, card, cardZone, hiddenCardZone } from "../components/parts/card";

// ユーザーを追加
export const initGame = (table: Table, name: string) => {
    table.players.push(new User(name));
};

// カードをセットする
export const setCards = (table: Table) => {
    table.deck = new Deck();
    table.deck.shuffle();
    table.blackjackAssignPlayerHands();
};

// actionを選択する
export const selectAction = (table: Table) => {
    table.action();
};

// 全員の手札を作成する
export const setAllHands = (table: Table) => {
    document.querySelector(".house-zone").innerHTML += hiddenCard(table.house.hand, table.house);
    document.querySelector(".Raoh-zone").innerHTML += hiddenCard(table.players[0].hand, table.players[0]);
    document.querySelector(".Toki-zone").innerHTML += hiddenCard(table.players[1].hand, table.players[1]);
    document.querySelector(".Jagi-zone").innerHTML += hiddenCard(table.players[2].hand, table.players[2]);
    document.querySelector(".Kenshiro-zone").innerHTML += hiddenCard(table.players[3].hand, table.players[3]);
    document.querySelector(`.${table.players[table.players.length - 1].name}-zone`).innerHTML += card(table.players[4].hand);
};

// Betした後の動きを定義する
export const afterBet = (table: Table) => {
    // ユーザーのbet額を表示
    const bet = document.querySelector("#user-bet").innerHTML;
    if (+bet <= 0) return false;
    // bet額を作成
    table.selectBet(+bet);
    // カードをセット
    setCards(table);
    // ユーザーたちのベット額を表示するための処理
    document.querySelectorAll(".bet-disp").forEach((betZone: HTMLElement) => {
        betZone.className = "bet-disp";
        const index = betZone.getAttribute("data-index");
        betZone.innerHTML = `
        <div class="justify-contents-center">
            <div class="justify-contents-center bet-value">
                <span class="bet-texts bet-number">bet: </span>
                <span class="bet-texts bet-number" id="user-bet">${table.players[+index].bet}</span>
            </div>
            <div class="justify-contents-center chip-value">
                <span class="bet-texts chip-number">chip: </span>
                <span class="bet-texts chip-number" id="user-chip">${table.players[+index].chips}</span>
            </div>
        </div>
        `;
    });

    document.querySelector(".bet-container").className += " none";
    document.querySelector("#task-display").innerHTML = "Task : Select Action";
    setAllHands(table);
    document.querySelector(".action-container").className = "action-container";
    table.gamePhase = "acting";
};
