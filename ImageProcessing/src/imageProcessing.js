/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
// Project 1 - image processing

// I am going to change this from the assignment because I do not have access to the same library

// image defined by  list of lists of pixels
// pixel: [r,g,b]
// image : [[[...],[...],[...]],[[...],[...],[...]][[...],[...],[...]]]

// get pixel and set pixel utility functions
// given an x and y and the whole picture return the [r,g,b]

function getPixel(x, y, image) {
  const height = image.length;
  const width = image[0].length;

  if (x < 0 || x >= width || y < 0 || y >= height) {
    // throw new Error('Invalid position: x or y is out of range');
    return false;
  }

  return image[y][x];
}

// set pixel by x and y
function setPixel(x, y, image, newPixel) {
  const height = image.length;
  const width = image[0].length;

  if (x < 0 || x >= width || y < 0 || y >= height) {
    throw new Error('Invalid position: x or y is out of range');
  }

  // mishas method
  // doesnt work because of edge cases??
  // return [
  //   [...image.slice(0, y)],
  //   [...image[y].slice(0, x), newPixel, ...image[y].slice(x + 1)],
  // if x is the last element the x+1 gonna get fucky
  //   [...image.slice(y+1)],
  // ];

  let newImage = [];
  for (let i = 0; i < image.length; i++) {
    if (y !== i) {
      newImage.push(image[i]);
    } else {
      let tempArray = [];
      for (let j = 0; j < image[i].length; j++) {
        if (i === y && j === x) {
          tempArray.push(newPixel);
        } else {
          tempArray.push(image[i][j]);
        }
      }
      newImage.push(tempArray);
    }
  }

  return newImage;
}

// do i really need this?
function makeDeepCopy(image) {
  let newImage = [];
  for (let i = 0; i < image.length; i++) {
    newImage.push(image[i]);
  }

  return newImage;
}

// function that makes image red by removing blue and green pixels
function removeBlueAndGreen(image) {
  let redImage = makeDeepCopy(image);
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      redImage = exports.setPixel(j, i, redImage, [image[i][j][0], 0, 0]);
    }
  }
  return redImage;
}

// function that makes an image grayscale by setting all colors to the same intensity
// iterate through pixels and go from [r,g,b] => [m,m,m] which is the average of rgb
function grayScale(image) {
  let grayImage = image;
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      const avg = Math.round((image[i][j][0] + image[i][j][1] + image[i][j][2]) / 3);
      grayImage = exports.setPixel(j, i, grayImage, [avg, avg, avg]);
    }
  }
  return grayImage;
}

// highlight the edges in the image by comparing the intesity of adjacent pixels
// get grayscale image
// for each pixel setpixel to [|m1-m2|,|m1-m2|,|m1-m2|]
function highlight(image) {
  let highlightImage = exports.grayScale(image);

  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length - 1; j++) {
      const value = Math.abs(image[i][j][0] - image[i][j + 1][0]);
      const newPixel = [value, value, value];
      highlightImage = exports.setPixel(j, i, highlightImage, newPixel);
    }
  }
  return highlightImage;
}

// blur the image by averaging the colors of adjacent pixels
// each pixels rgb should be average of 5 on each side values for each rgb + the pixel in question
function blur(image) {
  // need to make a seperate function to create deep copy
  let blurredImage = [...image];
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      const imageCopy = [...image]; // Create a separate copy of the image array

      // for each pixel
      let tempPixel = exports.blurPixel(j, i, imageCopy);
      blurredImage = [...exports.setPixel(j, i, blurredImage, tempPixel)];
    }
  }
  return blurredImage;
}

/// not working because blur is passing the mutated image into blurpixel
function blurPixel(x, y, image) {
  const pixel = exports.getPixel(x, y, [...image]);
  // need to be passed a copy of image so it doesnt mutate the og
  let rAvg = pixel[0];
  let gAvg = pixel[1];
  let bAvg = pixel[2];
  let divisor = 1;

  /// for 1-6 get the index before and after and add to avg
  // check if it exists first
  for (let i = 1; i < 6; i++) {
    if (exports.getPixel(x + i, y, image)) {
      const nextPix = exports.getPixel(x + i, y, image);
      rAvg += nextPix[0];
      gAvg += nextPix[1];
      bAvg += nextPix[2];
      divisor += 1;
    } else {
      break;
    }
  }
  for (let i = 1; i < 6; i++) {
    if (exports.getPixel(x - i, y, image)) {
      const nextPix = exports.getPixel(x - i, y, image);
      rAvg += nextPix[0];
      gAvg += nextPix[1];
      bAvg += nextPix[2];
      divisor += 1;
    } else {
      break;
    }
  }
  const finalPixel = [Math.round(rAvg / divisor),
    Math.round(gAvg / divisor),
    Math.round(bAvg / divisor)];
  return finalPixel;
}

/// ///// Project 2

exports.imageMap = function imageMap(image, func) {
  let result = image;
  for (let y = 0; y < image.length; ++y) {
    for (let x = 0; x < image[y].length; ++x) {
      const newPixel = func(image, x, y);
      result = exports.setPixel(x, y, result, newPixel);
    }
  }
  return result;
};

module.exports = {
  getPixel, setPixel, removeBlueAndGreen, blurPixel, blur, highlight, grayScale,
};
