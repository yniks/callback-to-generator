//IMPLEMENTING BUCKET
function eventtogenerator()
{
    var buffer=[]
    var waiting=null
    function cb(arg)
    {
        if (waiting)
        {
            //TODO:fix this mess
            var copy_waiting=waiting
            waiting=null
            copy_waiting(arg)
        }
        else buffer.push(arg)
    }
    async function* iter()
    {
        var event;
        while(true)
        {
            if (buffer.length>0) event= buffer.shift()
            else event=await new Promise((res,rej)=>waiting=res)

            if (event===null)//end of stream
                {
                    //TODO+FIXME:cleanup to prevent any memory leakage
                    break
                }
            else yield event
        }
    }
    cb.finish=()=>cb(null)
    cb[Symbol.asyncIterator]=iter
    return cb
}
module.exports=eventtogenerator