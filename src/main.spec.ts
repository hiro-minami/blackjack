import { startGame } from "./main";

describe("SayHello", () => {
    test('toBe "Hello! TypeScript!"', () => {
        expect(startGame()).toBe("");
    });

    test('not toBe "Hello! JavaScript!"', () => {
        expect(startGame()).not.toBe("");
    });
});
