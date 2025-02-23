// 获取元素
//'../'表示当前目录上一级目录
import './music_get_play.js';
import './playlist_square.js'
import './carousel.js';
import '../css/all_struct.css';
import '../css/bottom_left.css';
import '../css/top_right.css';
import '../css/bottom_right.css';
import '../css/bottom_right_ps.css';
import '../css/bottom_right_inplaylist.css';
import '../css/footer.css';
import '../css/hot_search_box.css';
import '../css/qrCode.css';
const searchInput = document.querySelector('.search-input');
const hotSearchBox = document.querySelector('.hot-search-box');
const hotSearchList = document.querySelector('.hot-search-list');
const searchBtn = document.querySelector('.search-button');
const link = document.querySelector('a[href="#search_page"]');

const songList_s = document.getElementById('songList_s');
const audioPlayer_s = document.getElementById('audioPlayer');
const playPauseBtn_s = document.getElementById('playPauseBtn');
const prevBtn_s = document.getElementById('prevBtn');
const nextBtn_s = document.getElementById('nextBtn');
const progressBar_s = document.getElementById('progressBar');

let currentPlaylist_s = [];
let currentIndex_s = 0;
searchBtn.addEventListener('click', performSearch);

fetch(`http://localhost:3000/search/hot/detail`).then(data => data.json()).then(data => {
    addLi(data.data.length);
    const lies = hotSearchList.querySelectorAll('li')
    lies.forEach((li, index) => {
        const secondSpan = li.querySelector('span:nth-child(2)');
        secondSpan.textContent = data.data[index].searchWord;
        li.addEventListener('click', () => {
            searchInput.value = secondSpan.textContent;
            link.click();
            performSearch()
            //模拟对应a标签被点击
        })
    })
})
// 当输入框获得焦点时显示热搜榜
searchInput.addEventListener('focus', () => {
    hotSearchBox.style.display = 'block';
});

//没有延迟的话读取不到点击热榜的数据
searchInput.addEventListener('blur', () => {
    setTimeout(() => {
        hotSearchBox.style.display = 'none';
    }, 200);
});



function addLi(data) {
    for (let index = 0; index < data; index++) {
        const li = document.createElement('li');
        const span_f = document.createElement('span');
        const span_s = document.createElement('span');
        const a = document.createElement('a');
        a.href = '#search_page';
        span_f.textContent = index + 1;
        a.appendChild(span_f);
        a.appendChild(span_s);
        li.appendChild(a);
        hotSearchList.appendChild(li);
    }
}



function performSearch() {
    // 获取输入框的值
    console.log('触发');

    const keywords = searchInput.value;
    fetch(`http://localhost:3000/search?keywords=${keywords}`).then(data => data.json()).then(data => {
        currentPlaylist_s = data.result.songs;
        renderSongList_s(currentPlaylist_s);
        console.log(currentPlaylist_s);

    })
}








//接接接 检查完毕
// function renderSongList_s(songs) {
//     songList_s.innerHTML = '';
//     songs.forEach((song, index) => {
//         fetch(`http://localhost:3000/song/detail?ids=${song.id}`).then(data => data.json()).then(data => {
//             const songItems_s = document.createElement('div');
//             songItems_s.className = 'song-item';
//             songItems_s.innerHTML = `
//                     <div>${index + 1}</div>
//                     <img src="${data.songs[0].al.picUrl}" alt="暂无">
//                     <div>
//                     <div>${song.name}</div>
//                     <div style="color: #c4cad2; font-size: 10px;">${song.artists.map(artist => artist.name).join('/ ')}</div>
//                     </div>
//                 `;
//             songItems_s.addEventListener('click', () => playSong_s(index));
//             songList_s.appendChild(songItems_s);
//         })

//     });
// }
function renderSongList_s(songs) {
    songList_s.innerHTML = ''; // 清空当前列表

    // 使用 Promise.all 来确保所有 fetch 请求都完成后再处理
    Promise.all(songs.map((song, index) =>
        fetch(`http://localhost:3000/song/detail?ids=${song.id}`)
            .then(data => data.json())
            .then(data => ({ index, data })) // 保留索引和返回的数据
    )).then(results => {
        // 按照原始顺序排序
        results.sort((a, b) => a.index - b.index);

        // 遍历排序后的结果并插入 DOM
        results.forEach(({ index, data }) => {
            const songItems_s = document.createElement('div');
            songItems_s.className = 'song-item';
            songItems_s.innerHTML = `
                <div style="width: 10px;">${index + 1}</div>
                <img src="${data.songs[0].al.picUrl}" alt="暂无">
                <div>
                    <div>${songs[index].name}</div>
                    <div style="color: #c4cad2; font-size: 10px;">${songs[index].artists.map(artist => artist.name).join('/ ')}</div>
                </div>
            `;
            songItems_s.addEventListener('click', () => playSong_s(index));
            songList_s.appendChild(songItems_s);
        });
    });
}


//检查完毕
function playSong_s(index) {
    const song_s = currentPlaylist_s[index];
    if (song_s) {
        fetch(`http://localhost:3000/song/url?id=${song_s.id}`)
            .then(response => response.json())
            .then(data => {
                audioPlayer_s.src = data.data[0].url;
                audioPlayer_s.play();
                currentIndex_s = index;
                // updateActiveSong();
                // updatePlayPauseButton(); // 更新按钮状态
            });
    }
}

prevBtn_s.addEventListener('click', () => {
    if (currentIndex_s > 0) {
        playSong_s(currentIndex_s - 1);
    }
});

nextBtn_s.addEventListener('click', () => {
    if (currentIndex_s < currentPlaylist_s.length - 1) {
        playSong_s(currentIndex_s + 1);
    }
});




// function updateActiveSong() {
//     const songItems_s = document.querySelectorAll('.song-item');
//     songItems_s.forEach((item, index) => {
//         item.classList.toggle('active', index === currentIndex_s);
//     });
// }

// // 更新播放/暂停按钮的显示
// function updatePlayPauseButton() {
//     if (audioPlayer_s.paused) {
//         playPauseBtn_s.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
//     } else {
//         playPauseBtn_s.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
//     }
// }

// playPauseBtn_s.addEventListener('click', () => {
//     if (audioPlayer_s.paused) {
//         audioPlayer_s.play();
//     } else {
//         audioPlayer_s.pause();
//     }
//     updatePlayPauseButton();
// });



// audioPlayer_s.addEventListener('ended', () => {
//     if (currentIndex_s < currentPlaylist_s.length - 1) {
//         playSong(currentIndex_s + 1);
//     }
// });

// // 监听音频播放状态变化
// audioPlayer_s.addEventListener('play', () => {
//     updatePlayPauseButton(); // 播放时更新按钮
// });

// audioPlayer_s.addEventListener('pause', () => {
//     updatePlayPauseButton(); // 暂停时更新按钮
// });

// // 更新进度条
// audioPlayer_s.addEventListener('timeupdate', () => {
//     const progress_s = (audioPlayer_s.currentTime / audioPlayer_s.duration) * 100;
//     progressBar_s.value = progress_s;
// });

// // 拖动进度条跳转播放时间
// progressBar_s.addEventListener('input', () => {
//     const time_s = (progressBar_s.value / 100) * audioPlayer_s.duration;
//     audioPlayer_s.currentTime = time_s;
// });
