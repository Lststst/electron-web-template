
const which = require('which');
const { spawn } = require('child_process');

(async () => {
    const yarn = which.sync('yarn');

    const webChild = spawn(yarn, ['run', 'build'], { cwd: `./packages/web`, stdio: 'inherit' });
    const webBuildResult = await new Promise((resolve) => webChild.on('close', resolve));
    if (webBuildResult !== 0) { console.log('spawn web build encountered an error.'); process.exit() };

    const electronChild = spawn(yarn, ['run', 'build'], { cwd: `./packages/electron`, stdio: 'inherit' });
    const electronBuildResult = await new Promise((resolve) => electronChild.on('close', resolve));
    if (electronBuildResult !== 0) { console.log('spawn electron build encountered an error.'); process.exit() };

    console.log('Both webChild and electronChild have completed successfully.')
    // 等待 electronChild 执行完毕
})()