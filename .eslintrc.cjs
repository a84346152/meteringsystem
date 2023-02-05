/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    },
    {
      files: ['src/views/index.vue','src/views/**/index.vue'],   // 匹配views和二级目录中的index.vue
      rules: {
        'vue/multi-word-component-names':"off",
      } //给上面匹配的文件指定规则
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
