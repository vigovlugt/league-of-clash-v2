import combinations from "../math/combinations";

export default function binomialPmf(n: number, k: number, p: number) {
    return combinations(n, k) * p ** k * (1 - p) ** (n - k);
}
