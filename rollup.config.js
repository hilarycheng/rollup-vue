import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import vueTemplateCompiler from 'rollup-plugin-vue-template-compiler';
const alias = require('rollup-plugin-alias');
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import json from 'rollup-plugin-json';

export default {
  external: [ 'vue', 'axios', 'vuex', 'vue-router', 'vue-i18n' ],
  input: 'src/main.js',
  output: {
    globals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-i18n': 'VueI18n',
      'vue-router': 'VueRouter',
      'axios': 'axios'
    },
    file: 'dist/bundle.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    json({ exclude: 'node_modules/**' }),
    vueTemplateCompiler({
      include: '**/*.html'
    }),
    babel({
      presets: ['@babel/preset-env']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    (process.env.NODE_ENV === 'production' && terser()),
    postcss({
     plugins: []
    }),
    serve({ contentBase: [ 'dist', 'public' ] }),
  ]
};
