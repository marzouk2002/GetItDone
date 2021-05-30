const { date, object } = require('assert-plus');
const fs= require('fs');

const fields=document.querySelectorAll(".word")
const input=document.querySelector("#input")
const apologie=document.querySelector('.apologie')

try {
    const data = fs.readFileSync('Big-fill.txt', 'utf8')
    let textArr=data.split('\r\n')
    let textObj={
        '':textArr.slice(0,9)
    }
    textArr.forEach((word, index)=>{
        textObj[word]=textArr.slice(index+1,index+10)
    })
    input.addEventListener("input", ()=>{
        let sentence=input.value
        if(sentence[sentence.length-1]!==" ") {
            let wordarr=sentence.split(" ")
            let lastword=wordarr[wordarr.length-1]
            let arrwords= textObj[lastword]
            if(arrwords==undefined) {
                apologie.style.setProperty('--opacity','1')
                fields.forEach((field, index)=>{
                    field.innerHTML=''
                    field.style.setProperty('cursor','none')

                })
            }else{
                apologie.style.setProperty('--opacity','0')
                fields.forEach((field, index)=>{
                    field.innerHTML=arrwords[index]
                    field.style.setProperty('cursor','pointer')
                    field.addEventListener('click',()=>{
                        let newSet=sentence.slice(0, sentence.length-lastword.length)
                        newSet+=arrwords[index]
                        input.value=newSet
                    })
                })
            }
        }
    })
} 
catch (err) {
    console.error(err)
  }