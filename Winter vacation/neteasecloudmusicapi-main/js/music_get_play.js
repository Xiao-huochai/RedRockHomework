const playlists = document.querySelectorAll('.playlist');

const songList = document.getElementById('songList_f');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');

const plylistPic = document.querySelector('.plylist_pic');
const plylistName = document.querySelector('.plylist_name');
const briefIntroduction = document.querySelector('.brief_introduction');
const authorImg = document.querySelector('.author_img');
const authorName = document.querySelector('.author_name');

let currentPlaylist = [];
let currentIndex = 0;



playlists.forEach(playlist => {
    playlist.addEventListener('click', function () {
        const idContent = this.querySelector('.playlistId').textContent;
        fetch(`http://localhost:3000/playlist/detail?id=${idContent}`)
            .then(data => data.json())
            .then(data => {
                //设定歌单图片作者等
                plylistPic.src = data.playlist.coverImgUrl;
                plylistName.textContent = data.playlist.name;
                briefIntroduction.textContent = data.playlist.description;

                authorImg.src = data.playlist.creator.avatarUrl;
                authorName.textContent = data.playlist.creator.nickname;
            });

        //得到当前音乐列表
        fetch(`http://localhost:3000/playlist/track/all?id=${idContent}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                currentPlaylist = data.songs;
                renderSongList(currentPlaylist);
            });
    });
});

function renderSongList(songs) {
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = 'song-item';
        songItem.innerHTML = `
                    <div style="width: 10px;">${index + 1}</div>
                    <img src="${song.al.picUrl}" alt="${song.name}">
                    <div>
                    <div>${song.name}</div>
                    <div style="color: #c4cad2; font-size: 10px;">${song.ar.map(artist => artist.name).join(' / ')}</div>
                    </div>
                `;
        songItem.addEventListener('click', () => playSong(index));
        songList.appendChild(songItem);
    });
}

function playSong(index) {
    const song = currentPlaylist[index];
    if (song) {
        fetch(`http://localhost:3000/song/url?id=${song.id}`)
            .then(response => response.json())
            .then(data => {
                audioPlayer.src = data.data[0].url;
                audioPlayer.play();
                currentIndex = index;
                updateActiveSong();
                updatePlayPauseButton(); // 更新按钮状态
            });
    }
}

function updateActiveSong() {
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });
}

// 更新播放/暂停按钮的显示
function updatePlayPauseButton() {
    if (audioPlayer.paused) {
        playPauseBtn.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
    } else {
        playPauseBtn.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
    }
}

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    updatePlayPauseButton();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        playSong(currentIndex - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < currentPlaylist.length - 1) {
        playSong(currentIndex + 1);
    }
});

audioPlayer.addEventListener('ended', () => {
    if (currentIndex < currentPlaylist.length - 1) {
        playSong(currentIndex + 1);
    }
});

// 监听音频播放状态变化
audioPlayer.addEventListener('play', () => {
    updatePlayPauseButton(); // 播放时更新按钮
});

audioPlayer.addEventListener('pause', () => {
    updatePlayPauseButton(); // 暂停时更新按钮
});

// 更新进度条
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
});

// 拖动进度条跳转播放时间
progressBar.addEventListener('input', () => {
    const time = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = time;
});