import sass from 'node-sass';
import fs from 'fs-extra';
import { resolve, dirname } from 'path';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';


const packages = require('./package.json');
const componentsDir = resolve( __dirname, 'src/components');


{
  const from = 'node_modules/@webcomponents/webcomponentsjs';
  const to = 'test/Lib';

  // 拷贝最新的 polyfill 加载器到测试文件夹中
  fs.copy( `${ from }/webcomponents-loader.js`, `${ to }/webcomponents-loader.js`, {
    overwrite: true
  });

  // 拷贝最新的 polyfill 到测试文件夹中
  fs.readdir( `${ from }/bundles`, ( err, files ) => {
    files.forEach( name => {
      /\.js$/.test( name ) && fs.copy( `${ from }/bundles/${ name }`, `${ to }/bundles/${ name }`, {
        overwrite: true
      });
    });
  });

  // 拷贝最新的 Hu 类库文件到测试文件夹中
  fs.copy( `node_modules/@moomfe/hu/dist/hu.js`, `${ to }/hu.js`, {
    overwrite: true
  });
}


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
    },
    {
      name: '去除 HTML 缩进',
      load: function( id ){
        if( id.startsWith( componentsDir ) ) return new Promise( async resolve => {
          let data = await fs.readFile( id, 'utf-8' );

          data = data.replace( /<([^>]+)>\s+<([^>]+)>/g, '<$1><$2>' );
          data = data.replace( /<([^>]+)>\s+<([^>]+)>/g, '<$1><$2>' );
          data = data.replace( /`\s+<([^>]+)>/g, '`<$1>' );
          data = data.replace( /<([^>]+)>\s+`/g, '<$1>`' );
          data = data.replace( /\s*<([^>]+)>\s*/g, '<$1>' );

          resolve( data );
        });
      }
    },
    {
      name: '拷贝一份副本给测试用',
      writeBundle( bundle ){
        fs.writeFileSync( 'test/Lib/huui.js', bundle['huui.js'].code, 'utf-8' );
      }
    }
  ]
};