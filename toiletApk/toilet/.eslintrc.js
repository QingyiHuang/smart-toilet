// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    "parser": "vue-eslint-parser",
    "parserOptions": {
      "sourceType": "module",
      "ecmaVersion": 2020,
      "ecmaFeatures": {
        "globalReturn": false,
        "impliedStrict": false,
        "jsx": false
      }
    },
    env: {browser: true},
    extends: ["plugin:vue/essential"],
    plugins: ["vue"],
    rules: {
    
    }
}
