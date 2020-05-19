import Exif from "exif-js";

/**
 * @desc 获取图片信息，使用exif.js库，具体用法请在github中搜索
 * @param {Object} file 上传的图片文件
 * @param {String} tag 需要获取的信息 例如：'Orientation'旋转信息
 * @return {Promise<Any>} 读取是个异步操作，返回指定的图片信息
 */
export const getOrientation = (file, tag) => {
    if (!file) return 0;
    return new Promise((resolve, reject) => {
        /* eslint-disable func-names */
        // 箭头函数会修改this，所以这里不能用箭头函数
        Exif.getData(file, function () {
            const o = Exif.getTag(this, tag);
            resolve(o);
        });
    });
};

/**
 * @desc 将base64的图片转为文件流
 * @param {String} dataUrl base64数据
 * @return {Object} 文件流
 */
export const dataURLtoFile = (dataUrl) => {
    const filename = `img${Date.now()}`;
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

/**
 * @desc 旋转canvas，会对源数据canvas进行修改
 * @param {Object} img 图片文件
 * @param {String} dir 方向 left逆时针|right顺时针
 * @param {Object} canvas 画布
 * @param {Number} s 向指定方向旋转几步，1步为90度
 */
export const rotateImg = (img, dir = 'right', canvas, s = 1) => {
    const MIN_STEP = 0;
    const MAX_STEP = 3;

    const width = canvas.width || img.width;
    const height = canvas.height || img.height;
    let step = 0;

    if (dir === 'right') {
        step += s;
        step > MAX_STEP && (step = MIN_STEP);
    } else {
        step -= s;
        step < MIN_STEP && (step = MAX_STEP);
    }

    const degree = step * 90 * Math.PI / 180;
    const ctx = canvas.getContext('2d');

    switch (step) {
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height, width, height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height, width, height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0, width, height);
            break;
        default:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            break;
    }
};

/**
 * @desc 压缩canvas，会对源数据canvas进行修改
 * @param {Object} img 图片文件
 * @param {Object} canvas 画布上下文
 * @param {Number} limitsize 限制的大小
 * @return {Object} 新大小的宽高，因为如果后续还要处理canvas要使用新的宽高才行{width, height}
 */
export const compressImg = (img, canvas, limitsize) => {
    if (!limitsize || limitsize <= 0) return;
    const ctx = canvas.getContext('2d');

    // 原始图片信息
    const imgSize = img.src.length;
    const width = img.width;
    const height = img.height;

    // 压缩比, 保留两位小数
    const ratio = parseFloat(limitsize / imgSize).toFixed(2);
    const ratioWidth = ~~(width * ratio); // 新图片宽度
    const ratioHeight = ~~(height * ratio); // 新图片高度

    canvas.width = ratioWidth;
    canvas.height = ratioHeight;
    ctx.drawImage(img, 0, 0, ratioWidth, ratioHeight);
};

  /** @desc 图片处理 */
 export async function imageHandle(file) {
    // 获取图片旋转信息，后面方法会用
    const or = await getOrientation(file, "Orientation");
    return new Promise((resolve, reject) => {
      // 图片的处理用到了下面这些方法，如果当前系统不支持，就直接返回源文件
      // if (!window.FileReader || !window.atob) return resolve(file);
      // 使用FileReader读取文件流
      const reader = new FileReader();
      reader.readAsDataURL(file);
      /* eslint-disable func-names */
      // 箭头函数会改变this，所以这里不能用肩头函数
      reader.onloadend = function() {
        const result = this.result;
        const img = new Image();
        img.src = result;
        img.onload = function() {
          const data = imageHandleStep(img, or);
          const f = dataURLtoFile(data);
          resolve(f);
        };
      };
    });
  }


  /** @desc 开始对图片文件进行处理 */
  function imageHandleStep(img, or) {
    // 图片的所有处理都是基于canvas的，所以先将图片转为canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    // 图片原始大小

    const width = img.width;
    const height = img.height;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    // step2. 用手机拍照的时候，iphone手机拿的方向不同上传的图片会被旋转，所以需要对旋转的图片转回到正确的方向
    // 不在异常范围内的文件不做旋转处理
    if ([6, 8, 3].indexOf(~~or) > -1) {
      getRotateImg(img, canvas, or);
    }
    return canvas.toDataURL("image/png", 1);
  }

  /**
   * @desc 获取旋转后的图片
   * @param {Object} img 图片文件
   * @param {Object} canvas 画布
   * @param {Number} or 旋转信息
   * @param {Object} compressSize 指定宽高
   */
  function getRotateImg(img, canvas, or) {
    switch (or) {
      case 6: // 顺时针旋转90度
        rotateImg(img, "right", canvas);
        break;
      case 8: // 逆时针旋转90度
        rotateImg(img, "left", canvas);
        break;
      case 3: // 顺时针旋转180度
        rotateImg(img, "right", canvas, 2);
        break;
      default:
        break;
    }
  }