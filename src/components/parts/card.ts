import Card from "../../class/card";
import { AbstractBlackjackPlayer, AbstractPlayer } from "../../class/player";

export const cardZone = (card: Card) => {
    const cardClass = card.suit === "♠︎" || card.suit === "♣︎" ? "card-texts" : "card-texts-red";
    return `
    <div class="card flex-direction-column">
        <span class="${cardClass}">${card.suit}</span>
        <span class="${cardClass}">${card.rank}</span>
    </div>
    `;
};

export const card = (cards: Card[]) => {
    return `
    <div class="hands justify-contents-center" id="hand-zone">
        ${cardZone(cards[0])}
        ${cardZone(cards[1])}
    </div>`;
};

export const hiddenCardZone = (card: Card) => {
    return `
    <div class="card flex-direction-column">
        <span class="card-texts-hidden">${card.suit}</span>
        <span class="card-texts-hidden">${card.rank}</span>
    </div>
    `;
};

export const hiddenCard = (cards: Card[], person: AbstractPlayer) => {
    return `
    <div class="hands justify-contents-center" id="${person.name}-hand-zone">
        ${hiddenCardZone(cards[0])}
        ${hiddenCardZone(cards[1])}
    </div>`;
};
