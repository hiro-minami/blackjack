// ＋ボタンを押下したらベット額を増やす
export const add = (value: number) => {
    let bet = document.querySelector("#user-bet").innerHTML;
    let chip = document.querySelector("#user-chip").innerHTML;
    let target = document.querySelector(`#bet-${value}`);
    if (+bet + +value <= +chip) {
        target.innerHTML = (+target.innerHTML + 1).toString();
        document.querySelector("#user-bet").innerHTML = (+bet + +value).toString();
    }
};

// -ボタンを押下したらベット額を減らす
export const minus = (value: number) => {
    let bet = document.querySelector("#user-bet").innerHTML;
    let target = document.querySelector(`#bet-${value}`);
    if (+target.innerHTML > 0) {
        document.querySelector("#user-bet").innerHTML = (+bet - +value).toString();
        target.innerHTML = (+target.innerHTML - 1).toString();
    } else {
        target.innerHTML = "0";
    }
};
