import * as webpack from 'webpack';
import * as path from 'path';

export default {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'a-module.js',
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{loader: 'awesome-typescript-loader'}]
            }
        ]
    }
} as webpack.Configuration;