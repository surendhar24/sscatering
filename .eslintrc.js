module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react/no-unknown-property": "off",
    "react/jsx-props-no-spreading": "off",
    "camelcase": "off",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": ["**/*.test.js", "**/*Tests.js"] }],
    "import/no-unresolved": [
      "error",
      {
        "ignore": [
          "^[@]",
        ]
      }
    ],
    "linebreak-style": ["error", "unix"] // This line ensures LF line endings
  },
};
