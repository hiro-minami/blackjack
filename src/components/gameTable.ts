import { card, hiddenCard } from "./parts/card";
import { betZone } from "./parts/betZone";
import { actionZone } from "./parts/actionZone";

export const gameTable: string = `
<div class="table">
    <div class="house-container flex-direction-column">
        <div class="house-zone flex-direction-column">
            <span class="texts">dealer</span>
            ${hiddenCard()}
        </div>
    </div>
    <div class="ai-container top">
        <div class="ai1-zone flex-direction-column">
            <span class="texts">ai1</span>
            ${hiddenCard()}
        </div>
        <div class="ai2-zone flex-direction-column">
            <span class="texts">ai2</span>
            ${hiddenCard()}
        </div>
    </div>
    <div class="ai-container tail">
        <div class="ai3-zone flex-direction-column">
            <span class="texts">ai3</span>
            ${hiddenCard()}
        </div>
        <div class="ai4-zone flex-direction-column">
            <span class="texts">ai4</span>
            ${hiddenCard()}
        </div>
    </div>
    <div class="user-container flex-direction-column">
        <div class="user-zone flex-direction-column">
            <span class="texts">user</span>
            ${card()}
        </div>
    </div>
</div>
${betZone()}
`;

// <button type="button" id="toggleButton" class="input-child">反転</button>
