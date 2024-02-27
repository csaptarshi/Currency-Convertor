const BaseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

let dropDownList = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form #btn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for(let select of dropDownList){
    for(i in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=i;
        newOption.value =i;
        if(select.name ==="from" && i ==="USD"){
            newOption.selected ="selected";
        }
        else if(select.name ==="to" && i ==="INR"){
            newOption.selected ="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let curcode = element.value;
    countryCode = countryList[curcode]; 
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src = newSrc;
}

const getConvertionRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    if (amt === "" || amt < 1){
        amt = 1;
        amount.value = "1";
        //location.reload();
    }
    //console.log(fromCurr.value,toCurr.value);
    let URL = `${BaseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    //console.log(rate);
    let finalAmount = amt * rate;
    msg.value = `${amt} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    msg.disabled = true;
}

btn.addEventListener("click", async (evt,e) =>{
    evt.preventDefault();
    

    getConvertionRate();
})

window.addEventListener("load", ()=>{
    getConvertionRate();
})