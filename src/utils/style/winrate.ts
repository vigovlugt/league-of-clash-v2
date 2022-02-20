export function getWinrateClass(wins: number, games: number) {
    if (games === 0) {
        return "text-winrate-okay";
    }

    const winrate = wins / games;

    if (winrate < 0.45) {
        return "text-winrate-shiggo";
    } else if (winrate < 0.485) {
        return "text-winrate-meh";
    } else if (winrate < 0.515) {
        return "text-winrate-okay";
    } else if (winrate < 0.53) {
        return "text-winrate-good";
    } else if (winrate < 0.55) {
        return "text-winrate-great";
    }

    return "text-winrate-volxd";
}
