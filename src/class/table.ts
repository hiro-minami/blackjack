import Card from "./card";
import Deck from "./deck";
import { House, AiPlayer, AbstractBlackjackPlayer, AbstractPlayer, User } from "./player";
import { GamePhase, GameResult } from "../types/index";
import RandomHelper from "./randomHelper";

export default class Table {
    public betDenominations: number[] = [5, 20, 50, 100];
    public deck: Deck;
    public players: AbstractBlackjackPlayer[];
    public house: House;
    public turnCounter: number = 0;
    public gameCounter: number = 1;
    public gamePhase: GamePhase;
    public resultsLog: string[];
    public resultRank: AbstractBlackjackPlayer[];
    constructor() {
        this.deck = new Deck();
        this.players = [new AiPlayer("Raoh"), new AiPlayer("Toki"), new AiPlayer("Jagi"), new AiPlayer("Kenshiro")];
        this.house = new House("house");
        this.resultRank = [];
    }
    public startBlackjack(playerName: string) {
        // ユーザーを追加する
        this.players.push(new User(playerName));
        this.gamePhase = "betting";
        //while (this.gamePhase != "gameOver") {
        console.log("#################################");
        // 掛け金を求める
        //this.selectBet();
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
        this.outputLogs(this.gameCounter);
        // 脱落者の確認
        this.checkForDropout();
        // クリーンアウト
        this.blackjackClearPlayerHandsAndBets();
        if (this.players.length <= 1 || this.gameCounter > 1000) this.gamePhase = "gameOver";
        this.gameCounter++;
        //}
        // if (this.players.length === 1) console.log(`First: ${this.players[0].name}, Second: ${this.resultRank[0].name}, Third: ${this.resultRank[1].name}, Last: ${this.resultRank[2].name}`);
        // else console.log(`First: ${this.resultRank[0].name}, Second: ${this.resultRank[1].name}, Third: ${this.resultRank[2].name}, Last: ${this.resultRank[3].name}`);
    }
    public selectBet(value: number) {
        console.log(this.players);
        this.players.forEach((player: AbstractBlackjackPlayer) => {
            console.log(player.playerType);
            console.log(player.playerType === "ai");
            if (player.playerType === "ai") {
                for (let i = 0; i < 3; i++) {
                    const num: number = RandomHelper.selectRandom(0, 3);
                    player.bet += this.betDenominations[+num];
                    if (player.bet > player.chips) {
                        player.bet = player.chips;
                        break;
                    }
                }
            } else {
                player.bet = value;
            }
        });
    }
    public blackjackAssignPlayerHands(): void {
        this.players.forEach((player: AbstractBlackjackPlayer) => {
            this.draw(player);
        });
        this.draw(this.house);
    }
    public action() {
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
    public battleAndPayoff() {
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
        const resultList = this.battleWithHouse();
        this.payoff(resultList);
    }
    public checkForDropout() {
        this.resultRank.unshift(...this.players.filter((player: AbstractBlackjackPlayer) => player.chips <= 0));
        this.players = this.players.filter((player: AbstractBlackjackPlayer) => player.chips > 0);
    }
    public blackjackClearPlayerHandsAndBets(): void {
        this.players.forEach((player: AiPlayer) => {
            player.hand = [];
            player.bet = 0;
        });
        this.house.hand = [];
        this.turnCounter = 0;
        this.players.forEach((player: AbstractBlackjackPlayer) => (player.decision = "bet"));
        this.house.status = "bet";
    }
    public outputLogs(count: number) {
        console.log(`Round ${count + 1}`);
        this.players.forEach((player: AbstractBlackjackPlayer) => {
            console.log(`name:${player.name}, action:${player.decision}, bet:${player.bet}, chip:${player.chips}`);
        });
    }
    private draw(player: AbstractPlayer): void {
        player.hand.push(this.deck.drawOne());
        player.hand.push(this.deck.drawOne());
    }
    public getTurnPlayer(): AbstractBlackjackPlayer {
        return this.players[this.turnCounter % this.players.length];
    }
    private battleWithHouse(): GameResult[] {
        let resultList: GameResult[] = [];
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
    private payoff(resultList: GameResult[]): void {
        resultList.forEach((result: string, index: number) => {
            if (result === "win") this.players[index].chips += this.players[index].bet;
            else if (this.players[index].decision === "surrender") this.players[index].chips -= Math.floor(this.players[index].bet / 2);
            else this.players[index].chips -= this.players[index].bet;
        });
    }
}
