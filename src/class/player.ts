import Card from "./card";
import { Action, PlayerType, PlayerStatus } from "../types/index";

export interface AbstractPlayer {
    name: string;
    playerType: PlayerType;
    hand: Card[];
    getHandScore(): number;
    isBlackjack(): boolean;
}

export interface AbstractBlackjackPlayer extends AbstractPlayer {
    chips: number;
    bet: number;
    status: PlayerStatus;
    decision: Action;
}

export class House implements AbstractPlayer {
    public name: string;
    public playerType: PlayerType = "house";
    public hand: Card[];
    public status: Action;
    constructor(name: string) {
        this.name = name;
        this.hand = [];
    }
    public getHandScore(): number {
        return this.hand.reduce((total: number, n: Card) => total + n.getRankNumber(), 0);
    }
    public isBlackjack(): boolean {
        const rank = "JQK";
        return false;
    }
}

export class AiPlayer implements AbstractBlackjackPlayer {
    public name: string;
    public playerType: PlayerType = "ai";
    public chips: number;
    public hand: Card[];
    public bet: number = 0;
    public status: PlayerStatus;
    public decision: Action;
    constructor(name: string, chips: number = 100) {
        this.name = name;
        this.chips = chips;
        this.hand = [];
    }
    public getHandScore(): number {
        return this.hand.reduce((total: number, n: Card) => total + n.getRankNumber(), 0);
    }
    public isBlackjack(): boolean {
        const rank = "JQK";
        return false;
    }
}

export class User implements AbstractBlackjackPlayer {
    public name: string;
    public playerType: PlayerType = "user";
    public chips: number;
    public hand: Card[];
    public bet: number;
    public status: PlayerStatus;
    public decision: Action;
    constructor(name: string, chips: number = 400) {
        this.name = name;
        this.chips = chips;
        this.hand = [];
    }
    public getHandScore(): number {
        return this.hand.reduce((total: number, n: Card) => total + n.getRankNumber(), 0);
    }
    public isBlackjack(): boolean {
        const rank = "JQK";
        return false;
    }
}
