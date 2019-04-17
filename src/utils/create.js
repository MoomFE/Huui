import { apply } from "../shared/global/Reflect/index";
import { assign, create } from "../shared/global/Object/index";


export default function(){
  return apply( assign, null, [
    create( null ), ...arguments
  ]);
}