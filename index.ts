/**
 * An Class which constructs an AsyncGenerator.
 * 
 * `Usage:` The object constructed via this class can be used as a call back to a listener . Emitted
 * events can be iterated over using this object as a generator.
 * 
 */
import {BaseFunction} from "inheritable-function-class"
export class EventToGenerator extends BaseFunction  implements AsyncIterable<any> 
{
    /**
     * Determines whether to raise error if an attempt is made to push into an already ended stream.
     * false implies to ignore silently
     */
    throwextra:boolean
    #buffer:any[]=[]
    #pendingRequest:Function|undefined
    __call__:Function
    constructor(throwextra:boolean=false)
    {
        super()
        this.throwextra=throwextra
        this.#buffer=[]
        this.#pendingRequest=undefined
        this.__call__=this.push
    }
    /**
    * Calling this function pushes the passed argument in the buffer, which can be eventually
    * extracted via iterating this object as a generator.Hence, CallBack to generator.
    * @param value value to be pushed into the stream, pushing `null` ends the stream
    */
    push(value:null|any)
    {
        if (value===null)//end of stream
        {
            //Cleanup to prevent memory leakage
            this.push=()=>{if(this.throwextra)throw "Stream has ended! Illegal attempt to push"}
            return
        }
        if(this.#pendingRequest)
        {
            /**
             * Copy pending request function and makeit null before calling it,
             * this is to prevent a case of infinite recursion, if this function happened to push by itself
             */
            var copy=this.#pendingRequest
            this.#pendingRequest=undefined
            copy(value)
        }
        else this.#buffer.push(value)
    }
    async *[Symbol.asyncIterator]()//AsyncIterator
    {
        var event;
        while(true)
        {
            if (this.#buffer?.length>0) event= this.#buffer.shift()
            else event=await new Promise((res,rej)=>this.#pendingRequest=res)

            if (event===null)//end of stream
                {
                    break
                }
            else yield event
        }
    }
}