import { floor, random } from "../shared/global/Math/index";


/**
 * 在传入的两个正整数中随机一个数字
 * @param {Number} from 
 * @param {Number} to 
 */
export default ( from, to ) => {
  return floor(
    random() * ( to - from + 1 ) + from
  );
}