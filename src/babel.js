async function start() {
    return await Promise.resolve('async is working')
}

const unusedVar = 'ho ho ho';
start().then(console.log);


import ('lodash').then(_ => {
    console.log('lodash',_.random(0, 42, true))
});
