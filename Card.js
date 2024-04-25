document.addEventListener('DOMContentLoaded', function(){
    let drawBtn = document.getElementById('drawBtn')
    let drawCard = document.getElementById('draw')
    let table = document.getElementById('table')

    let deckId = '';

    function getDeck(){
        return axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => {
                deckId = res.data.deck_id
            });
    }

    getDeck();

    drawCard.addEventListener('submit', async function(evt){
        evt.preventDefault()
        return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(res => {
                newDiv = document.createElement('div')
                newDiv.classList.add('card')
                newImg = document.createElement('img')
                newImg.src = res.data.cards[0].image
                newDiv.appendChild(newImg)
                newDiv.style.transform = `rotate(${Math.random() * 360}deg)`
                table.appendChild(newDiv)
                if(res.data.remaining === 0){
                    drawBtn.style.display = 'None';
                }
            });
    });
});