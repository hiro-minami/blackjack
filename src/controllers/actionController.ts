import Table from "../class/table";
import { AbstractBlackjackPlayer, AbstractPlayer, House } from "../class/player";
import { cardZone, hiddenCardZone } from "../components/parts/card";
import { battleWithHouse } from "./gameController";

// surrenderした時の動きを記載する
export const surrender = (player: AbstractBlackjackPlayer, table: Table) => {
    player.decision = "surrender";
    if (player.playerType === "user") {
        aiAction(table);
    }
};

// standした時の動きを記載する
export const stand = (player: AbstractBlackjackPlayer, table: Table) => {
    player.decision = "stand";
    if (player.playerType === "user") aiAction(table);
};

// HITした時の動きを記載する
export const hit = (player: AbstractBlackjackPlayer, table: Table) => {
    player.hand.push(table.deck.drawOne());
    if (player.playerType === "ai") {
        document.querySelector(`#${player.name}-hand-zone`).innerHTML += hiddenCardZone(player.hand[player.hand.length - 1]);
    } else {
        document.querySelector(`#hand-zone`).innerHTML += cardZone(player.hand[player.hand.length - 1]);
    }
    if (player.getHandScore() > 21) player.status = "bust";
    if (player.status === "bust" && player.playerType === "user") aiAction(table);
};

// ハウスの動きを記載する
export const drawForHouse = (house: House, table: Table) => {
    house.hand.push(table.deck.drawOne());
    document.querySelector("#house-hand-zone").innerHTML += cardZone(house.hand[house.hand.length - 1]);
};

// doubleした時の動きを記載する
export const double = (player: AbstractBlackjackPlayer, table: Table) => {
    if (player.hand.length != 2) return false;

    // bet額を倍にする
    player.bet *= 2;
    // カードをドローする
    player.hand.push(table.deck.drawOne());
    if (player.playerType === "ai") {
        document.querySelector(`#${player.name}-hand-zone`).innerHTML += hiddenCardZone(player.hand[player.hand.length - 1]);
    } else {
        document.querySelector(`#hand-zone`).innerHTML += cardZone(player.hand[player.hand.length - 1]);
    }
    if (player.getHandScore() > 21) player.status = "bust";
    if (player.status === "bust" && player.playerType === "user") aiAction(table);
};

export const aiAction = (table: Table) => {
    // aiユーザー分繰り返し
    for (let i = 0; i < 4; i++) {
        // actionをとるユーザーを定義
        const currentPlayer = table.players[i];
        // actionが終わるまで繰り返し
        while (!currentPlayer.status) {
            if (currentPlayer.decision !== "surrender" && currentPlayer.decision !== "stand") {
                if (currentPlayer.getHandScore() < 18 && currentPlayer.hand.length == 2) {
                    currentPlayer.decision = "double";
                    double(currentPlayer, table);
                } else if (currentPlayer.getHandScore() < 18) {
                    currentPlayer.decision = "hit";
                    hit(currentPlayer, table);
                } else if (currentPlayer.getHandScore() >= 18 && currentPlayer.getHandScore() <= 21) currentPlayer.decision = "stand";
                else if (currentPlayer.getHandScore() > 21) currentPlayer.status = "bust";
                else currentPlayer.decision = "stand";
            }
            // statusを確認する
            if (currentPlayer.decision === "stand") currentPlayer.status = "stand";
        }
        console.log(currentPlayer);
    }
    // 次のフェーズへ進む
    battleWithHouse(table);
};
