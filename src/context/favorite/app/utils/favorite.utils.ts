export const sameIds = (a: number[], b: number[]): boolean =>
    a.length === b.length && a.every((id) => b.includes(id));
