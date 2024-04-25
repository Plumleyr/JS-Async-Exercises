document.addEventListener('DOMContentLoaded', function(){
    let catchAPokemon = document.getElementById('catch');
    let pokedex = document.getElementById('pokedex')

    class Pokemon{
        constructor(name, imageUrl, desc){
            this.name = name;
            this.imageUrl = imageUrl;
            this.desc = desc;
        }
    }

    function randomPokemon(){
        return Math.floor(Math.random() * 1025) + 1;
    }

    async function getAPokemon(num){
        try{
            const [pokeInfo, pokeSpecies] = await Promise.all([
                axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`),
                axios.get(`https://pokeapi.co/api/v2/pokemon-species/${num}`)
            ])

            console.log(pokeSpecies)

            const name = pokeInfo.data.name;
            const imageUrl = pokeInfo.data.sprites.front_default;

            const englishIndex = pokeSpecies.data.flavor_text_entries.findIndex(entry => entry.language.name === 'en');

            const desc = englishIndex !== -1 ? pokeSpecies.data.flavor_text_entries[englishIndex].flavor_text : 'English desc not found.'

            return new Pokemon(name, imageUrl, desc);
        }catch(error){
            console.error('Error fetching Pokemon data:', error);
            throw error;
        }
    }

    catchAPokemon.addEventListener('submit', async function(evt){
        try{
            evt.preventDefault()
            let pokedexNum = randomPokemon()
            const pokemon = await getAPokemon(pokedexNum)
            const newDiv = document.createElement('div')
            newDiv.classList.add('pokedexEntry')
            const newH2 = document.createElement('h2')
            newH2.innerText = pokemon.name
            const newImg = document.createElement('img')
            newImg.src = pokemon.imageUrl
            const newImgDiv = document.createElement('div')
            newImgDiv.classList.add('imgDiv')
            newImgDiv.appendChild(newImg)
            const newP = document.createElement('p')
            newP.innerText = pokemon.desc

            newDiv.appendChild(newH2)
            newDiv.appendChild(newImgDiv)
            newDiv.appendChild(newP)

            pokedex.append(newDiv)
        }catch (error) {
            console.error('Error catching Pokemon:', error);
        }
    })
});