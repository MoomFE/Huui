import { apply } from "../shared/global/Reflect/index";


/**
 * 用于为 Hu.js 实例选项的 render 选项创建一个 css 和 html 分离的环境
 * 避免根节点不确定情况下, 到处拼接 css 字符串的问题
 */
export default options => function( html ){
  const result = [];

  if( options.css ) result.push(
    html`<style>${ options.css }</style>`
  );

  if( options.html ) result.push(
    apply( options.html, this, arguments )
  );

  return result;
}