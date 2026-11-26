export const addPerm = (m:bigint, p:bigint) => (m | p);
export const removePerm = (m:bigint, p:bigint) => (m & ~p);
export const hasPerm = (m:bigint, p:bigint) => ((m & p) !== 0n);
export const hasAllPerm = (m:bigint, p:bigint) => ((m & p) === p);
