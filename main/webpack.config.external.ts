import * as webpack from 'webpack';
import * as path from 'path';

export default {
    entry:   {
        external: ['@mytest/b-module'],
    },
    output:  {
        path:     path.resolve(__dirname, 'dist'),
        filename: 'external.js',
        library:  'external_lib',
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'external_lib',
            path: './dist/external-manifest.json',
        }),
    ],
} as webpack.Configuration;