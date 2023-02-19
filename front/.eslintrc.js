module.exports = {
  env: {
    browser: true,
    es2021: true,
    // "jest/globals": true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ["react"],
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  }
}
