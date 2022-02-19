export default function gradientDescent(
    f: (x: number) => number,
    x0: number,
    learningRate = 0.01,
    tolerance = 0.0001,
    maxIters = 100
) {
    let x = x0;
    let iter = 0;

    while (iter < maxIters) {
        const diff = learningRate * gradient(f, x);
        if (Math.abs(diff) < tolerance) {
            break;
        }

        x -= diff;
        iter++;
    }

    return x;
}

function gradient(f: (x: number) => number, x: number, dx = 0.0001) {
    return (f(x) - f(x - dx)) / dx;
}
