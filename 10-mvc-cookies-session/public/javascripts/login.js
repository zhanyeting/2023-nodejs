const username = document.querySelector('#username');
const password = document.querySelector('#password');
const loginBtn = document.querySelector('#login');
const errorTag = document.querySelector('.error');

loginBtn.onclick = () => {
    if (!username?.value || !password?.value) {
        alert('请先输入用户名和密码');
    } else {
        fetch('/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            })
        }).then(res => res.json()).then(res => {
            if (res.ok === 1) {
                location.href = '/';
            } else {
                errorTag.innerHTML = '用户名和密码不正确！'
            }
        })
    }
}