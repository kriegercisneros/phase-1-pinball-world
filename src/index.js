fetch('http://localhost:3000/games')
.then(resp => resp.json())
.then(data =>{
    populateGameList(data)
    renderFirstGame(data[0])
    console.log(data)
})

const titlePlace = document.querySelector('h2#detail-title');
const scorePlace = document.querySelector('span#detail-high-score');
const imgPlace = document.querySelector('#detail-image');

function populateGameList(names){
    const gameListNav = document.querySelector('nav.game-list')

    names.forEach(item => {
        const h5 = document.createElement('h5');
        h5.innerText = `${item.name} (${item.manufacturer_name})`;
        gameListNav.appendChild(h5);

        h5.addEventListener('click', () => {
            renderFirstGame(item)
        })
    })

}

function renderFirstGame(game){
    titlePlace.innerText = game.name;
    scorePlace.innerText = game.high_score;
    imgPlace.src = game.image;
}


