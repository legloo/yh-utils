import IdentificationCheck from './utils/chineseIdCheck';
import isChineseWord from './utils/chineseWordCheck';
import filterParams from "./utils/formatObj";
import { fomatNumberInit, fomatNumberFloat } from "./utils/formatNum";
import { regexRules } from './utils/regexMatch'
import { checkPlatform } from './utils/checkPlatform';
import { imageZip, imageHandle, getOrientation, dataURLtoFile } from './utils/image'
import { getDateDiff } from './utils/time'

import { handleGetTreeExtent, handleGetTreeDeep } from './utils/tree'


export {
	IdentificationCheck,
	isChineseWord,
	filterParams,
	fomatNumberInit,
	fomatNumberFloat,
	regexRules,
	checkPlatform,
	imageZip,
	imageHandle,
	getOrientation,
	dataURLtoFile,
	getDateDiff,
	handleGetTreeExtent,
	handleGetTreeDeep
};