var username = document.querySelector("#username");
var password = document.querySelector("#password");
var loginBtn = document.querySelector("#login");
var errorTag = document.querySelector('.error');

loginBtn.onclick = function() {
    fetch(`/login`, {
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
            location.href = '/';
        } else {
            errorTag.innerHTML = '用户名和密码错误'
        }
    })
}
