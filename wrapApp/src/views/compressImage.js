function _compressedImage(img) {
  const canvas = document.createElement('canvas');
  const ct = canvas.getContext('2d');
  const canvasWidth = img.width / 2;
  const canvasHeight = img.height / 2;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ct.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
  return dataUrl;
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      const content = reader.result;
      const img = new Image();
      img.src = content;
      resolve(img);
    };
  });
}

function loadImg(img) {
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    };
  });
}

function compressImage(file) {
  return new Promise(resolve => {
    readFile(file)
      .then(img => {
        return loadImg(img);
      })
      .then(img => {
        const compressedImageList = _compressedImage(img);
        // console.log(compressedImageList);
        resolve(compressedImageList);
      });
  });
  // const compressedImageList = '';
  // return new Promise(resolve => {
  //   for (var i = 0; i < fileLength; i++) {
  //     var file = files[i];
  //     readFile(file)
  //       .then(img => {
  //         return loadImg(img);
  //       })
  //       .then(img => {
  //         compressedImageList.push(_compressedImage(img));
  //         if (compressedImageList.length === fileLength) {
  //           resolve(compressedImageList);
  //         }
  //       });
  //   }
  // });
}
export default compressImage;
