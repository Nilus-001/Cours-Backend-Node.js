const add = (m:bigint, p:bigint) => (m | p);
const remove = (m:bigint, p:bigint) => (m & ~p);
const has = (m:bigint, p:bigint) => ((m & p) !== 0n);
const hasAll = (m:bigint, p:bigint) => ((m & p) === p);