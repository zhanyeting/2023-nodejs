const registerBtn = document.querySelector('#registerBtn');
const logoutBtn = document.querySelector('#logout');
const updateBtn = document.querySelector('#updateBtn');
const deleteBtn = document.querySelector('#deleteBtn');

const tbody = document.querySelector('#tbody');
const tbodyPage = document.querySelector('#tbody-page');
const pageInput = document.querySelector('#pageInput');


registerBtn.onclick = () => {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const age = document.getElementById('age');
    const avatar = document.getElementById('avatar');
    console.log(100, username.value, password.value, age.value, avatar?.files);

    const formdata = new FormData();
    formdata.append('username', username.value);
    formdata.append('password', password.value);
    formdata.append('age', age.value);
    formdata.append('avatar', avatar?.files?.[0]);

    axios.post('/api/user', formdata, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }).then(res => {
        if (res?.data?.ok) {
            getListAll();
            getListByPage();
        } else {
            alert('添加用户 失败！')
        }
    })
}

updateBtn.onclick = async () => {
    const updateId = document.getElementById('updateId');
    if (!updateId.value) {
        alert('请先输入 id ');
        return;
    }

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const age = document.getElementById('age');
    const avatar = document.getElementById('avatar');
    console.log(200, username.value, password.value, age.value, avatar?.files);

    const formdata = new FormData();
    formdata.append('username', username.value);
    formdata.append('password', password.value);
    formdata.append('age', age.value);
    formdata.append('avatar', avatar?.files?.[0]);

    await axios.put(`/api/user/${updateId.value}`, formdata, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }).then(res => {
        if (res?.data?.ok) {
            getListAll();
            getListByPage();
        } else {
            alert('更新用户 失败！')
        }
    })
}

deleteBtn.onclick = () => {
    const deleteId = document.getElementById('deleteId');
    if (!deleteId.value) {
        alert('请先输入 id ');
        return;
    }

    axios.delete('/api/user/'+deleteId.value).then(res => {
        if (res?.data?.ok) {
            getListAll();
            getListByPage();
        } else {
            alert('删除用户 失败！')
        }
    })
}



getListAll();
function getListAll(){
    axios.get('/api/user').then(res => {
        tbody.innerHTML = (res?.data?.data || []).map(item => `
          <tr>
            <td>${item._id}</td>
            <td>${item.username}</td>
            <td>${item.password}</td>
            <td>${item.age}</td>
            <td>${item.avatar && item.avatar!=='undefined' ? '<img src="'+item.avatar+'" />' : ''}</td>
            <td>${item.avatar}</td>
          </tr>
        `).join('');
    })
}

getListByPage();
function getListByPage(pageNo = 1){    
    axios.get(`/api/user?pageNo=${pageNo}&pageSize=2`).then(res => {
        tbodyPage.innerHTML = (res?.data?.data || []).map(item => `
          <tr>
            <td>${item._id}</td>
            <td>${item.username}</td>
            <td>${item.age}</td>
          </tr>
        `).join('');
    })
}

logoutBtn.onclick = () => {
    localStorage.removeItem('token');
    location.href = '/login';
}
