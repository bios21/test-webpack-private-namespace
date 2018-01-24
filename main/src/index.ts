import {AModule} from '@mytest/a-module';

(async () => {
    const list = {BModule: '/b-module'};
    for (const name in list) {
        console.log(`Try to import ${name} from @mytest${list[name]}`);
        const m = await import(`@mytest${list[name]}`);
        console.log(new m[name]());
    }
})().then(() => {
    new AModule();
}).catch(e => {
    console.warn('Something went wrong : ', e);
});