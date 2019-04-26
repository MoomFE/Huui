/**
 * 将字符串首字母大写
 */
export default str => {
  return str[ 0 ].toUpperCase() + str.slice( 1, str.length );
}