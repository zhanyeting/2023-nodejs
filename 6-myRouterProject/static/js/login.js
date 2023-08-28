var username = document.querySelector("#username");
var password = document.querySelector("#password");
var loginBtn = document.querySelector("#login");
var loginPostBtn = document.querySelector("#loginPost");

loginBtn.onclick = () => {
    
    fetch(`http://127.0.0.1:3000/api/login?username=${username.value}&password=${password.value}`)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if (res?.ok){
            // 登录成功，跳转到主页
            location.href = '/home';
        }
    })
}


loginPostBtn.onclick = function() {
    fetch(`/api/loginPost`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if (res?.ok){
            // 登录成功，跳转到主页
            location.href = '/home';
        }
    })
}
