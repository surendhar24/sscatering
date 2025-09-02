/* eslint-disable import/no-extraneous-dependencies */
const semanticUi = require('@semantic-ui-react/craco-less');
const path = require('path');
require('dotenv').config();
// const CracoLessPlugin = require('craco-less');
// const path = require('path');
/*
comment
name(module) {
  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
  return `npm.${packageName.replace('@', '')}`;
},
*/

const getMonacoRelatedPkgDir = () => process.env.REACT_APP_MONACO_REL_PKG_DIR || 'node_modules';

const monacoRelatedPkgList = [
  'monaco-languageclient',
  'vscode-languageclient',
  '@monaco-editor',
  'monaco-editor',
  'vscode-jsonrpc',
  'vscode-ws-jsonrpc',
  'vscode',
];

module.exports = {
  webpack: {
    configure: {
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 0,
          maxInitialRequests: Infinity,
          cacheGroups: {
            jovomodule: {
              test: /[\\/]node_modules[\\/](@catering)[\\/]/,
              name: 'rotaractmodules',
              priority: 1,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]((?!(@catering)).*)[\\/]/,
              name: 'npm_bundle',
              reuseExistingChunk: true,
            },
          },
        },
      },
      resolve: {
        alias: {
          'vscode/services': 'vscode/dist/services',
        },
      },
      module: {
        rules: [
          {
            test: /\.(module)\.(less)$/,
            exclude: /node_modules\/(?!(@catering)\/).*/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]__[hash:base64:5]',
                  },
                },
              },
              {
                loader: 'less-loader',
              },
            ],
          },
          {
            test: /\.(js|mjs)$/,
            include: monacoRelatedPkgList.map((pkgName) => (
              path.resolve(__dirname, `${getMonacoRelatedPkgDir()}/${pkgName}`)
            )),
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                ],
                plugins: [
                  '@babel/plugin-proposal-optional-chaining',
                  '@babel/plugin-transform-nullish-coalescing-operator',
                  '@babel/plugin-proposal-class-properties',
                ],
              },
            },
          },
          {
            test: /\.mjs$/,
            include: path.resolve(__dirname, `${getMonacoRelatedPkgDir()}/@monaco-editor`),
            type: 'javascript/auto',
          },
        ],
      },
    },
  },
  plugins: [
    {
      plugin: semanticUi,
    },
  ],
  babel: {
    presets: [
      '@babel/preset-react',
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      [
        'module-resolver',
        {
          root: [
            './src',
          ],
          alias: {
            '@utils': './src/globals/utils',
            '@globalComps': './src/globals/components',
            '@models': './src/models',
            '@screens': './src/screens',
            '@services': './src/services',
            '@locales': './src/globals/locale',
            '@images': './src/assets/images',
            '@less': './src/assets/less',
          },
        },
      ],
    ],
  },
};
