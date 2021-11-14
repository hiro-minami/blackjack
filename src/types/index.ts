// use for GameDecision class
export type Action = "bet" | "surrender" | "stand" | "hit" | "double";

// use for Player class
export type PlayerType = "ai" | "house" | "user";
export type PlayerStatus = "broken" | "bust" | "stand" | "surrender";
export type GamePhase = "betting" | "acting" | "evaluatingWinners" | "gameOver";

// use for Table class
export type GameType = "blackjack" | "poker";
export type GameResult = "blackjack" | "win" | "lose" | "surrender";

export type GameDecision = {
    action: Action;
    amount: number;
};
