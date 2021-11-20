import Card from "../../class/card";

export const card = (cars?: Card[]) => {
    return `
    <div class="hands justify-contents-center">
        <div class="card flex-direction-column">
            <span class="card-texts">♠︎</span>
            <span class="card-texts">A</span>
        </div>
        <div class="card flex-direction-column">
            <span class="card-texts-red">❤︎</span>
            <span class="card-texts-red">K</span>
        </div>
    </div>`;
};

export const hiddenCard = (cars?: Card[]) => {
    return `
    <div class="hands justify-contents-center">
        <div class="card flex-direction-column">
            <span class="card-texts-hidden">♠︎</span>
            <span class="card-texts-hidden">A</span>
        </div>
        <div class="card flex-direction-column">
            <span class="card-texts-hidden">❤︎</span>
            <span class="card-texts-hidden">K</span>
        </div>
    </div>`;
};
