import Card from "./card";

export default class Deck {
    public cards: Card[];
    constructor(gameType?: string) {
        this.cards = this.resetDeck();
    }
    public shuffle() {
        for (let i = 0; i < this.cards.length; i++) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            const temp = this.cards[randomIndex];
            this.cards[randomIndex] = this.cards[i];
            this.cards[i] = temp;
        }
    }
    public resetDeck(): Card[] {
        let cards: Card[] = [];
        const suits = ["♣︎", "♠︎", "♦︎", "❤︎"];
        const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                cards.push(new Card(suits[i], ranks[j]));
            }
        }
        return cards;
    }
    public drawOne(): Card {
        return this.cards.pop();
    }
}
