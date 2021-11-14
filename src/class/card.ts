export default class Card {
    public suit: string;
    public rank: string;
    constructor(suit: string, rank: string) {
        this.suit = suit;
        this.rank = rank;
    }
    public getRankNumber(): number {
        const rank = this.getRank(this.rank);
        if (this.isNumber(rank)) return +rank;
        return rank !== "A" ? 10 : 11;
    }
    private getRank(hand: string): string {
        return hand.replace(/[^0-9JQKA]/g, "");
    }
    private isNumber(hand: string): boolean {
        return hand.replace(/[0-9]/g, "").length === 0;
    }
}
