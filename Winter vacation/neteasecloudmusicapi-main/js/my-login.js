//const qrImg = document.getElementById('qrImg');
import './avater-nickname.js';
// 获取 key
function getQRKey() {
    return fetch(`http://localhost:3000/login/qr/key?timestamp=${Date.now()}`)
        .then(response => {
            return response.json();
        }).then(x => {
            return x.data.unikey;
        })
}
// 获取二维码图片
function getQRCodeImage(key) {
    return fetch(`http://localhost:3000/login/qr/create?key=${key}&timestamp=${Date.now()}&qrimg=1`)
        .then(response => { return response.json(); })
        .then(data => {
            console.log(data);
            return data.data.qrimg
        }) // 假设返回的数据中有二维码图片的 URL
}

function checkLoginStatus(key) {
    return fetch(`http://localhost:3000/login/qr/check?key=${key}&timestamp=${Date.now()}`)
        .then(response => {
            return response.json();
        })
}

// 轮询检查登录状态
async function pollLoginStatus(key) {
    while (true) {
        const statusData = await checkLoginStatus(key);
        console.log('Login Status:', statusData);

        if (statusData.code === 800) {
            console.log('二维码已过期，请重新获取二维码。');
            break;
        } else if (statusData.code === 801) {
            console.log('等待扫码...');
        } else if (statusData.code === 802) {
            console.log('已扫码，等待确认...');
        } else if (statusData.code === 803) {
            console.log('授权登录成功！');
            break;
        }

        // 等待 2 秒后继续轮询
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}
// 主逻辑
async function main() {
    try {
        // 1. 获取 key
        const key = await getQRKey();
        console.log('QR Key:', key);

        // 2. 获取二维码图片
        const qrCodeUrl = await getQRCodeImage(key);
        //qrImg.src = qrCodeUrl;
        console.log('QR Code URL:', qrCodeUrl);

        // 3. 开始轮询检查登录状态
        await pollLoginStatus(key);
    } catch (error) {
        console.error('Error in main process:', error);
    }
}

// 执行主逻辑
main();