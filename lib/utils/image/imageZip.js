import lrz from "lrz";


 export function  imageZip(f) {
    let name = f.name;
    return new Promise((resolve, reject) => {
      lrz(f)
        .then(rst => {
          // 处理成功会执行
          resolve({
            data: rst,
            name: name
          });
        })
        .catch(err => {
          console.log(err);
          reject(err);
          // 处理失败会执行
        });
    });
  }