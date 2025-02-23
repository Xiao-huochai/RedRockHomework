// const avatarElement = document.getElementById('avatar');
// const usernameElement = document.getElementById('username');
// function setUserInfo(avatarUrl, username) {
//     avatarElement.src = avatarUrl;
//     usernameElement.textContent = username;
// }
// function getUserId() {
//     fetch('http://localhost:3000/user/account').then(data => { return data.json() }).then(data => { return data.account.id })
// }



// function emm(uid) {
//     const cookie = '00311964E03ABC89BC6F21EE5029586418A8EADDFAE7AB7785D066CF074D10547989A55D4E264CE03581699E5887C290122D0121266BFF71691A9564EC55D61B5A3A7F44C0BA4CB8170B89CE3AB0512E759EAE9C0ECB10B4DB4A3BF822AC7FAFD5177BA0C5686D6E5FA2067E764C4E8E5099CBDC36546E6E49454E1C66BF9F1D0273C94713FA4BA5F5ACE6EAF618108AB3EA695BDDFC328AF304ED3683932CD2884236B69316786843A3CD5313EBEB7705E380B6EA6A2C596342E21DD659420F4655DAA6DE6B9F43E017CBCC03397FDBA9573C246295C76F523E15DBD6BBEA4D6E2078671C9AD1F4F52B5FAE29419CC7C10E06CF862F0AF9DC20ED6263094C0BDCA89EC367CA1299622F28B32875610D2C231801ADAF366F0576CD3AF16CDC720BF97B0DB9620D209FE850F95FAEB05FFB976BC6B1B694C289ABD88CDC11E81D887FAD12404832D51C6DCD7AEFF069FDFC2AE6436DE0D43A4CCBC2975C9159AB79';
//     fetch(`http://localhost:3000/user/detail?uid=${uid}&cookie=${cookie}`)
//         .then((data) => data.json())
//         .then((data) => {
//             setUserInfo(data.profile.avatarUrl, data.profile.nickname);
//         })
// }

// async function setUser() {
//     const userId = await getUserId();
//     await emm(userId);
// }
// setUser();

const avatarElement = document.getElementById('avatar');
const usernameElement = document.getElementById('username');
function setUserInfo(avatarUrl, username) {
    avatarElement.src = avatarUrl;
    usernameElement.textContent = username;
}
async function getUserId() {
    return fetch('http://localhost:3000/user/account').then(data => { return data.json() }).then(data => {
        console.log(data.account.id);
        return data.account.id
    })
}

//不知道为什么得不到登录的userid 索性就不用了
async function name_s() {
    const userId = await getUserId();
    console.log(userId);

    const cookie = '00311964E03ABC89BC6F21EE5029586418A8EADDFAE7AB7785D066CF074D10547989A55D4E264CE03581699E5887C290122D0121266BFF71691A9564EC55D61B5A3A7F44C0BA4CB8170B89CE3AB0512E759EAE9C0ECB10B4DB4A3BF822AC7FAFD5177BA0C5686D6E5FA2067E764C4E8E5099CBDC36546E6E49454E1C66BF9F1D0273C94713FA4BA5F5ACE6EAF618108AB3EA695BDDFC328AF304ED3683932CD2884236B69316786843A3CD5313EBEB7705E380B6EA6A2C596342E21DD659420F4655DAA6DE6B9F43E017CBCC03397FDBA9573C246295C76F523E15DBD6BBEA4D6E2078671C9AD1F4F52B5FAE29419CC7C10E06CF862F0AF9DC20ED6263094C0BDCA89EC367CA1299622F28B32875610D2C231801ADAF366F0576CD3AF16CDC720BF97B0DB9620D209FE850F95FAEB05FFB976BC6B1B694C289ABD88CDC11E81D887FAD12404832D51C6DCD7AEFF069FDFC2AE6436DE0D43A4CCBC2975C9159AB79';
    fetch(`http://localhost:3000/user/detail?uid=3532734094&cookie=${cookie}`)
        .then((data) => data.json())
        .then((data) => {
            console.log(data);

            setUserInfo(data.profile.avatarUrl, data.profile.nickname);
        })
}
name_s();