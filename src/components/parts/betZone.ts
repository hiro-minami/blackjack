import { User } from "../../class/player";

export const betZone = (user: User) => {
    return `
    <div class="bet-container flex-direction-column">
        <div class="justify-contents-center">
            <div class="justify-contents-center bet-value">
                <span class="bet-texts bet-number">bet: </span>
                <span class="bet-texts bet-number" id="user-bet">${user.bet}</span>
            </div>
            <div class="justify-contents-center chip-value">
                <span class="bet-texts chip-number">chip: </span>
                <span class="bet-texts chip-number" id="user-chip">${user.chips}</span>
            </div>
        </div>
        <div class="bet-section justify-contents-center">
            <div class="flex-direction-column">
                <div class="coin center">5</div>
                <div class="bet-zone justify-contents-center">
                    <button type="button" class="minus-button center" data-value="5">-</button>
                    <div class="amount-disp center" id="bet-5">0</div>
                    <button type="button" class="plus-button center" data-value="5">+</button>
                </div>
            </div>
            <div class="flex-direction-column">
                <div class="coin center">20</div>
                <div class="bet-zone justify-contents-center">
                    <button type="button" class="minus-button center" data-value="20">-</button>
                    <div class="amount-disp center" id="bet-20">0</div>
                    <button type="button" class="plus-button center" data-value="20">+</button>
                </div>
            </div>
            <div class="flex-direction-column">
                <div class="coin center">50</div>
                <div class="bet-zone justify-contents-center">
                    <button type="button" class="minus-button center" data-value="50">-</button>
                    <div class="amount-disp center" id="bet-50">0</div>
                    <button type="button" class="plus-button center" data-value="50">+</button>
                </div>
            </div>
            <div class="flex-direction-column">
                <div class="coin center">100</div>
                <div class="bet-zone justify-contents-center">
                    <button type="button" class="minus-button center" data-value="100">-</button>
                    <div class="amount-disp center" id="bet-100">0</div>
                    <button type="button" class="plus-button center" data-value="100">+</button>
                </div>
            </div>
        </div>
        <button id="betButton" class="game-button">Bet!</button>
    </div>`;
};
