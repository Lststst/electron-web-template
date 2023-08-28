
const which = require('which');
const colors = require('colors');
const { spawn } = require('child_process');

(async () => {
    if (!process.argv.includes('--tst') && !process.argv.includes('--pro')) {
        console.log(colors.red('添加 --[tst|pro] 指定打包环境。'))
        process.exit();
    }
    const isTst = process.argv.includes('--tst');
    const isPro = process.argv.includes('--pro');
    const yarn = which.sync('yarn');
    // 等待 webChild 执行完毕
    const webChild = spawn(yarn, ['run', isTst ? 'tst' : 'build'], { cwd: `./packages/web`, stdio: 'inherit' });
    const webBuildResult = await new Promise((resolve) => webChild.on('close', resolve));
    if (webBuildResult !== 0) { console.log('spawn web build encountered an error.'); process.exit() };
    const electronChild = spawn(yarn, ['run', isTst ? 'tst' : 'build'], { cwd: `./packages/electron`, stdio: 'inherit' });
    const electronBuildResult = await new Promise((resolve) => electronChild.on('close', resolve));
    if (electronBuildResult !== 0) { console.log('spawn electron build encountered an error.'); process.exit() };
    console.log('Both webChild and electronChild have completed successfully.')
    // 等待 electronChild 执行完毕
})()