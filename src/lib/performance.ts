import gradientDescent from "../utils/math/gradientDescent";
import binomialPmf from "../utils/stats/binomial";
import normalPdf from "../utils/stats/normal";

const performanceCache = new Map<[number, number], number>();

function getMeanForWinrate(games: number) {
    const [a, b, c] = [-0.15294117, 0.21750913, 0.55125215];
    return a * Math.E ** (-b * games) + c;
}

export default function getPerformance(wins: number, games: number): number {
    if (performanceCache.has([wins, games])) {
        return performanceCache.get([wins, games])!;
    }

    const meanWinrateDiff = getMeanForWinrate(games) - 0.5;

    const performance =
        gradientDescent((x) => -getProbability(wins, games, x), 0.5) +
        meanWinrateDiff;

    performanceCache.set([wins, games], performance);

    return performance;
}

export function getProbability(wins: number, games: number, winrate: number) {
    return binomialPmf(games, wins, winrate) * normalPdf(winrate, 0.5, 0.11);
}
