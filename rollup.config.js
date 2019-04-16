import sass from 'node-sass';
import fs from 'fs-extra';
import { resolve, dirname } from 'path';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';


const packages = require('./package.json');


module.exports = {
  input: 'src/build/index.js',
  output: {
    file: 'dist/huui.js',
    format: 'umd',
    name: 'Huui',
    banner: `/*!\n * ${ packages.title } v${ packages.version }\n * ${ packages.homepage }\n * \n * (c) 2019-present ${ packages.author }\n * Released under the MIT License.\n */\n`
  },
  plugins: [
    {
      name: '解析项目内的 sass 文件',
      load: function( id ){
        if( /.scss$/.test( id ) ) return new Promise( done => {
          sass.render({
            file: id,
            importer: ( url, prev, done ) => {
              const path = resolve( dirname( prev ), url );

              this.addWatchFile( path );
              fs.readFile( path, 'utf-8', ( error, data ) => {
                done({ file: path, contents: data });
              });
            }
          }, ( error, result ) => {
            const cssText = result.css.toString();

            postcss([ autoprefixer, cssnano ]).process( cssText, {
              from: undefined,
              browsers: packages.browserslist
            }).then( result => {
              const css = JSON.stringify( result.css );

              done(`export default ${ css }`);
            });
          });
        });
      }
    }
  ]
};