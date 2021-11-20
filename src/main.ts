import Table from "./class/table";
import { startGame, initGame, selectAction, afterBet } from "./functions/index";
import { gameTable } from "./components/gameTable";
import { topPage } from "./components/topPage";

let table = new Table();

const app = document.querySelector("#app");
app.innerHTML = topPage;

// 読み込み完了時、ゲームスタート
const startButton: HTMLButtonElement = document.querySelector("#startButton");
startButton.addEventListener("click", () => {
    //startGame(table);
    initGame(table);
    console.table(table);
    app.innerHTML = gameTable(table);
    document.querySelector("body").style.background = "URL('./assets/img/table.jpeg') center / cover";

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
