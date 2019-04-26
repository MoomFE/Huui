import initProps from "./props";
import initRender from "./render";
import { assign } from "../shared/global/Object/index";


export default ( name, options ) => {
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
}