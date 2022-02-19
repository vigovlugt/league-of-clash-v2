export default function normalPdf(x: number, mean: number, std: number) {
    return (
        (1 / (mean * Math.sqrt(2 * Math.PI))) *
        Math.E ** ((-1 / 2) * ((x - mean) / std) ** 2)
    );
}
