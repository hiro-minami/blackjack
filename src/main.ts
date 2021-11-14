import Table from "./class/table";

// 読み込み完了時、ゲームスタート
window.onload = () => {
    startGame();
};

export const startGame = () => {
    // テーブル作成
    let table = new Table("blackjack");
    table.startBlackjack("ai", 4, 0);
};
