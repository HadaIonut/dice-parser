export const findSmallestN = (array: number[], count: number) => {
    array.sort((a, b) =>  a - b);

    return array.slice(0, count);
}

export const findGreatestN = (array: number[], count: number) => {
    array.sort((a, b) =>  b - a);

    return array.slice(0, count);
}