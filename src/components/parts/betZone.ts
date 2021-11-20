export const betZone = () => {
    let counterList = [0, 0, 0, 0];
    return `
    <div class="bet-container flex-direction-column">
        <div class="bet-section justify-contents-center">
            <div class="flex-direction-column">
                <div class="coin center">5</div>
                <div class="bet-zone justify-contents-center">
                    <button type="button" class="minus-button center">-</button>
                    <div class="amount-disp center">${counterList[0]}</div>
                    <button type="button" class="plus-button center">+</button>
                </div>
            </div>
            <div class="flex-direction-column">
                <div class="coin center">10</div>
                <div class="bet-zone justify-contents-center">
                    <button type="button" class="minus-button center">-</button>
                    <div class="amount-disp center">${counterList[1]}</div>
                    <button type="button" class="plus-button center">+</button>
                </div>
            </div>
            <div class="flex-direction-column">
                <div class="coin center">20</div>
                <div class="bet-zone justify-contents-center">
                    <button type="button" class="minus-button center">-</button>
                    <div class="amount-disp center">${counterList[2]}</div>
                    <button type="button" class="plus-button center">+</button>
                </div>
            </div>
            <div class="flex-direction-column">
                <div class="coin center">50</div>
                <div class="bet-zone justify-contents-center">
                    <button type="button" class="minus-button center">-</button>
                    <div class="amount-disp center">${counterList[3]}</div>
                    <button type="button" class="plus-button center">+</button>
                </div>
            </div>
        </div>
        <button id="betButton" class="game-button">Bet!</button>
    </div>`;
};
