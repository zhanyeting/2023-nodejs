const fs = require('fs').promises;
const fs2 = require('fs');
const { resolve } = require('path');

/***************     创建文件夹，并在文件夹中添加文件  ******************* */
fs.mkdir('./testDir').then(() => {
    console.log("文件夹 testDir 创建成功");
    createFile("./testDir", "hello world", 3);
    // fs.writeFile('./testDir/a.txt', "hello world").then(() => {
    //     console.log("xieru success");
    // }).catch((err) => {
    //     console.log("文件已存在 ===", err);
    // });
}).catch((err) => {
    console.log("文件夹 testDir 已存在 ==== ",err);
    createFile("./testDir", "hello world", 3);
});

// 批量创建文件
batchCreateDir('./testDir', 4);
function batchCreateDir(parentDir, count) {
    if (count <= 0) return;
    while(count) {
        const dirname = `${parentDir}/childDir${count}`;
        // 文件夹无论是否存在都要去写入文件
        fs.mkdir(dirname).then(() => {
            console.log(`文件夹 ${dirname} 创建成功`);
            createFile(dirname, "hello world", 3);
        }).catch((err) => {
            console.log(`文件夹 ${dirname} 已存在 ==== `,err);
            createFile(dirname, "hello world", 4);
        });
        count --;
    }
}

function createFile(parentDir, fileContent, count) {
    if (count <= 0) return;
    while (count) {
        fs.writeFile(
            `${parentDir}/${count}.txt`, 
            fileContent + `\n ${String(count).repeat(10)}`
        ).then((res) => {
            console.log(`文件 ${parentDir}/${count}.txt  写入成功  `, res);
        }).catch((err) => {
            console.log(`文件 ${parentDir}/${count}.txt 已存在 ===`, err);
        });
        count --;
    }
}

/***************     使用流来读写文件  ******************* */
const rs = fs2.createReadStream('./test.js');
fs.mkdir('./testDir').then(() => {
    console.log("文件夹 testDir 创建成功");
    writeStream('./testDir', 1);
}).catch((err) => {
    console.log("文件夹 testDir 已存在 ==== ",err);
    writeStream('./testDir', 2);
});

function writeStream(parentDir, count){
    if (count <= 0) return;
    while (count) {
        const ws = fs2.createWriteStream(`${parentDir}/stream${count}.txt`);
        rs.pipe(ws)
        count --;
    }
}


/***************     删除文件夹下面所有的 文件夹和文件  ******************* */
setTimeout(() => {
    deleteDir('./testDir');   // 设置定时器5秒后删除
}, 5000);

async function deleteDir(path){
    // 读取文件/目录信息,
    const dataList = await fs.readdir(path).then(data => data).catch((err) => {
        console.log(`读取文件夹 ${path} 失败。。。。`, err);
    });

    // 目录为空，直接删除
    if (dataList?.length === 0) {
        fs.rmdir(path).then(() => {
            console.log(`文件夹  ${path} 删除成功`);
        }).catch((err) => {
            console.log(`文件夹  ${path} 删除失败....`, err);
        });
        return ;
    }

    // 遍历所有文件信息，判断是文件夹还是文件，得先删除文件下的文件，才能删除文件夹。
    Promise.all((dataList || []).map(item => {
        return new Promise(async (resolve, reject) => {
            const stats = await fs.stat(`${path}/${item}`).then(stats => stats).catch((err) => {
                console.log(`error === `, err);
            });
            console.log(`${path}/${item} ==== `, stats?.isDirectory(), stats?.isFile());
            if (stats?.isFile()) {
                //删除文件
                await fs.unlink(`${path}/${item}`).then(() => {
                    console.log(`${path}/${item} 文件删除成功`);
                }).catch((err) => {
                    console.log(`${path}/${item} 文件删除失败。。。。`, err);
                });
            } else {
                // 递归删除文件夹下的文件
                await deleteDir(`${path}/${item}`);
            }
            resolve('');
        })
    })).then(res => {
        console.log(res)
        fs.rmdir(path).then(() => {
            console.log(`文件夹  ${path} 删除成功`);
        }).catch((err) => {
            console.log(`文件夹  ${path} 删除失败....`, err);
        });
    })
}





