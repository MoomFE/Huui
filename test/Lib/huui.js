/*!
 * Huui.js v1.0.0
 * https://github.com/MoomFE/Huui
 * 
 * (c) 2019-present Wei Zhang
 * Released under the MIT License.
 */

(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  var css = ":host>div{display:inline-block;position:relative}:host>div:before{content:attr(text);white-space:nowrap;color:transparent}:host>div>svg{width:100%;height:100%;position:absolute;top:0;left:0}";

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

  var render = options => function( html ){
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
    html
  } = Hu;

  /**
   * 组件灵感来自来自: 腾讯ISUX
   * https://isux.tencent.com/articles/svg-for-web
   */


  Hu.define( 'hu-gradient-text', {
    props: {
      from: {
        type: String,
        default: '#279f76'
      },
      to: {
        type: String,
        default: '#F4A460'
      },
      text: String
    },
    render: render({
      css,
      html( html ){
        const hu = this;

        return html`<div text=${ hu.text }>${ hu.svg }</div>`;
      }
    }),
    computed: {
      svg( hu ){
        return html`<svg><defs><linearGradient id="ISUX"><stop stop-color=${ this.from } offset="0%"/><stop stop-color=${ this.to } offset="100%"/></linearGradient></defs><text y="50%" dy="30%" fill="url(#ISUX)">${ hu.text }<text></svg>`;
      }
    }
  });

}));
