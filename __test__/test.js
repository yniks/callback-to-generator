(async function(){
    const eventGen=require('./')()


    var interval=setInterval(()=>{
        eventGen('tock');
    },1000)
    setTimeout(()=>{
        eventGen(null);
        clearInterval(interval);
    },1000*10)
    for await (let instance of eventGen)
    {
        console.log('tick',instance)
    }

    })()
