import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      // 依賴套件
      'node_modules/**',
      '.pnp/**',
      '.pnp.js',
      '.yarn/**',

      // 建置輸出
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',

      // 快取與暫存檔
      '.cache/**',
      '*.tsbuildinfo',
      'next-env.d.ts',
      '.eslintcache',

      // 測試覆蓋率
      'coverage/**',
      '*.lcov',
      '.nyc_output/**',

      // Vercel
      '.vercel/**',

      // 其他
      '*.pem',
      '*.key',
      '.turbo/**',
      '.contentlayer/**',
      'public/sw.js',
      'public/workbox-*.js',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // TypeScript 規則 - 只關注程式碼品質
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // React 規則
      '@next/next/no-img-element': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/self-closing-comp': 'warn',

      // Console 規則 - 開發環境警告，生產環境錯誤
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

      // Import 排序規則
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node.js 內建模組
            'external', // npm 套件
            'internal', // 內部別名路徑
            ['parent', 'sibling'], // 父層和同層檔案
            'index', // index 檔案
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'warn',
      'import/no-unresolved': 'off', // Next.js 已處理

      // 程式碼品質 - 只保留邏輯相關的規則
      'no-var': 'error',
      'prefer-const': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': 'warn',
      'no-nested-ternary': 'warn',
      eqeqeq: ['warn', 'always'],
    },
  },
];

export default eslintConfig;
