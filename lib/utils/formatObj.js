/**
 * 
 * @param {*} obj 传入对象
 * @param {*} filter_arr   指定需要过滤的key组 exam:['all']
 */
const filterParams = function (obj, filter_arr) {
	let _newPar = {};
	for (let key in obj) {
		if (
			(obj[key] === 0 || obj[key] === false || obj[key]) &&
			obj[key].toString().replace(/(^\s*)|(\s*$)/g, "") !== "" && !filter_arr.includes(key)
		) {
			_newPar[key] = obj[key];
		}
	}
	return _newPar;
}

export default filterParams