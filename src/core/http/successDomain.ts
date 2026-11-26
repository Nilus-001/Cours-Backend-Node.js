export class DomainResponse<T, M = Record<string, unknown>> {
    constructor(
        public readonly data: T,
        public readonly meta?: M,
    ) {}
}
