```
           //  options
         const options={
             method: 'POST',
             headers:{
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${apiKey}`,
             } ,
             body:JSON.stringify({
                 "model": "gpt-3.5-turbo",
                 "messages": [{role: "user", content: message}]
             })
         }

      fetching
     fetch(link,options)
     .then(res=>res.json())
     .then(res=>console.log(res))
     .catch(e=>console.log(e))
```