const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
    
  

};

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
};

const getArtist = (term) => {
    let artistCard = document.querySelector('.artist-card')
    let artistImage = artistCard.querySelector('img')
    let artistH3 = artistCard.querySelector('h3')
    let artistA = artistCard.querySelector('a')
  

    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${term}`)
        .then(response => response.json())
        .then(data => {
            if (data[0] === undefined) {
                artistH3.innerHTML = "No artists found";
            }
            else {
                artistCard.id = data[0].id;
                artistImage.src = data[0].image_url;
                artistH3.innerHTML =  data[0].name;
                artistA.href = data[0].spotify_url; 
            }
        });
    
    // console.log(artistImage)
    // console.log(artistH3)
    // console.log(artistA)
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};