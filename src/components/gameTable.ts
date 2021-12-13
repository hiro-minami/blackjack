import Table from "../class/table";
import { card, hiddenCard } from "./parts/card";
import { betZone } from "./parts/betZone";
import { actionZone } from "./parts/actionZone";
import { afterGamaZone } from "./parts/afterGameZone";
import { AbstractBlackjackPlayer } from "../class/player";

export const gameTable = (table: Table) => {
    table.players.forEach((player: AbstractBlackjackPlayer) => {
        player.bet = 0;
    });
    return `
    <div class="table">
        <div class="house-container flex-direction-column">
            <div class="house-zone flex-direction-column">
                <span class="texts">House</span>
            </div>
        </div>
        <div class="ai-container top">
            <div class="Raoh-zone flex-direction-column">
                <div class="bet-disp none" data-index="0">
                    <span class="bet-texts bet-number" >bet: <span class="bet-texts chip-number">chip: </span></span> 
                </div>
                <span class="texts">${table.players[0].name}</span>
            </div>
            <div class="flex-direction-column">
                <div id="turn-counter" class="texts-phase">Turn : ${table.gameCounter}</div>
                <div id="task-display" class="texts-phase">Task : Decide on a bet</div>
            </div>
            <div class="Toki-zone flex-direction-column">
                <div class="bet-disp none" data-index="1">
                    <span class="bet-texts bet-number" data-index="1">bet: <span class="bet-texts chip-number" data-index="1">chip: </span></span> 
                </div>
                <span class="texts">${table.players[1].name}</span>
            </div>
        </div>
        <div class="ai-container tail">
            <div class="Jagi-zone flex-direction-column">
                <div class="bet-disp none" data-index="2">
                    <span class="bet-texts bet-number" data-index="2">bet: <span class="bet-texts chip-number" data-index="2">chip: </span></span> 
                </div>
                <span class="texts">${table.players[2].name}</span>
            </div>
            <div class="Kenshiro-zone flex-direction-column">
                <div class="bet-disp none" data-index="3">
                    <span class="bet-texts bet-number" data-index="3">bet: <span class="bet-texts chip-number" data-index="3">chip: </span></span> 
                </div>
                <span class="texts">${table.players[3].name}</span>
            </div>
        </div>
        <div class="user-container flex-direction-column">
            <div class="${table.players[table.players.length - 1].name}-zone flex-direction-column">
                <div class="bet-disp none" data-index="4">
                    <span class="bet-texts bet-number" data-index="4">bet: <span class="bet-texts chip-number" data-index="4">chip: </span></span> 
                </div>
                <span class="texts">${table.players[table.players.length - 1].name}</span>
            </div>
        </div>
    </div>
    ${betZone(table.players[table.players.length - 1])}
    ${actionZone()}
    ${afterGamaZone()}`;
};
