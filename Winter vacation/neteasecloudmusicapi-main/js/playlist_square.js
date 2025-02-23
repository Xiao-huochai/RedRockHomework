// const middleRight = document.querySelector('.top-section .right .bottom')
// const changeContentButton = document.querySelector('.top-section .right .bottom .recommended_playlists .recommended_title_btn')
// // 保留原始内容
// const originalContent = middleRight.innerHTML;
//console.log(middleRight);
//console.log(changeContentButton);
//console.log(originalContent);

// 切换内容
// changeContentButton.addEventListener('click', () => {
//     // function loadScript(src, callback) {
//     const script = document.createElement("script");
//     script.src = src;
//     //script.onload = callback; // 加载完成后执行回调函数
//     document.head.appendChild(script);
//     // }

//     // loadScript("/js/playlist_square.js", function () {
//     //     console.log("另一个脚本已加载");
//     // });

// });

import './music_get_play.js'//'./'表示当前目录
import './playlists-box.js'

let recBox = document.querySelector('.playlist_square_rec_box ');
//let recBox = document.querySelector('.playlist_square ');
fetch('http://localhost:3000/personalized').then(data => data.json()).then(data => {
    const size = data.result.length;
    addBoxes(size);
    const boxes = document.querySelectorAll('.playlist_square_rec_box .box');
    addMessage(boxes);


    const script = document.createElement('script');
    //由于动态添加因此在这里调用get and ply
    script.src = '/js/music_get_play.js';
    document.body.appendChild(script);
});

function addMessage(boxes) {
    fetch('http://localhost:3000/personalized').then(data => data.json()).then(data => {
        boxes.forEach((box, index) => {
            const item = data.result[index];
            if (item) {
                const topDiv = box.querySelector('.top');
                const bottomDiv = box.querySelector('.bottom');
                const img = box.querySelector('img');

                const playlistId = box.querySelector('.playlistId');

                if (topDiv) {
                    if (item.playCount >= 100000000) { // 大于等于1亿
                        topDiv.textContent = '▶' + (item.playCount / 100000000).toFixed(1) + '亿';
                    } else if (item.playCount >= 10000) { // 大于等于1万
                        topDiv.textContent = '▶' + (item.playCount / 10000).toFixed(1) + '万';
                    } else { // 小于1万
                        topDiv.textContent = '▶' + item.playCount.toString();
                    }
                }

                if (bottomDiv) {
                    bottomDiv.textContent = item.name;
                }

                if (img) {
                    img.src = item.picUrl;
                    img.alt = item.name; // 设置 alt 属性为 name
                }

                if (playlistId) {
                    playlistId.textContent = item.id;
                }
            }
        })

        //
    });


}
// 动态添加盒子
function addBoxes(data) {
    while (data--) {
        // 创建盒子
        const box = document.createElement('a');
        box.className = 'box playlist';
        box.href = '#playlist_page';
        // 创建顶部
        const top = document.createElement('div');
        top.className = 'top';
        // 创建图片
        const img = document.createElement('img');
        // 创建底部
        const bottom = document.createElement('div');
        bottom.className = 'bottom';
        //加入歌单id
        const playlistId = document.createElement('div');
        playlistId.className = 'playlistId';
        // 将子元素添加到盒子中
        box.appendChild(top);
        box.appendChild(img);
        box.appendChild(bottom);
        box.appendChild(playlistId);
        // 将盒子添加到容器中
        recBox.appendChild(box);
    }
}






