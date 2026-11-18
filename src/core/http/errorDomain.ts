export class DomainError extends Error {
    constructor(
        public readonly code : number,
        public readonly errCode : string,
        public readonly message: string,
        public readonly meta? : any,
    ) {
    super(message);
    }

    toJson(){
        return {
            code : this.code,
            errCode : this.errCode,
            message : this.message,
            meta : this.meta
        }
    }
}
