import initProps from "./props";
import { assign } from "../shared/global/Object/index";


export default ( name, options ) => {
  let props = options.props;

  if( props ){
    props = initProps( props );
  }

  options = assign({}, options, {
    props: props
  });

  Hu.define( 'hu-' + name, options );
}