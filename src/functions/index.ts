import Deck from "../class/deck";
import { AbstractBlackjackPlayer, AbstractPlayer, User } from "../class/player";
import Table from "../class/table";
import { hiddenCard, card } from "../components/parts/card";

// ゲーム開始
export const startGame = (table: Table) => {
    table.startBlackjack("ai");
};

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
    document.querySelector(".house-zone").innerHTML += hiddenCard(table.house.hand);
    document.querySelector(".Raoh-zone").innerHTML += hiddenCard(table.players[0].hand);
    document.querySelector(".Toki-zone").innerHTML += hiddenCard(table.players[1].hand);
    document.querySelector(".Jagi-zone").innerHTML += hiddenCard(table.players[2].hand);
    document.querySelector(".Kenshiro-zone").innerHTML += hiddenCard(table.players[3].hand);
    document.querySelector(`.${table.players[table.players.length - 1].name}-zone`).innerHTML += card(table.players[4].hand);
};

// HITした時の動きを記載する
export const hit = (player: AbstractPlayer, table: Table) => {
    if (player.playerType === "ai") document.querySelector(`.${player.name}-zone`).innerHTML += hiddenCard([table.deck.drawOne()]);
    else document.querySelector(`.${player.name}-zone`).innerHTML += card([table.deck.drawOne()]);
};

// クリックするまで待つ
const WaitForClick = () => new Promise((resolve) => document.querySelector("#surrenderButton").addEventListener("click", resolve));

async function WaitSample() {
    console.log("クリック待ち開始。");
    await WaitForClick();
    console.log("この行は、クリックされた後に実行されます。");
}

// Betした後の動きを定義する
export const afterBet = (table: Table) => {
    // ユーザーのbet額を表示
    const bet = document.querySelector("#user-bet").innerHTML;
    // bet額を作成
    table.selectBet(+bet);
    // カードをセット
    setCards(table);
    // ユーザーたちのベット額を表示するための処理
    document.querySelectorAll(".bet-disp").forEach((betZone: HTMLElement) => {
        betZone.className = "bet-disp";
        const index = betZone.getAttribute("data-index");
        betZone.innerHTML = `<span class="bet-texts bet-number" >bet: ${table.players[+index].bet}<span class="bet-texts chip-number"> chip: ${table.players[+index].chips}</span></span> `;
    });

    document.querySelector(".bet-container").className += " none";
    document.querySelector("#task-display").innerHTML = "Task : Select Action";
    setAllHands(table);
    document.querySelector(".action-container").className = "action-container";
    table.gamePhase = "acting";
    while (table.gamePhase === "acting") {
        const currentPlayer = table.getTurnPlayer();
        console.log(currentPlayer);
        if (currentPlayer.playerType === "ai") {
            if (currentPlayer.decision !== "surrender" && currentPlayer.decision !== "stand") {
                if (currentPlayer.getHandScore() < 15) {
                    currentPlayer.decision = "hit";
                    currentPlayer.hand.push(table.deck.drawOne());
                } else if (currentPlayer.getHandScore() >= 15 && currentPlayer.getHandScore() <= 21) currentPlayer.decision = "stand";
                else if (currentPlayer.getHandScore() > 21) currentPlayer.decision = "surrender";
                else currentPlayer.decision = "stand";
            }
        } else {
            WaitSample();
        }
        console.log(currentPlayer.decision);
        table.turnCounter++;
        if (table.turnCounter > 10) table.gamePhase = "evaluatingWinners";
        if (table.players.filter((player) => player.decision === "stand" || player.decision === "surrender").length == table.players.length) table.gamePhase = "evaluatingWinners";
    }
};

// ＋ボタンを押下したらベット額を増やす
export const add = (value: number) => {
    let bet = document.querySelector("#user-bet").innerHTML;
    let chip = document.querySelector("#user-chip").innerHTML;
    let target = document.querySelector(`#bet-${value}`);
    if (+bet + +value <= +chip) {
        target.innerHTML = (+target.innerHTML + 1).toString();
        document.querySelector("#user-bet").innerHTML = (+bet + +value).toString();
    }
};

// -ボタンを押下したらベット額を減らす
export const minus = (value: number) => {
    let bet = document.querySelector("#user-bet").innerHTML;
    let target = document.querySelector(`#bet-${value}`);
    if (+target.innerHTML > 0) {
        document.querySelector("#user-bet").innerHTML = (+bet - +value).toString();
        target.innerHTML = (+target.innerHTML - 1).toString();
    } else {
        target.innerHTML = "0";
    }
};
