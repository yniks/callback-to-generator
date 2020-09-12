"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventToGenerator = void 0;
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
function EventToGenerator() {
    //AsyncGeneratorFunction
    let buffer = [];
    let pendingRequest;
    function push(arg) {
        if (pendingRequest) {
            /**
             * Copy pending request function and makeit null before calling it,
             * this is to prevent a case of infinite recursion, if this function happened to push by itself
             */
            var copy = pendingRequest;
            pendingRequest = undefined;
            copy(arg);
        }
        else
            buffer.push(arg);
    }
    async function* generator() {
        var event;
        while (true) {
            if (buffer.length > 0)
                event = buffer.shift();
            else
                event = await new Promise((res, rej) => pendingRequest = res);
            if (event === null) //end of stream
             {
                //TODO+FIXME:cleanup to prevent any memory leakage
                break;
            }
            else
                yield event;
        }
    }
    push[Symbol.asyncIterator] = generator;
    return push;
}
exports.EventToGenerator = EventToGenerator;
