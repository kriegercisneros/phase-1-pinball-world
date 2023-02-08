let currGame;

fetch('http://localhost:3000/games')
.then(resp => resp.json())
.then(data =>{
    populateGameList(data)
    renderGame(data[0])
    console.log(data)
})

const titlePlace = document.querySelector('h2#detail-title');
const scorePlace = document.querySelector('span#detail-high-score');
const imgPlace = document.querySelector('#detail-image');
const highScoreForm = document.querySelector('#high-score-form')


function populateGameList(names){
    const gameListNav = document.querySelector('nav.game-list')

    names.forEach(item => {
        const h5 = document.createElement('h5');
        h5.innerText = `${item.name} (${item.manufacturer_name})`;
        gameListNav.appendChild(h5);

        h5.addEventListener('click', () => {
            renderGame(item)
        })
    })

}

function renderGame(game){
    currGame = game;
    titlePlace.innerText = currGame.name;
    scorePlace.innerText = currGame.high_score;
    imgPlace.src = currGame.image;
    
}


highScoreForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    currGame.high_score = parseInt(e.target['score-input'].value)
    renderGame(currGame)
    // scorePlace.innerText = parseInt(e.target['score-input'].value)+parseInt(scorePlace.innerText);
    fetch(`http://localhost:3000/games/${currGame.id}`, { 
        method: 'PATCH', 
        header:{
            'content-type' : 'application/json'
        },
        body : JSON.stringify({
            high_score : currGame.high_score
        })
    })
    .then((resp)=>resp.json())
    .then((data)=> {
        console.log(data)
        // renderGame(data)
    })//scorePlace.innerText = data.high_score)
})



