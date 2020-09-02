# Super Simple Event to Stream library

### Usage:
```javascript
//demonstration: Lazy loop, clock tick stream fed loop
(async function(){
    const streamline=require('./')()


    var interval=setInterval(()=>{
        streamline('tock');
    },1000)
    setTimeout(()=>{
        streamline.finish()// or streamline(null);
        clearInterval(interval);
    },1000*10)

    //demo
    for await (let event of streamline)
    {
        console.log('tick',event)
    }

    })()
    //output:  will print `tick tock` after 1000 ms untill stream is finished by a timeout of 10 second

```

## What is exported:

A function overloaded as a `async generator` via `[Symbol.asyncIterator]` annotation.

## Tags
    event to generator, looping of events,  for events, sequencing events
    
## :bookmark_tabs: Maintaned untill usable for ME
