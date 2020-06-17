# yh-utils
yh-utils
# utils

``` js
	IdentificationCheck(idCard) //检测中国身份证是否规范
	isChineseWord(str) //检测字符串是否为全中文
	filterParams(obj, filter_arr) //过滤值为空并且指定删除key的对象 @param obj Object{};filter_arr Array<String>
	fomatNumberInit(Number: any), //1312312313 - > '1,312,312,313'
	fomatNumberFloat(Number: float), //1312312313.123 -> '1,312,312,313.123'
	regexRules, //正则验证组
	checkPlatform(), //检查终端类型
	imageZip(file), //图片压缩
	imageHandle(file), //ios拍照图片旋转
	getOrientation(file,tag), //获取图片信息
	dataURLtoFile(base64), //base642File
	getDateDiff(time),//time 2018-05-25 18:14:02 返回 几分钟、几天前
	handleGetTreeExtent(node),//广度计算
	handleGetTreeDeep(node),//深度计算
```

