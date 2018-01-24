import * as webpack from 'webpack';
import * as path from 'path';

export default {
    entry: {
        app: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{loader: 'awesome-typescript-loader'}],
            }
        ]
    },
    plugins: [
    ]
} as webpack.Configuration;