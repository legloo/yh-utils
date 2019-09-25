


function isNumber(val) {
	return !isNaN(parseFloat(val))
}
/**
 * 
 * @param {Number} num 任意数字
 * @return {String}  整数
 */
function fomatNumberInit(num) {
	let decimals = 0
	let decimal = '.'
	let separator = ','
	num = num.toFixed(decimals)
	num += ''
	const x = num.split('.')
	let x1 = x[0]
	const x2 = x.length > 1 ? decimal + x[1] : ''
	const rgx = /(\d+)(\d{3})/
	if (separator && !isNumber(separator)) {
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + separator + '$2')
		}
	}
	return x1
}

/**
 * 
 * @param {Number} num float需为浮点型
 * @return {String} 浮点
 */
function fomatNumberFloat(num) {
	return num && num
		.toString()
		.replace(/(\d)(?=(\d{3})+\.)/g, function ($1, $2) {
			return $2 + ',';
		});
}
export default {
	fomatNumberInit,
	fomatNumberFloat
}