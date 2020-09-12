/**
 * An Overloaded function which is Also an AsyncGenerator.
 *
 * Calling this function pushes the passed argument in the buffer, which can be eventually
 * extracted via iterating this object via generator.Hence, CallBack to generator.
 *
 * `Usage:` This Object can be used a call back to an listener and thenafter emitting
 * events can be iterated over via this generator
 *
 */
export declare function EventToGenerator(): {
    (arg: any): void;
    [Symbol.asyncIterator]: () => AsyncGenerator<any, void, unknown>;
};
//# sourceMappingURL=index.d.ts.map