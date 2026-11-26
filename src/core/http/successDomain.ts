export class DomainResponse<T> {
    constructor(
        public readonly date: T,
        public readonly meta? : T
    )
    {

    }
}
