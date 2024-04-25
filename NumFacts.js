document.addEventListener("DOMContentLoaded", function() {
    let errP = document.getElementById('numErr');
    let arrP = document.getElementById('numArr');
    let numInput = document.getElementById('numInput');
    let addNum = document.getElementById('numBtn');
    let getFact = document.getElementById('numForm');
    let factContainer = document.getElementById('fact-container')

    let numArray = [];

    addNum.addEventListener('click', function(){
        if(!isNaN(Number(numInput.value)) && numInput.value !== ''){
            errP.innerText = '';
            numArray.push(numInput.value);
            arrP.innerText = `Your Fav Number(s) are ${numArray}`;
            numInput.value = '';
        } else{
            errP.innerText = `${numInput.value} is not a number`;
            numInput.value = '';
        }
    });

    getFact.addEventListener('submit', async function(evt){
        evt.preventDefault()
        let numPromiseArr = [];

        for(let i = 0; i < numArray.length; i++){
            numPromiseArr.push(axios.get(`http://numbersapi.com/${numArray[i]}?json`))
        }

        let facts = await Promise.all(numPromiseArr)

        for(let i = 0; i < numArray.length; i++){
            let newP = document.createElement('p')
            newP.innerText = facts[i].data.text
            factContainer.appendChild(newP)
        }

        numArray = [];
        arrP.innerText = '';
    });
});
