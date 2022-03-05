import gradientDescent from "../utils/math/gradientDescent";
import binomialPmf from "../utils/stats/binomial";
import normalPdf from "../utils/stats/normal";

const performanceCache = new Map<[number, number], number>();

function getMeanForWinrate(games: number) {
    const [a, b, c] = [-0.15076009, 0.34970264, 0.5345525];
    return a * Math.E ** (-b * games) + c;
}

export default function getPerformance(
    wins: number,
    games: number,
    isChampionPerformance = true
): number {
    if (performanceCache.has([wins, games])) {
        return performanceCache.get([wins, games])!;
    }

    const meanWinrate = isChampionPerformance ? getMeanForWinrate(games) : 0.5;

    if (games > 100) {
        const performance = wins / games;
        performanceCache.set([wins, games], performance);
        return performance;
    }

    const performance = gradientDescent(
        (x) => -getProbability(wins, games, x, meanWinrate),
        0.5
    );

    performanceCache.set([wins, games], performance);

    return performance;
}

export function getProbability(
    wins: number,
    games: number,
    winrate: number,
    meanWinrate: number
) {
    return (
        binomialPmf(games, wins, winrate) *
        normalPdf(winrate, meanWinrate, 0.11)
    );
}
