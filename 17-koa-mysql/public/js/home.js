const addBtn = document.querySelector('#addBtn');
const updateBtn = document.querySelector('#updateBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const queryStuBtn = document.querySelector('#queryStu');

const tbody = document.querySelector('#tbody');
const tbodyPage = document.querySelector('#tbody-page');

const classSel = document.querySelector('#class_id');
const gradeSel = document.querySelector('#grade_id');
const queryClassSel = document.querySelector('#query_class_id');
const queryGradeSel = document.querySelector('#query_grade_id');


addBtn.onclick = function() {
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    const gender = document.getElementById('gender').value;
    const class_id = document.getElementById('class_id').value;
    const grade_id = document.getElementById('grade_id').value;
    console.log(1000, name, score, gender, class_id, grade_id);

    fetch('/api/student', {
        method: 'post',
        body: JSON.stringify({
            name, score, gender: parseInt(gender), 
            class_id: parseInt(class_id), 
            grade_id: parseInt(grade_id),
        }),
        headers: {
            'Content-Type': 'application/json;charset=uft-8'
        }
    }).then(res => res.json()).then(res=>{
        if(res?.ok) {
            getAllStu();
        } else {
            alert('添加失败')
        }
    })
}

updateBtn.onclick = function() {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    const gender = document.getElementById('gender').value;
    const class_id = document.getElementById('class_id').value;
    const grade_id = document.getElementById('grade_id').value;
    console.log(1000, id, name, score, gender, class_id, grade_id);

    fetch('/api/student/'+id, {
        method: 'put',
        body: JSON.stringify({
            name, score, gender: parseInt(gender), 
            class_id: parseInt(class_id), 
            grade_id: parseInt(grade_id),
        }),
        headers: {
            'Content-Type': 'application/json;charset=uft-8'
        }
    }).then(res => res.json()).then(res=>{
        if(res?.ok) {
            getAllStu();
        } else {
            alert('更新失败')
        }
    })
}

deleteBtn.onclick = function() {
    const id = document.getElementById('deleteId').value;
    console.log("delete ===", id);

    fetch('/api/student/'+id, {
        method: 'delete',
        body: '',
        headers: {
            'Content-Type': 'application/json;charset=uft-8'
        }
    }).then(res => res.json()).then(res=>{
        if(res?.ok) {
            getAllStu();
        } else {
            alert('删除失败')
        }
    })
}

getAllStu()
function getAllStu (){
    fetch('/api/student').then(res => res.json()).then(res => {
        tbody.innerHTML = (res?.data || []).map(item => {
            return `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.score}</td>
                    <td>${item.gender===2 ? '女' : '男'}</td>
                    <td>${item.className}</td>
                    <td>${item.gradeName}</td>
                </tr>
            `
        }).join('')
    })
}

getClasses()
function getClasses () {
    fetch('/api/classes').then(res => res.json()).then(res=>{
        const innerHTML = (res?.data || []).map(item=>{
            return `
                <option value=${item.id}>${item.name}</option>
            `
        }).join('');

        classSel.innerHTML = innerHTML;
        classSel.value = res?.data[0]?.id || 1;
        queryClassSel.innerHTML = innerHTML;
        queryClassSel.value = res?.data[0]?.id || 1;

    })
}

getGrades()
function getGrades () {
    fetch('/api/grades').then(res => res.json()).then(res=>{
        const innerHTML = (res?.data || []).map(item=>{
            return `
                <option value=${item.id}>${item.name}</option>
            `
        }).join('');

        gradeSel.innerHTML = innerHTML;
        gradeSel.value = res?.data[0]?.id || 1;
        queryGradeSel.innerHTML = innerHTML;
        queryGradeSel.value = res?.data[0]?.id || 1;
    })
}

queryGradeSel.onclick = () => {
    const gradeId = queryGradeSel.value;
    const classId = queryClassSel.value;
    getStuByGradeByClass(gradeId, classId);
};
queryClassSel.onclick = () =>{
    const gradeId = queryGradeSel.value;
    const classId = queryClassSel.value;
    getStuByGradeByClass(gradeId, classId);
};
// 根据年级和班级查询 学生信息
getStuByGradeByClass(1,1);
function getStuByGradeByClass(gradeId, classId) {
    fetch(`/api/stuByGradeByClass?gradeId=${gradeId}&classId=${classId}`)
    .then(res => res.json()).then(res => {
        tbodyPage.innerHTML = (res?.data || []).map(item => {
            return `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.score}</td>
                <td>${item.gender===2 ? '女' : '男'}</td>
                <td>${item.gradeName}</td>
                <td>${item.className}</td>
            </tr>
            `
        }).join('');
    })
}