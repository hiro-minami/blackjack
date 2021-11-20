export const actionZone = () => {
    let counterList = [0, 0, 0, 0];
    return `
    <div class="action-container">
        <button id="surrenderButton" class="action-button center">Surrender</button>
        <button id="standButton" class="action-button center">Stand</button>
        <button id="hitButton" class="action-button center">Hit</button>
        <button id="doubleButton" class="action-button center" disabled>Double</button>
    </div>`;
};
