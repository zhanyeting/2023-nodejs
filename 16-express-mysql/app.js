const express = require('express');
const promisePool  = require('./config/mysqlConfig');

const app = express();
const port = 9000;

// 查询全部
app.use('/', async (req, res) => {
    const data = await promisePool.query(`select * from students`);
    // const data = await promisePool.execute(`select * from students`);
    if (data[0]?.length > 0) {
        res.send({ok: 1, data: data[0]});
        return;
    }
    res.send({ok: 0, err: 'users not exist!'})
});

// 插入数据
/* app.use('/', async (req, res) => {
    const stu = {
        name: 'wangwu',
        score: 100,
        gender: 1,
        class_id: 2,
    };
    const {name, score, gender, class_id} = stu;
    // const data = await promisePool.query(
    //     `insert into students( name, score, gender, class_id) 
    //     values ("${name}", "${score}", "${gender}", "${class_id}")`
    // );
    const data = await promisePool.query(
        `insert into students( name, score, gender, class_id) 
        values ("?", "?", "?", "?")`,
        [name, score, gender, class_id]
    );
    if (data[0]?.affectedRows > 0) {
        res.send({ok: 1, data: data[0]});
        return;
    }
    res.send({ok: 0, err: 'update fail',})
}); */

// 修改数据
/* app.use('/', async(req, res) => {
    const stu = {
        name: 'wangwu',
        score:  60,
        gender: 1,
        class_id: 1,
        // id: 7
    };
    const {name,  score, class_id, } = stu;
    // const data = await promisePool.query(
    //     `update students set name=?, score=?, gender=?, class_id=? where id=? `,
    //     [name, score, gender, class_id, id]
    // );
    // 将所有名字为 wangwu 的，改成一班
    const data = await promisePool.query(
        `update students set score=?, class_id=? where name=? `,
        [score, class_id, name]
    );

    if (data[0]?.affectedRows > 0){
        res.send({ok: 1, data: data[0]});
        return;
    }
    res.send({ok: 0, err: "update fail", data: data[0]})
}); */

// 删除数据
/* app.use('/', async(req, res) => {
    const id = 7;
    const data = await promisePool.query(`delete from students where id=? `, [id]);
    if (data[0]?.affectedRows > 0) {
        res.send({ok: 1, data: data[0]});
        return;
    }
    res.send({ok: 0, err: 'delete fail', data: data[0]})
}) */


/* 
查询：
promisePool.query('select * from users');

插入：
promisePool.query('INSERT INTO `users`(`id`,`name`,`age`, `password`) VALUES (?,?,?,?)',[null,"kerwin",100,"123456"]);

更新：
promisePool.query(`UPDATE users SET name = ? ,age=? WHERE id = ?`,["xiaoming2",20,1])

删除：
promisePool.query(`delete from users where id=?`,[1])
*/

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
