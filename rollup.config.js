import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { builtinModules } from 'module';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist/',
    format: 'esm',
    sourcemap: true,
    preserveModules: true
  },
  plugins: [
    json({
      compact: true
    }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx']
    }),
    del({ targets: `dist/**` })
  ],
  external: [
    ...builtinModules,
    ...(pkg.dependencies == null ? [] : Object.keys(pkg.dependencies)),
    ...(pkg.peerDependencies == null ? [] : Object.keys(pkg.peerDependencies)),
    // 对于 @babel/runtime 使用正则来排除
    /@babel\/runtime/
  ]
};
