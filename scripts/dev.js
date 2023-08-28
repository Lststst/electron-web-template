
const which = require('which');
const portfinder = require('portfinder');
const { spawn } = require('child_process');


(async () => {
    const port = await portfinder.getPortPromise();
    process.env.webDevPort = port;
    const yarn = which.sync('yarn');
    const webChild = spawn(yarn, ['run', 'dev', `--port=${process.env.webDevPort}`], { cwd: `./packages/web`, stdio: 'pipe' });
    webChild.stdout.on('data', (data) => {
        if(data.toString().indexOf('Local') !== -1 ){
            const electronChild = spawn(yarn, ['run', 'dev'], { cwd: `./packages/electron`, stdio: 'inherit' });
            electronChild.on('exit', (code, signal) => {
                process.exit();
            });
        }
    })
})()