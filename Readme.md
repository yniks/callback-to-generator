# Super Simple Event to Stream library

### Usage:
```javascript
//program: Lazy loop, clock tick Stream library
(async function(){
    const eventGen=require('./')()


    var interval=setInterval(()=>{
        eventGen('tock');
    },1000)
    setTimeout(()=>{
        eventGen(null);
        clearInterval(interval);
    },1000*10)

    //demo
    for await (let instance of eventGen)
    {
        console.log('tick',instance)
    }

    })()

```

## What is exported:

A function overloaded as a `async generator` via `[Symbol.asyncIterator]` annotation.
