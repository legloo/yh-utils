

/**
 * 判断是否为全中文
 * @param {String} str 任意字符串 
 */
const isChineseWord = function (str) {
	let reg = /^[\u4e00-\u9fa5]+$/;
	if (!reg.test(str)) {
		return false
	}
	return true
}
export default isChineseWord;
