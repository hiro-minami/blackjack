import Table from "./class/table";
import { startGame, initGame, selectAction, afterBet, minus, add } from "./functions/index";
import { gameTable } from "./components/gameTable";
import { topPage } from "./components/topPage";

let table = new Table();

const app = document.querySelector("#app");
app.innerHTML = topPage;

// 読み込み完了時、ゲームスタート
const startButton: HTMLButtonElement = document.querySelector("#startButton");
// Startボタンを押下したら実行
startButton.addEventListener("click", () => {
    //startGame(table);
    //const name = document.querySelector("#inputName").innerHTML;
    const inputName: HTMLInputElement = document.querySelector("#inputName");
    const name = inputName.value != "" ? inputName.value : "User";
    console.log(name);
    initGame(table, name);
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

    // const actionButton: HTMLButtonElement = document.querySelector("#actionButton");
    // actionButton.addEventListener("click", () => {
    //     selectAction(table);
    // });

    // const togguleButton: HTMLButtonElement = document.querySelector("#toggleButton");
    // togguleButton.addEventListener("click", () => {
    //     const cards = document.querySelectorAll(".card-texts-hidden");
    //     console.log(cards);
    //     cards.forEach((card: HTMLElement) => {
    //         card.className = "card-texts";
    //     });
    // });
});
