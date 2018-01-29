import * as webpack from 'webpack';
import * as path from 'path';

const modules = { BModule:'@mytest/b-module' };
function getExposeRules(rootConst): webpack.Rule[] {
    const rules: webpack.Rule[] = [];
    for (const m in modules) {
        rules.push({
            test: require.resolve(modules[m]),
            use: [{
                loader: 'expose-loader',
                options: `${rootConst}__${modules[m]}`
            }]
        })
    }

    return rules;
}

function makeid() {
    const possibleChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        possible = possibleChar + '0123456789';

    const getChar = list => list.charAt(Math.floor(Math.random() * list.length));
    let text = getChar(possibleChar);
    for (let i = 0; i < 5; i++) {
        text += getChar(possible);
    }

    return text;
}

function buildImportsString(): string {
    const ret = [];
    for (const m in modules) {
        ret.push(`${makeid()}=${modules[m]}`);
    }

    return ret.join(',');
}

const config: webpack.Configuration = {
    entry: {
        app: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [
                ...getExposeRules('__externals'),
            {
                test: /index\.ts$/,
                use: 'imports-loader?' + buildImportsString(),
            },
            {
                test: /\.tsx?$/,
                use: [
                    'awesome-typescript-loader'
                ],
            }
        ]
    },
    plugins: [
        // new webpack.ProvidePlugin(getExternals('__externals')),
        // new webpack.ContextReplacementPlugin(
        //     /^@mytest/,
        //     path.resolve(__dirname, 'node_modules/@mytest'),
        //     false,
        //     /(b-module)/
        // ),
        // new webpack.ContextReplacementPlugin(
        //     /@mytest/,
        //     false
        // ),
    ]
};

export default config;