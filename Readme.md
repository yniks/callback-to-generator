# Super Simple Event to Stream library

### Usage:
```javascript
//program: Lazy loop, clock tick Stream library
(async function(){
    const streamline=require('./')()


    var interval=setInterval(()=>{
        streamline('tock');
    },1000)
    setTimeout(()=>{
        eventGen(null);
        clearInterval(interval);
    },1000*10)

    //demo
    for await (let event of streamline)
    {
        console.log('tick',event)
    }

    })()

```

## What is exported:

A function overloaded as a `async generator` via `[Symbol.asyncIterator]` annotation.

## tags
    event to 
