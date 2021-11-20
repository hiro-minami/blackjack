export const topPage: string = `
<div class="title justify-contents-center">
<div class="flex-direction-column">
    <div class="game-title">Blackjack</div>
    <div class="form flex-direction-column">
        <input type="text" class="input-child input-name" placeholder="input your name" />
        <select name="mode" id="game-mode" class="input-child" aria-placeholder="game mode">
            <option value="">select mode</option>
            <option value="user">user</option>
            <option value="ai">ai</option>
        </select>
        <button type="button" id="startButton" class="input-child">Play Game!</button>
    </div>
</div>
</div>
`;
