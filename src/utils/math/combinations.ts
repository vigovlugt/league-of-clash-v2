import factorial from "./factorial";

export default function combinations(n: number, k: number) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}
