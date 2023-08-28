const Router = require('koa-router');
const promisePool = require('../config/mysqlConfig');
const router = new Router();

router.get('/student', async(ctx) => {
    console.log("get ==== ", ctx?.query);
    const {pageNo, pageSize} = ctx?.query || {};
    if (pageNo && pageSize) {
        return;
    }
    
    const data = await promisePool.query(`
        select s.id id, s.name, s.score, s.gender, s.class_id cid, c.name className, s.grade_id gid, g.name gradeName
        from students s 
        inner join classes c 
        on s.class_id=c.id 
        inner join grades g 
        on s.grade_id=g.id 
    `);
    // const data = await promisePool.query(`
    //     select s.id id, s.name, s.score, s.gender, s.class_id cid, c.name className
    //     from students s 
    //     inner join classes c 
    //     on s.class_id=c.id 
    // `);
    if (data[0]?.length) {
        ctx.body = {ok: 1, data: data[0]};
    } else {
        ctx.body = {ok: 0, data: data[0], err: 'students not exist'}
    }
})
.post('/student', async(ctx) => {
    console.log("add ==== ", ctx?.request?.body);
    const {name, score, gender, class_id, grade_id} = ctx?.request?.body || {};
    const data = await promisePool.query(
        // `insert into students(name, score, gender, class_id, grade_id) values ("${name}", ${score}, ${gender}, ${class_id}, ${grade_id}) `
        `insert into students(name, score, gender, class_id, grade_id) values (?, ?, ?, ?, ?) `,
        [name, score, gender, class_id, grade_id]
    );
    if (data[0]?.affectedRows) {
        ctx.body = {ok: 1, data: data[0]}
        return ;
    }
    ctx.body = {ok: 0, data: data[0], err: "add failed"}
})
.put('/student/:id', async(ctx) => {
    console.log("update ==== ", ctx?.request?.body, ctx?.params?.id);
    const {name, score, gender, class_id, grade_id} = ctx?.request?.body || {};
    const data = await promisePool.query(
        `update students set name=?, score=?, gender=?, class_id=?, grade_id=? where id=? `,
        [name, score, gender, class_id, grade_id, ctx?.params?.id]
    );
    if (data[0]?.affectedRows) {
        ctx.body = {ok: 1, data: data[0]}
        return ;
    }
    ctx.body = {ok: 0, data: data[0], err: "update failed"}
})
.del('/student/:id', async(ctx) => {
    console.log("delete ==== ", ctx?.params?.id);

    const data = await promisePool.query(`delete from students where id=? `, [ctx?.params?.id])
    if (data[0]?.affectedRows) {
        ctx.body = {ok: 1, data: data[0]}
        return ;
    }
    ctx.body = {ok: 0, data: data[0], err: "delete failed"}
});

router.get('/classes', async(ctx) => {
    const data = await promisePool.query(`select * from classes`)
    ctx.body = {
        ok: data[0]?.affectedRows ? 1 : 0,
        data: data[0],
    }
});

router.get('/grades', async(ctx) => {
    const data = await promisePool.query(`select * from grades`)
    ctx.body = {
        ok: data[0]?.affectedRows ? 1 : 0,
        data: data[0],
    }
});

router.get('/stuByGradeByClass', async(ctx) => {
    console.log("stuByGradeByClass === ", ctx?.query);
    const {gradeId, classId} = ctx?.query || {};
    const data = await promisePool.query(`
        select s.id id, s.name, s.score, s.gender, s.class_id cid, c.name className, s.grade_id gid, g.name gradeName
        from students s 
        inner join classes c 
        on s.class_id=c.id 
        inner join grades g 
        on s.grade_id=g.id 
        where s.grade_id=? and s.class_id=? 
    `, [gradeId, classId]);
    ctx.body = {ok: 1, data: data[0]};
})
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
module.exports = router;