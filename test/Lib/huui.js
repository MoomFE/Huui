/*!
 * Huui.js v1.0.0
 * https://github.com/MoomFE/Huui
 * 
 * (c) 2019-present Wei Zhang
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Huui = factory());
}(this, function () { 'use strict';

  const {
    apply,
    // construct,
    // defineProperty,
    // deleteProperty,
    // enumerate,
    // get,
    // getOwnPropertyDescriptor,
    // getPrototypeOf,
    // has,
    // isExtensible,
    // ownKeys,
    // preventExtensions,
    // set,
    // setPrototypeOf
  } = Reflect;

  const {
    create,
    assign
  } = Object;

  /**
   * 创建一个干净的目标对象
   * 并把传入方法的对象全部浅拷贝到目标对象并返回目标对象
   */
  function create$1(){
    return apply( assign, null, [
      create( null ), ...arguments
    ]);
  }

  /**
   * 用于为 Hu.js 实例选项的 render 选项创建一个 css 和 html 分离的环境
   * 避免根节点不确定情况下, 到处拼接 css 字符串的问题
   */
  var initRender = options => function( html ){
    const result = [];

    if( options.css ) result.push(
      html`<style>${ options.css }</style>`
    );

    if( options.html ) result.push(
      apply( options.html, this, arguments )
    );

    return result;
  };

  const {
    floor,
    random,
    max
  } = Math;

  /**
   * 在传入的两个正整数中随机一个数字
   * @param {Number} from 
   * @param {Number} to 
   */
  var random$1 = ( from, to ) => {
    return floor(
      random() * ( to - from + 1 ) + from
    );
  };

  /**
   * 将字符串首字母大写
   */
  var capitalize = str => {
    return str[ 0 ].toUpperCase() + str.slice( 1, str.length );
  };

  var util = create$1({
    create: create$1,
    render: initRender,
    random: random$1,
    capitalize
  });

  const inBrowser = typeof window !== 'undefined';

  const Huui = create$1({
    util
  });

  {
    const otherHuui = inBrowser ? window.Huui : void 0;

    Huui.noConflict = () => {
      if( inBrowser && window.Huui === Huui ) window.Huui = otherHuui;
      return Huui;
    };

    if( inBrowser ){
      window.Huui = Huui;
    }
  }

  var css = ":host>div{display:inline-block;position:relative}:host>div:before{content:attr(text);white-space:nowrap;color:transparent}:host>div>svg{width:100%;height:100%;position:absolute;top:0;left:0}";

  const {
    html,
    util: util$1,
    observable
  } = Hu;

  const {
    each,
    isPlainObject
  } = util$1;

  /**
   * 用于快速创建 Hu.js 实例选项的 props 选项
   */
  var initProps = options => {
    const props = {};

    each( options, ( name, options ) => {

      if( options == null ){
        return props[ name ] = null;
      }

      if( isPlainObject( options ) ){
        props[ name ] = options;
      }else{
        props[ name ] = {
          type: getType( options ),
          default: options
        };
      }

    });

    return props;
  };


  function getType( obj ){
    return window[
      capitalize( typeof obj )
    ];
  }

  var define = ( name, options ) => {
    let props = options.props;
    let render = options.render;

    if( props ){
      props = initProps( props );
    }

    if( render ){
      render = initRender( render );
    }

    options = assign({}, options, {
      props: props,
      render: render
    });

    Hu.define( 'hu-' + name, options );
  };

  const {
    svg
  } = html;

  /**
   * 组件灵感来自来自: 腾讯ISUX
   * https://isux.tencent.com/articles/svg-for-web
   */


  define( 'gradient-text', {

    props: {
      from: '#279f76',
      to: '#F4A460',
      steps: '',
      text: ''
    },

    render: {
      css,
      html(){
        return html`<div text=${ this.text }>${ this.svg }</div>`;
      }
    },

    computed: {
      stops({ from, to, steps }){
        const stops = [];

        if( steps ){
          stops.push(
            ...steps.split(',').map( color => {
              return color.trim();
            })
          );
        }

        if( from ) stops.splice( 0, 0, from );
        if( to ) stops.push( to );

        const length = stops.length;
        const proportion = length > 1 ? 100 / ( length - 1 ) : 0;

        return stops.map(( color, index ) => {
          return svg`<stop stop-color=${ color } offset="${ proportion * index }%"></stop>`;
        });
      },
      svg({ stops, text }){
        return html`<svg><defs><linearGradient id="ISUX">${ stops }</linearGradient></defs><text y="50%" dy="30%" fill="url(#ISUX)">${ text }</text></svg>`;
      }
    }

  });

  var css$1 = "*,:after,:before{box-sizing:border-box}:host>div{position:absolute;border-radius:100px;background-color:currentColor;animation-timing-function:linear;animation-iteration-count:infinite}:host>div:after,:host>div:before{content:\"\";position:absolute;background-color:inherit}:host>div:before{width:54.54545%;height:150%;top:-75%;right:15.15152%;border-radius:200px}:host>div:after{width:30.30303%;height:83.33333%;top:-41.66667%;left:15.15152%;border-radius:100px}@keyframes cloud{0%{transform:translateZ(0)}25%{transform:translate3d(-40%,0,0)}75%{transform:translate3d(80%,0,0)}to{transform:translateZ(0)}}@keyframes cloud-reverse{0%{transform:translateZ(0)}25%{transform:translate3d(80%,0,0)}75%{transform:translate3d(-40%,0,0)}to{transform:translateZ(0)}}";

  define( 'clouds-item', {

    data(){
      const width = random$1( 80, 150 );
      const height = width / 2.75;

      return {
        width: width + 'px',
        height: height + 'px',
        top: `calc(${ random$1( 0, 100 ) }% - ${ height / 2 }px)`,
        left: `calc(${ random$1( 0, 100 ) }% - ${ width / 2 }px)`,
        opacity: random$1( 10, 66 ) / 100,
        animationName: random$1( 0, 1 ) ? 'cloud' : 'cloud-reverse',
        animationDelay: random$1( 500, 6666 ) + 'ms',
        animationDuration: random$1( 10000, 20000 ) + 'ms'
      };
    },

    render: {
      css: css$1,
      html( html ){
        return html`<div :style=${ this.$data }></div>`;
      }
    }

  });

  var css$2 = ":host>div{width:100%;height:100%;position:absolute;top:0;left:0;pointer-events:none;overflow:hidden}";

  define( 'clouds', {

    props: {
      num: null,
      color: '#FFF'
    },

    computed: {
      length({ num }){
        if( num ){
          if( !isNaN( num ) ) return +num;
          if( ( num = num.split(',') ).length > 1 ){
            let [ num1, num2 ] = num;

            if( !isNaN( num1 ) && num1 >= 0 && !isNaN( num2 ) && num2 >= 0 ){
              num1 = +num1;
              num2 = +num2;

              return num2 > num1 ? random$1( num1, num2 ) : random$1( num2, num1 );
            }
          }
        }
        return random$1( 6, 12 );
      },
      clouds({ length }){
        return Array.apply( null, { length } ).map(() => {
          return html`<hu-clouds-item></hu-clouds-item>`;
        });
      }
    },

    render: {
      css: css$2,
      html(){
        return html`<div style="color: ${ this.color }">${ this.clouds }</div>`;
      }
    }

  });

  return Huui;

}));
