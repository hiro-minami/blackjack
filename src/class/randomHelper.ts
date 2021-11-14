export default class RandomHelper {
    public static selectRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
