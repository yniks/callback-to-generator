/**
 * An Class which constructs an AsyncGenerator.
 *
 * `Usage:` The object constructed via this class can be used as a call back to a listener . Emitted
 * events can be iterated over using this object as a generator.
 *
 */
import { BaseFunction } from "inheritable-function-class";
export declare class EventToGenerator extends BaseFunction implements AsyncIterable<any> {
    #private;
    /**
     * Determines whether to raise error if an attempt is made to push into an already ended stream.
     * false implies to ignore silently
     */
    throwextra: boolean;
    __call__: Function;
    constructor(throwextra?: boolean);
    /**
    * Calling this function pushes the passed argument in the buffer, which can be eventually
    * extracted via iterating this object as a generator.Hence, CallBack to generator.
    * @param value value to be pushed into the stream, pushing `null` ends the stream
    */
    push(value: null | any): void;
    [Symbol.asyncIterator](): AsyncGenerator<any, void, unknown>;
}
//# sourceMappingURL=index.d.ts.map