const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.ts', // Point d'entrée de votre application
    target: 'node', // Spécifie que le bundle est pour Node.js, pas pour le navigateur
    externals: [nodeExternals()], // Exclut `node_modules` du bundle
    output: {
        path: path.resolve(__dirname, 'package'),
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'production', // Peut être changé à 'development' pour un build non minifié
};
