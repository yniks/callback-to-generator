"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventToGenerator = void 0;
/**
 * An Class which constructs an AsyncGenerator.
 *
 * `Usage:` The object constructed via this class can be used as a call back to a listener . Emitted
 * events can be iterated over using this object as a generator.
 *
 */
class EventToGenerator {
    constructor(throwextra = false) {
        this.#buffer = [];
        this.throwextra = throwextra;
        this.#buffer = [];
        this.#pendingRequest = undefined;
    }
    #buffer;
    #pendingRequest;
    /**
    * Calling this function pushes the passed argument in the buffer, which can be eventually
    * extracted via iterating this object as a generator.Hence, CallBack to generator.
    * @param value value to be pushed into the stream, pushing `null` ends the stream
    */
    push(value) {
        if (value === null) //end of stream
         {
            //Cleanup to prevent memory leakage
            this.push = () => { if (this.throwextra)
                throw "Stream has ended!Illegal attempt to push"; };
            return;
        }
        if (this.#pendingRequest) {
            /**
             * Copy pending request function and makeit null before calling it,
             * this is to prevent a case of infinite recursion, if this function happened to push by itself
             */
            var copy = this.#pendingRequest;
            this.#pendingRequest = undefined;
            copy(value);
        }
        else
            this.#buffer.push(value);
    }
    async *[Symbol.asyncIterator]() {
        var event;
        while (true) {
            if (this.#buffer?.length > 0)
                event = this.#buffer.shift();
            else
                event = await new Promise((res, rej) => this.#pendingRequest = res);
            if (event === null) //end of stream
             {
                break;
            }
            else
                yield event;
        }
    }
}
exports.EventToGenerator = EventToGenerator;
