import Table from "../class/table";
import { card, hiddenCard } from "./parts/card";
import { betZone } from "./parts/betZone";
import { actionZone } from "./parts/actionZone";

export const gameTable = (table: Table) => {
    return `
    <div class="table">
        <div class="house-container flex-direction-column">
            <div class="house-zone flex-direction-column">
                <span class="texts">dealer</span>
            </div>
        </div>
        <div class="ai-container top">
            <div class="ai1-zone flex-direction-column">
                <span class="texts">${table.players[0].name}</span>
            </div>
            <div class="flex-direction-column">
                <div id="turn-counter" class="texts-phase">Turn : ${table.gameCounter}</div>
                <div id="task-display" class="texts-phase">Task : Decide on a bet</div>
            </div>
            <div class="ai2-zone flex-direction-column">
                <span class="texts">${table.players[1].name}</span>
            </div>
        </div>
        <div class="ai-container tail">
            <div class="ai3-zone flex-direction-column">
                <span class="texts">${table.players[2].name}</span>
            </div>
            <div class="ai4-zone flex-direction-column">
                <span class="texts">${table.players[3].name}</span>
            </div>
        </div>
        <div class="user-container flex-direction-column">
            <div class="user-zone flex-direction-column">
                <span class="texts">${table.players[4].name}</span>
            </div>
        </div>
    </div>
    ${betZone()}
    ${actionZone()}
    `;
};

// <button type="button" id="toggleButton" class="input-child">反転</button>
