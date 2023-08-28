const { execSync } = require('child_process');
const { join } = require('path');
const fs = require('fs');
const colors = require('colors');

(() => {
    const packagesDir = join(__dirname, '..', 'packages'); // 您的 packages 文件夹路径

    function installDependencies(packageDir) {
        const packageJsonPath = join(packageDir, 'package.json');

        // 检查是否存在 package.json 文件
        if (!fs.existsSync(packageJsonPath)) {
            console.log(colors.blue(`No package.json found in ${packageDir}. Skipping.`));
            return;
        }

        console.log(colors.blue(`Installing dependencies in ${packageDir}...`));

        try {
            // 在 packageDir 中运行 npm install 命令
            execSync('yarn', {
                cwd: packageDir,
                stdio: 'inherit', // 将子进程的输出流连接到父进程
            });
            console.log( colors.blue(`Dependencies installed in ${packageDir}.`));
        } catch (error) {
            console.log( colors.red(`Error installing dependencies in ${packageDir}: ${error}`),);
        }
    }

    // 获取 packages 文件夹下的子文件夹列表
    const packageFolders = fs.readdirSync(packagesDir);

    // 遍历每个子文件夹并安装依赖
    for (const packageFolder of packageFolders) {
        const packageDir = join(packagesDir, packageFolder);
        installDependencies(packageDir);
    }

    console.log( colors.green(`All dependencies installed.`));
})()
