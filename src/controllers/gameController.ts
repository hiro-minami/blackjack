import { AbstractBlackjackPlayer, AbstractPlayer, House } from "../class/player";
import Table from "../class/table";
import { drawForHouse } from "./actionController";

export const battleWithHouse = (table: Table) => {
    // 次のフェーズへ進む
    table.gamePhase = "evaluatingWinners";
    document.querySelector("#task-display").innerHTML = "Battle With House";
    document.querySelector(".action-container").className = "action-container none";

    // HouseとAiの手札を公開
    battle(table);

    table.outputLogs(1);

    table.checkForDropout();

    // table.resultRank.forEach((dropPlayer: AbstractBlackjackPlayer) => {
    //     document.querySelector(`.${dropPlayer.name}-zone`).innerHTML = "";
    // });

    document.querySelector("#aftergame-zone").className = "action-container";
};

export const battle = (table: Table) => {
    const cards = document.querySelectorAll(".card-texts-hidden");
    cards.forEach((card: HTMLElement) => {
        card.className = "card-texts";
    });
    table.battleAndPayoff();
};
