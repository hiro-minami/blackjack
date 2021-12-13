import Table from "./class/table";
import { initGame, selectAction, afterBet } from "./controllers/index";
import { add, minus } from "./controllers/betController";
import { surrender, stand, hit, double } from "./controllers/actionController";
import { gameTable } from "./components/gameTable";
import { topPage } from "./components/topPage";

let table = new Table();

const app = document.querySelector("#app");
app.innerHTML = topPage;

const init = () => {
    const inputName: HTMLInputElement = document.querySelector("#inputName");
    const name = inputName.value != "" ? inputName.value : "User";
    initGame(table, name);
    playGame();
};

const playGame = () => {
    app.innerHTML = gameTable(table);
    document.querySelector("body").style.background = "URL('./assets/img/table.jpeg') center / cover";

    // ボタン押下後のイベントを作成
    const minusButtons = document.querySelectorAll(".minus-button");
    minusButtons.forEach((minusButton: HTMLButtonElement) => {
        minusButton.addEventListener("click", (e: any) => {
            const value: number = e.target.getAttribute("data-value");
            minus(value);
        });
    });

    // +ボタンを押下した時の動き
    const plusButtons = document.querySelectorAll(".plus-button");
    plusButtons.forEach((plusButton: HTMLButtonElement) => {
        plusButton.addEventListener("click", (e: any) => {
            const value: number = e.target.getAttribute("data-value");
            add(value);
        });
    });

    // Betボタンを押下した時の動き
    const betButton: HTMLButtonElement = document.querySelector("#betButton");
    betButton.addEventListener("click", () => {
        afterBet(table);
    });

    const surrenderButton = document.querySelector("#surrenderButton");
    surrenderButton.addEventListener("click", () => {
        surrender(table.players[table.players.length - 1], table);
    });

    const standButton = document.querySelector("#standButton");
    standButton.addEventListener("click", () => {
        stand(table.players[table.players.length - 1], table);
    });

    const hitButton = document.querySelector("#hitButton");
    hitButton.addEventListener("click", () => {
        hit(table.players[table.players.length - 1], table);
    });

    const doubleButton = document.querySelector("#doubleButton");
    doubleButton.addEventListener("click", () => {
        double(table.players[table.players.length - 1], table);
    });

    const logButton = document.querySelector("#aftergame-zone");
    logButton.addEventListener("click", () => {
        playGame();
    });
};

// 読み込み完了時、ゲームスタート
const startButton: HTMLButtonElement = document.querySelector("#startButton");
// Startボタンを押下したら実行
startButton.addEventListener("click", () => {
    init();
});
