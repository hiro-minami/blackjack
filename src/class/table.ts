import Card from "./card";
import Deck from "./deck";
import { House, AiPlayer, AbstractBlackjackPlayer, AbstractPlayer } from "./player";
import { GamePhase, GameType, GameResult } from "../types/index";
import RandomHelper from "./randomHelper";

export default class Table {
    public betDenominations: number[] = [10, 20, 50, 100];
    public gameType: GameType;
    public deck: Deck;
    public players: AbstractBlackjackPlayer[];
    public house: House;
    public turnCounter: number = 0;
    public gamePhase: GamePhase;
    public resultsLog: string[];
    public gameResult: GameResult[];
    public resultRank: AbstractBlackjackPlayer[];
    constructor(gameType: GameType) {
        this.gameType = gameType;
        this.deck = new Deck(this.gameType);
        this.players = [new AiPlayer("ai1"), new AiPlayer("ai2"), new AiPlayer("ai3")];
        this.house = new House("house");
        this.gamePhase = "betting";
        this.resultRank = [];
    }
    public startBlackjack(playerName: string, playerAmount: number, bet: number) {
        let count = 0;
        while (this.gamePhase != "gameOver") {
            console.log("#################################");
            // 掛け金を求める
            this.selectBet();
            // デッキを作り、シャッフルする
            this.deck = new Deck();
            this.deck.shuffle();
            // デッキからカードを2枚どろーする
            this.blackjackAssignPlayerHands();
            // 各プレイヤーの動作を決める
            this.action();
            // ハウスと勝負
            this.battleAndPayoff();
            // ログを出力
            this.outputLogs(count);
            // 脱落者の確認
            this.checkForDropout();
            // クリーンアウト
            this.blackjackClearPlayerHandsAndBets();
            if (this.players.length <= 1) this.gamePhase = "gameOver";
            if (count > 1000) this.gamePhase = "gameOver";
            count++;
        }
        if (this.players.length === 1) console.log(`First: ${this.players[0].name}, Second: ${this.resultRank[0].name}, Third: ${this.resultRank[1].name}`);
        else console.log(`First: ${this.resultRank[0].name}, Second: ${this.resultRank[1].name}, Third: ${this.resultRank[2].name}`);
    }
    private selectBet() {
        this.players.forEach((player: AbstractBlackjackPlayer) => {
            const num: number = RandomHelper.selectRandom(0, 3);
            player.bet = this.betDenominations[+num];
        });
    }
    private blackjackAssignPlayerHands(): void {
        this.players.forEach((player: AbstractBlackjackPlayer) => {
            this.draw(player);
        });
        this.draw(this.house);
    }
    private action() {
        this.gamePhase = "acting";
        while (this.gamePhase === "acting") {
            const currentPlayer = this.getTurnPlayer();
            if ((currentPlayer.playerType === "ai" && currentPlayer.decision !== "surrender") || currentPlayer.decision !== "stand") {
                if (currentPlayer.getHandScore() < 15) {
                    currentPlayer.decision = "hit";
                    currentPlayer.hand.push(this.deck.drawOne());
                } else if (currentPlayer.getHandScore() >= 15 && currentPlayer.getHandScore() <= 21) currentPlayer.decision = "stand";
                else if (currentPlayer.getHandScore() > 21) currentPlayer.decision = "surrender";
                else currentPlayer.decision = "stand";
            }
            this.turnCounter++;
            if (this.players.filter((player) => player.decision === "stand" || player.decision === "surrender").length == this.players.length) this.gamePhase = "evaluatingWinners";
        }
    }
    private battleAndPayoff() {
        // houseの状態を確認
        while (this.house.status !== "stand" && this.house.status !== "surrender") {
            const houseScore = this.house.getHandScore();
            if (houseScore >= 17 && houseScore <= 21) this.house.status = "stand";
            else if (houseScore > 21) this.house.status = "surrender";
            else {
                this.house.status = "bet";
                this.house.hand.push(this.deck.drawOne());
            }
        }
        const result: string[] = this.battleWithHouse();
        this.payoff(result);
    }
    private checkForDropout() {
        this.resultRank.unshift(...this.players.filter((player: AbstractBlackjackPlayer) => player.chips <= 0));
        this.players = this.players.filter((player: AbstractBlackjackPlayer) => player.chips > 0);
    }
    private blackjackClearPlayerHandsAndBets(): void {
        this.players.forEach((player: AiPlayer) => {
            player.hand = [];
            player.bet = 0;
        });
        this.house.hand = [];
        this.turnCounter = 0;
        this.players.forEach((player: AbstractBlackjackPlayer) => (player.decision = "bet"));
        this.house.status = "bet";
    }
    private outputLogs(count: number) {
        console.log(`Round ${count + 1}`);
        this.players.forEach((player: AbstractBlackjackPlayer) => {
            console.log(`name:${player.name}, action:${player.decision}, bet:${player.bet}, chip:${player.chips}`);
        });
    }
    private draw(player: AbstractPlayer): void {
        player.hand.push(this.deck.drawOne());
        player.hand.push(this.deck.drawOne());
    }
    private getTurnPlayer(): AbstractBlackjackPlayer {
        return this.players[this.turnCounter % this.players.length];
    }
    private battleWithHouse() {
        let resultList: string[] = [];
        // ハウスの手札を確認する
        if (this.house.status === "surrender") {
            this.players.forEach(() => resultList.push("win"));
        } else {
            const house = this.house.getHandScore();
            this.players.forEach((player: AbstractBlackjackPlayer) => {
                if (player.decision === "stand" && player.getHandScore() > house) resultList.push("win");
                else resultList.push("lose");
            });
        }

        return resultList;
    }
    private payoff(resultList: string[]): void {
        resultList.forEach((result: string, index: number) => {
            if (result === "win") this.players[index].chips += this.players[index].bet;
            else if (this.players[index].decision === "surrender") this.players[index].chips -= Math.floor(this.players[index].bet / 2);
            else this.players[index].chips -= this.players[index].bet;
        });
    }
}
