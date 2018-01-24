import * as webpack from 'webpack';
import * as path from 'path';

export default [
    {
        name: 'pre-dll',
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
    },
    {
        name: 'base',
        entry:   {
            app:    './src/index.ts',
            // vendor: ['@mytest/a-module'],
        },
        output:  {
            path:     path.resolve(__dirname, 'dist'),
            filename: 'index.js',
        },
        module:  {
            rules: [
                {
                    test: /\.tsx?$/,
                    use:  [{loader: 'awesome-typescript-loader'}],
                },
            ],
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context:  '.',
                manifest: path.resolve(__dirname, 'dist/external-manifest.json'),
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name:      'vendor',
            //     minChunks: ({resource}) => /node_modules/.test(resource),
            // }),
        ],
    },
] as webpack.Configuration[];