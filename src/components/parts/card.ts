import Card from "../../class/card";

export const card = (cards: Card[]) => {
    return `
    <div class="hands justify-contents-center">
        <div class="card flex-direction-column">
            <span class="card-texts">${cards[0].suit}</span>
            <span class="card-texts">${cards[0].rank}</span>
        </div>
        <div class="card flex-direction-column">
            <span class="card-texts-red">${cards[1].suit}</span>
            <span class="card-texts-red">${cards[1].rank}</span>
        </div>
    </div>`;
};

export const hiddenCard = (cards: Card[]) => {
    return `
    <div class="hands justify-contents-center">
        <div class="card flex-direction-column">
            <span class="card-texts-hidden">${cards[0].suit}</span>
            <span class="card-texts-hidden">${cards[0].rank}</span>
        </div>
        <div class="card flex-direction-column">
            <span class="card-texts-hidden">${cards[1].suit}</span>
            <span class="card-texts-hidden">${cards[1].rank}</span>
        </div>
    </div>`;
};
