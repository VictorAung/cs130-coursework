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
    let trackSection = document.querySelector('#track-section')
    let tracks = trackSection.querySelector('#tracks')

    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}`)
        .then(response => response.json())
        .then(data => {
            if (data[0] === undefined) {
                tracks.innerHTML = "No tracks found";
            }
            else {
                if (data.length < 5) {
                    for (i = 0; i < data.length; i++) {
                        tracks.innerHTML += `<section class="track-item preview" data-preview-track="${data[i].preview_url}">
                        <img src="${data[i].album.image_url}">
                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                        <div class="label">
                            <h3>${data[i].name}</h3>
                            <p>
                                ${data[i].artist.name}
                            </p>
                        </div>
                        </section>`;
                    }
            }
                else {
                    for (i = 0; i < 5; i++) {
                        tracks.innerHTML += `<section class="track-item preview" data-preview-track="${data[i].preview_url}">
                        <img src="${data[i].album.image_url}">
                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                        <div class="label">
                            <h3>${data[i].name}</h3>
                            <p>
                                ${data[i].artist.name}
                            </p>
                        </div>
                        </section>`;
                    }
                }
               
            }
        });
};

const getAlbums = (term) => {
    let albumSection = document.querySelector('#album-section')
    let albums = albumSection.querySelector('#albums')

    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=album&q=${term}`)
        .then(response => response.json())
        .then(data => {
            if (data[0] === undefined) {
                albums.innerHTML = "No albums found";
            }
            else {
                for (i = 0; i < data.length; i++) {
                    albums.innerHTML += `<section class="album-card" id="${data[i].id}">
                    <div>
                        <img src="${data[i].image_url}">
                        <h3>${data[i].name}</h3>
                        <div class="footer">
                            <a href="${data[i].spotify_url}" target="_blank">
                                view on spotify
                            </a>
                        </div>
                    </div>
                </section>`
                }
            }
        });
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