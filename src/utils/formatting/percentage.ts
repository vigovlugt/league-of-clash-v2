export default function formatPercentage(real: number, total?: number) {
    let percentage = real;
    if (total !== undefined) {
        percentage = real / total;
    }

    return parseFloat((percentage * 100).toFixed(2)) + "%";
}
