// import apiKey from "./apiKey.js";

let apiKey= "af3e931af7msh969a6d607ccfbcfp138f9ajsn511cb713654e";


// let link ='https://api.openai.com/v1/chat/completions';

let openchatBot= document.querySelector("#open")
let closechatBot= document.querySelector("#close")
let closeChat= document.querySelector("#closeChat")
let sendBtn= document.getElementById("sendBtn")
let ul= document.querySelector("ul")
let chatbot= document.querySelector(".chatbot")
let text= document.getElementById("chatInput")
let lang= document.querySelector("#langs")
let souc= document.querySelector("#lans")


let dispMessage=(message,classname,gen)=>{
    let li= document.createElement("li")
  
    if(classname ==="incoming"){
        
        let sp = document.createElement("span")
        sp.innerText="chat"
        sp.classList.add("material-symbols-outlined");
        li.appendChild(sp)
        handlechat(classname,li,message,gen)
        ul.appendChild(li)
    }
    else if(classname ==="outcoming"){
        handlechat(classname,li,message)
        ul.appendChild(li)
    }


    
}

let handlechat=(classname,li,message,gen)=>{
    li.classList.add("chat", classname,gen)
    let msg= document.createElement("p");
    msg.innerHTML= message;
    li.appendChild(msg)
}

// fetch data from chatGpt
let fetchData=async (message,type,source)=>{


    // text translator
    const url = 'https://text-translator2.p.rapidapi.com/translate';
        const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key':apiKey,
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},
	body: new URLSearchParams({
		source_language: source,
		target_language: type,
		text:message
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
   let  res= JSON.parse(result)
	dispMessage(res.data.translatedText,'incoming')
    ul.scrollTo(0,ul.scrollHeight)
}catch(error){
	dispMessage("The Query failed please check Your Inputs 😥😥",'incoming','error')
}


}
// fetchData("hello man")

sendBtn.addEventListener("click",()=>{
    //get input
    let input= text.value.trim();
    let langI =lang.value;
    let source = souc.value;
    //check if input is empty
    if(input.length==0){
         dispMessage("Enter a input or message","incoming") 
    }
    else{
    // display the message
    dispMessage(input,'outcoming')
    setTimeout(() => {
        dispMessage("Generating ...","incoming","gen")
        let gen= document.querySelector(".gen");
      setTimeout(() => {
        gen.remove();
      }, 600);
    }, 600); 
    setTimeout(() => {

       fetchData(input,langI,source);
      
    }, 700);
      
    text.value="";
    text.style.height =`55px`;
}
})

function addheigh(e){
    // listen to ctrl and v
    if(e.ctrlKey && e.key === 'v'){
        text.style.height =`${70 + text.scrollHeight}px`;
    }
    // if is enter key
    else if(e.key ==="Enter"){
        text.style.height =`${30 +  text.scrollHeight}px`;
    }
    
  
}

text.addEventListener("keydown",addheigh)

// addheigh();





















openchatBot.addEventListener("click",()=>{
    openchatBot.classList.add("active")
    closechatBot.classList.toggle("active")
    chatbot.classList.add("active")
})

function closed(){
    openchatBot.classList.toggle("active")
    closechatBot.classList.toggle("active")
    chatbot.classList.remove("active")
}

closechatBot.addEventListener("click",closed)

closeChat.addEventListener('click',closed)


