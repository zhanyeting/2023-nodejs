const UserService = require("../services/userService")

const UserController = {
    addUser: async (ctx) => {
        console.log(" add===", ctx.request.body, ctx.file);
        const data = await UserService.addUser(ctx.request.body);
        ctx.body = {
            ok: 1,
            data,
        }
    },

    updateUser: async(ctx) => {
        console.log("update ===", ctx.request.body, ctx.params.id, ctx.file);
        const data = await UserService.updateUser({
            id:ctx.params.id, 
            ...ctx.request.body
        });
        ctx.body = {
            ok: 1,
            data,
        }
    },

    deleteUser: async(ctx) => {
        console.log(" delete ===", ctx.params.id);
        await UserService.deleteUser(ctx.params.id).then(data => {
            ctx.body = {ok: 1, data}
        }).catch(err => {
            ctx.body = {ok: 0, err}
        });
    },

    getUser: async(ctx) => {
        const {pageNo, pageSize} = ctx.query;
        const data = await UserService.getUser(pageNo, pageSize);
        ctx.body = {
            ok: 1, 
            data,
        }
    },

    login: async(ctx) => {
        console.log('login === ', ctx.request?.body, );
        try {
            const {username, password} = ctx.request.body;
            const data = await UserService.login(username, password);
            console.log(data);
            if (data?.length > 0) {
                // 设置session
                ctx.session.user = {
                    id: data._id,
                    username: data.username,
                }
                ctx.body = {ok: 1, data}
                return;
            }
            ctx.body = {ok: 0}
        } catch (err) {
            ctx.body = {ok:0, err}
        }
    }

}

module.exports = UserController;