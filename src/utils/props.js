import { each, isPlainObject } from "../shared/global/Hu/util";
import capitalize from "./capitalize";


/**
 * 用于快速创建 Hu.js 实例选项的 props 选项
 */
export default options => {
  const props = {};

  each( options, ( name, options ) => {

    if( options == null ){
      return props[ name ] = null;
    }

    if( isPlainObject( options ) ){

    }else{
      props[ name ] = {
        type: getType( options ),
        default: options
      };
    }

  });

  return props;
}


function getType( obj ){
  return window[
    capitalize( typeof obj )
  ];
}