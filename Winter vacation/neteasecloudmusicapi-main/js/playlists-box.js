// 获取所有 .box 元素
const boxes = document.querySelectorAll('.rec_box .box');
fetch('http://localhost:3000/recommend/resource').then(data => data.json()).then(data => {
    // 遍历每个 .box 
    boxes.forEach((box, index) => {
        // 获取当前 box 的数据
        const item = data.recommend[index];

        // 如果数据存在
        if (item) {
            // 获取 .top 和 .bottom 元素
            const topDiv = box.querySelector('.top');
            const bottomDiv = box.querySelector('.bottom');

            // 获取 img 元素
            const img = box.querySelector('img');

            const playlistId = box.querySelector('.playlistId');

            // 设置 .top 的文字为 id
            if (topDiv) {
                if (item.playcount >= 100000000) { // 大于等于1亿
                    topDiv.textContent = '▶' + (item.playcount / 100000000).toFixed(1) + '亿';
                } else if (item.playcount >= 10000) { // 大于等于1万
                    topDiv.textContent = '▶' + (item.playcount / 10000).toFixed(1) + '万';
                } else { // 小于1万
                    topDiv.textContent = '▶' + item.playcount.toString();
                }
            }

            // 设置 .bottom 的文字为 name
            if (bottomDiv) {
                bottomDiv.textContent = item.name;
            }

            // 设置 img 的 src 为 picUrl
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