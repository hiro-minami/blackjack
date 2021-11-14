import Card from "./card";
import Deck from "./deck";
import { Action, PlayerType, GameType, PlayerStatus, GamePhase, GameDecision } from "../types/index";

export interface AbstractPlayer {
    name: string;
    playerType: PlayerType;
    hand: Card[];
    status: PlayerStatus;
    bet: number;
    chips: number;
    gamePhase: GamePhase;
    gameDecision: Action;
    getHandScore(): number;
    //isBlackjack(): boolean;
}

export class AiPlayer implements AbstractPlayer {
    public name: string;
    public playerType: PlayerType = "ai";
    public gameType: GameType;
    public chips: number;
    public hand: Card[];
    public bet: number = 0;
    public status: PlayerStatus;
    public gamePhase: GamePhase;
    public gameDecision: Action;
    constructor(name: string, gameType?: GameType, chips: number = 100) {
        this.name = name;
        this.gameType = gameType;
        this.chips = chips;
        this.hand = [];
    }

    public promptPlayer(): GameDecision {
        return {
            action: "bet",
            amount: 2,
        };
    }

    public winAmount(): number {
        return 0;
    }

    public getHandScore(): number {
        return this.hand.reduce((total: number, n: Card) => total + n.getRankNumber(), 0);
    }
}

export class User implements AbstractPlayer {
    public name: string;
    public playerType: PlayerType = "user";
    public gameType: GameType;
    public chips: number;
    public hand: Card[];
    public bet: number;
    public status: PlayerStatus;
    public gamePhase: GamePhase;
    public gameDecision: Action;
    constructor(name: string, gameType?: GameType, chips: number = 400) {
        this.name = name;
        this.gameType = gameType;
        this.chips = chips;
        this.hand = [];
    }

    public promptPlayer(): GameDecision {
        return {
            action: "bet",
            amount: 2,
        };
    }

    public winAmount(): number {
        return 0;
    }

    public getHandScore(): number {
        return this.hand.reduce((total: number, n: Card) => total + n.getRankNumber(), 0);
    }
}

export class House implements AbstractPlayer {
    public name: string;
    public playerType: PlayerType = "house";
    public hand: Card[];
    public chips: number;
    public status: PlayerStatus;
    public gamePhase: GamePhase;
    public bet: number;
    public gameDecision: Action = "hit";
    constructor(name: string) {
        this.name = name;
        this.hand = [];
    }

    public getHandScore(): number {
        return this.hand.reduce((total: number, n: Card) => total + n.getRankNumber(), 0);
    }
}
