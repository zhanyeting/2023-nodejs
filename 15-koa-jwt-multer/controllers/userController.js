const path = require('path');
const fs = require('fs').promises;
const UserService = require("../services/userService");
const JWT = require("../utils/jwt");

const UserController = {
    addUser: async(ctx) => {
        console.log("add === ", ctx.request?.body, ctx?.file);
        try {
            const data = await UserService.addUser({
                avatar: ctx?.file?.filename ? `/avatars/${ctx.file.filename}` : '',
                ...ctx.request?.body
            });
            ctx.body = {ok: data?.username ? 1 : 0,  data}
        } catch (error) {
            ctx.body = {ok: 0, error}
        }
    },

    updateUser: async(ctx) => {
        console.log("update === ", ctx.request?.body, ctx?.params?.id, ctx?.file);
        try {
            // 提前获取原来的 avatar 文件，更新后就拿不到这个值了
            const delAvatarUrl = await getAvatarById(ctx?.params?.id);

            const data = await UserService.updateUser({
                id: ctx?.params?.id,
                avatar: ctx?.file?.filename ? `/avatars/${ctx.file.filename}` : '',
                ...ctx.request?.body,
            });

            // 修改失败
            if (!data?.modifiedCount) {
                ctx.body = {ok: 0, data};
                return;
            }

            // 修改成功，需要删除原来的 avatar 文件
            if (delAvatarUrl && delAvatarUrl!== 'undefined') {
                console.log(path.join(__dirname, `../public`, delAvatarUrl));
                const res = await fs.unlink(path.join(__dirname, `../public`, delAvatarUrl))
                console.log(12121212, res);
            }
            ctx.body = {ok: 1, data};

        } catch (error) {
            ctx.body = {ok: 0, error}
        }
    },

    deleteUser: async(ctx) => {
        console.log("delete === ", ctx?.params?.id);
        try {
            // 提前获取原来的 avatar 文件，删掉了就拿不到这个值了
            const delAvatarUrl = await getAvatarById(ctx?.params?.id);
            console.log(100000, delAvatarUrl);

            const data = await UserService.deleteUser(ctx?.params?.id);
            // 删除失败
            if (!data?.deletedCount) {
                ctx.body = {ok: 0, data};
                return;
            }

            // 删除成功，需要删除原来的 avatar 文件
            if (delAvatarUrl) {
                console.log(path.join(__dirname, `../public`, delAvatarUrl));
                const res = await fs.unlink(path.join(__dirname, `../public`, delAvatarUrl))
                console.log(12121212, res);
            }
            ctx.body = {ok: 1, data};

        } catch (error) {
            ctx.body = {ok: 0, error}
        }

    },

    getUser: async(ctx) => {
        console.log("getUser === ", ctx?.query);
        try {
            const data = await UserService.getUser(ctx?.query);
            ctx.body = {ok: 1,  data}
        } catch (error) {
            ctx.body = {ok: 0, error}
        }
    },

    login: async(ctx) => {
        console.log("login === ", ctx.request?.body);
        try {
            const {username, password} = ctx.request?.body || {};
            const data = await UserService.login(username, password);
            // ctx.body = {ok: data?.length ? 1 : 0,  data}

            if (data?.length) {
                // 生成token
                const token = JWT.generate({
                    _id: data[0]?._id,
                    username: data[0]?.username,
                });
                //token返回在header
                ctx.set("Authorization", token);
                ctx.body = {ok: 1, data}
            } else {
                ctx.body = {ok: 0, data}
            }
        } catch (error) {
            ctx.body = {ok: 0, error}
        }
    }
}

const getAvatarById = async (id) => {
    try {
        const data = await UserService.getAvatarById(id);
        return data?.avatar;
    } catch (error) {
        return false;
    }
}
module.exports = UserController;