import random from "../../../utils/random";
import defaultNumber from "./defaultNumber";


export default nums => {
  nums = nums.split(',');

  if( nums.length > 1 ){
    let [ num1, num2 ] = nums;

    if( !isNaN( num1 ) && num1 >= 0 && !isNaN( num2 ) && num2 >= 0 ){
      num1 = +num1;
      num2 = +num2;

      if( num1 !== num2 ){
        return num2 > num1 ? random( num1, num2 ) : random( num2, num1 );
      }
    }
  }

  return defaultNumber();
}