import Card from "./card";
import Deck from "./deck";
import { AbstractPlayer, AiPlayer, House } from "./player";
import { GamePhase, GameType, GameDecision, GameResult } from "../types/index";
import RandomHelper from "./randomHelper";

export default class Table {
    public betDenominations: number[] = [10, 20, 50, 100];
    public gameType: GameType;
    public deck: Deck;
    public players: AbstractPlayer[];
    public house: House;
    public turnCounter: number = 0;
    public gamePhase: GamePhase;
    public resultsLog: string[];
    public gameResult: GameResult[];
    public resultRank: AbstractPlayer[];
    constructor(gameType: GameType) {
        this.gameType = gameType;
        this.deck = new Deck(this.gameType);
        this.players = [new AiPlayer("ai1", this.gameType), new AiPlayer("ai2", this.gameType), new AiPlayer("ai3", this.gameType)];
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
            // this.players.forEach((player: AbstractPlayer) => {
            //     console.table(player.hand);
            // });
            // console.table(this.house.hand);

            // 各プレイヤーの動作を決める
            this.action();
            // this.players.forEach((player: AbstractPlayer) => {
            //     console.log(`${player.name}'s hand :  ${player.getHandScore()}`);
            // });

            // ハウスと勝負
            this.battleAndPayoff();
            // this.players.forEach((player: AbstractPlayer) => {
            //     console.log(`${player.name}'s chips: ${player.chips}`);
            // });

            // // 脱落者の確認
            this.checkForDropout();

            if (this.players.length <= 1) this.gamePhase = "gameOver";
            if (count > 1000) this.gamePhase = "gameOver";

            this.outputLogs(count);

            // 最後にクリーンアウト
            this.blackjackClearPlayerHandsAndBets();
            count++;
        }
        if (this.players.length === 1) console.log(`First: ${this.players[0].name}, Second: ${this.resultRank[0].name}, Third: ${this.resultRank[1].name}`);
        else console.log(`First: ${this.resultRank[0].name}, Second: ${this.resultRank[1].name}, Third: ${this.resultRank[2].name}`);
    }
    private selectBet() {
        this.players.forEach((player: AbstractPlayer) => {
            const num: number = RandomHelper.selectRandom(0, 3);
            player.bet = this.betDenominations[+num];
            // console.log(`${player.name} bet ${player.bet}`);
        });
    }
    private blackjackAssignPlayerHands(): void {
        this.players.forEach((player: AbstractPlayer) => {
            this.draw(player);
        });
        this.draw(this.house);
    }
    private action() {
        this.gamePhase = "acting";
        while (this.gamePhase === "acting") {
            const currentPlayer = this.getTurnPlayer();
            if ((currentPlayer.playerType === "ai" && currentPlayer.gameDecision !== "surrender") || currentPlayer.gameDecision !== "stand") {
                if (currentPlayer.getHandScore() < 15) {
                    currentPlayer.gameDecision = "hit";
                    currentPlayer.hand.push(this.deck.drawOne());
                } else if (currentPlayer.getHandScore() >= 15 && currentPlayer.getHandScore() <= 21) currentPlayer.gameDecision = "stand";
                else if (currentPlayer.getHandScore() > 21) currentPlayer.gameDecision = "surrender";
                else currentPlayer.gameDecision = "stand";
            }
            this.turnCounter++;
            if (this.players.filter((player) => player.gameDecision === "stand" || player.gameDecision === "surrender").length == this.players.length) this.gamePhase = "evaluatingWinners";
        }
    }
    private battleAndPayoff() {
        // houseの状態を確認
        while (this.house.gameDecision !== "stand" && this.house.gameDecision !== "surrender") {
            const houseScore = this.house.getHandScore();
            if (houseScore >= 17 && houseScore <= 21) this.house.gameDecision = "stand";
            else if (houseScore > 21) this.house.gameDecision = "surrender";
            else {
                this.house.gameDecision = "bet";
                this.house.hand.push(this.deck.drawOne());
            }
        }
        // console.log(`house's hand : ${this.house.getHandScore()}`);
        // battle
        const result: string[] = this.battleWithHouse();
        // payoff
        this.payoff(result);
    }
    private checkForDropout() {
        this.resultRank.unshift(...this.players.filter((player: AbstractPlayer) => player.chips <= 0));
        this.players = this.players.filter((player: AbstractPlayer) => player.chips > 0);
    }
    private blackjackClearPlayerHandsAndBets(): void {
        this.players.forEach((player: AiPlayer) => {
            player.hand = [];
            player.bet = 0;
        });
        this.house.hand = [];
        this.turnCounter = 0;
        this.players.forEach((player: AbstractPlayer) => (player.gameDecision = "bet"));
        this.house.gameDecision = "bet";
    }
    private outputLogs(count: number) {
        console.log(`Round ${count + 1}`);
        this.players.forEach((player: AbstractPlayer) => {
            console.log(`name:${player.name}, action:${player.gameDecision}, bet:${player.bet}, chip:${player.chips}`);
        });
    }
    private draw(player: AbstractPlayer): void {
        player.hand.push(this.deck.drawOne());
        player.hand.push(this.deck.drawOne());
    }
    private getTurnPlayer(): AbstractPlayer {
        return this.players[this.turnCounter % this.players.length];
    }
    private battleWithHouse() {
        let resultList: string[] = [];
        // ハウスの手札を確認する
        if (this.house.gameDecision === "surrender") {
            this.players.forEach(() => resultList.push("win"));
        } else {
            const house = this.house.getHandScore();
            this.players.forEach((player: AbstractPlayer) => {
                if (player.gameDecision === "stand" && player.getHandScore() > house) resultList.push("win");
                else resultList.push("lose");
            });
        }

        return resultList;
    }
    private payoff(resultList: string[]): void {
        resultList.forEach((result: string, index: number) => {
            if (result === "win") this.players[index].chips += this.players[index].bet;
            else this.players[index].chips -= this.players[index].bet;
        });
    }
}
