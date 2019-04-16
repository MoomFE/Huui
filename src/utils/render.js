import { apply } from "../shared/global/Reflect/index";


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