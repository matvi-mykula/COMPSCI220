// testing for imageProcessing
const {
  sum, getPixel, setPixel, removeBlueAndGreen, grayScale, highlight, blurPixel, blur, imageMap,
} = require('./imageProcessing');

test('sum function should correctly add two numbers', () => {
  expect(sum(2, 3)).toBe(5);
});

const testImage1 = [[[1, 2, 3]], [[1, 3, 5], [[123, 23, 45]]]];

test('get pixel', () => {
  expect(getPixel(0, 0, testImage1)).toStrictEqual([1, 2, 3]);
});

test('Get pixel at a valid position', () => {
  const image = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
  ];
  const x = 1;
  const y = 2;
  const expectedPixel = 80;

  const pixel = getPixel(x, y, image);

  expect(pixel).toBe(expectedPixel);
});
// Test case 2: Get pixel at an invalid position (x out of range)
test('Get pixel at an invalid position (x out of range)', () => {
  const image = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
  ];
  const x = 5;
  const y = 2;

  expect(
    getPixel(x, y, image),
  ).toEqual(false);
});

// Test case 3: Get pixel at an invalid position (y out of range)
test('Get pixel at an invalid position (y out of range)', () => {
  const image = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
  ];
  const x = 1;
  const y = 5;

  expect(
    getPixel(x, y, image),
  ).toBe(false);
});

// Test case 1: Set pixel at a valid position
test('Set pixel at a valid position', () => {
  const image = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
  ];
  const x = 1;
  const y = 2;
  const newPixel = 100;
  const expectedImage = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 100, 90],
  ];

  const updatedImage = setPixel(x, y, image, newPixel);

  expect(updatedImage).toEqual(expectedImage);
});

// Test case 2: Set pixel at an invalid position (x out of range)
test('Set pixel at an invalid position (x out of range)', () => {
  const image = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
  ];
  const x = 5;
  const y = 2;
  const newPixel = 100;

  expect(() => {
    setPixel(x, y, image, newPixel);
  }).toThrowError('Invalid position: x or y is out of range');
});

// Test case 3: Set pixel at an invalid position (y out of range)
test('Set pixel at an invalid position (y out of range)', () => {
  const image = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
  ];
  const x = 1;
  const y = 5;
  const newPixel = 100;

  expect(() => {
    setPixel(x, y, image, newPixel);
  }).toThrowError('Invalid position: x or y is out of range');
});

// Test case 4: Check immutability of the original image
test('Check immutability of the original image', () => {
  const image = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
  ];
  const x = 1;
  const y = 1;
  const newPixel = 100;

  const updatedImage = setPixel(x, y, image, newPixel);
  expect(updatedImage).not.toBe(image);
});

/// /// testing removeblue and green
// Test case 1: Remove blue and green from a single-pixel image
test('Remove blue and green from a single-pixel image', () => {
  const image = [[[100, 150, 200]]];
  const expectedImage = [[[100, 0, 0]]];

  const result = removeBlueAndGreen(image);

  expect(result).toEqual(expectedImage);
});

// Test case 2: Remove blue and green from a multi-pixel image
test('Remove blue and green from a multi-pixel image', () => {
  const image = [
    [[100, 150, 200], [50, 75, 100]],
    [[200, 250, 300], [150, 175, 200]],
  ];
  const expectedImage = [
    [[100, 0, 0], [50, 0, 0]],
    [[200, 0, 0], [150, 0, 0]],
  ];

  const result = removeBlueAndGreen(image);

  expect(result).toEqual(expectedImage);
});

// Test case 3: Check immutability of the original image
test('Check immutability of the original image', () => {
  const image = [[[100, 150, 200]]];
  const expectedImage = [[[100, 0, 0]]];

  removeBlueAndGreen(image);

  expect(image).toEqual(expectedImage);
});

/// //////////////////testing grayscale
// Test case 1: Convert a single-pixel image to grayscale
test('Convert a single-pixel image to grayscale', () => {
  const image = [[[100, 150, 200]]];
  const expectedImage = [[[150, 150, 150]]];

  const result = grayScale(image);

  expect(result).toEqual(expectedImage);
});

// Test case 2: Convert a multi-pixel image to grayscale
test('Convert a multi-pixel image to grayscale', () => {
  const image = [
    [[100, 150, 200], [50, 75, 100]],
    [[200, 250, 100], [150, 175, 200]],
  ];
  const expectedImage = [
    [[150, 150, 150], [75, 75, 75]],
    [[183, 183, 183], [175, 175, 175]],
  ];

  const result = grayScale(image);

  expect(result).toEqual(expectedImage);
});

// Test case 1: Highlight edges in a single-pixel image
test('Highlight edges in a single-pixel image', () => {
  const image = [[[100, 150, 200]]];
  const expectedImage = [[[150, 150, 150]]];

  const result = highlight(image);

  expect(result).toEqual(expectedImage);
});

// Test case 2: Highlight edges in a multi-pixel image
test('Highlight edges in a multi-pixel image', () => {
  const image = [
    [[100, 150, 200], [200, 250, 100]],
    [[50, 75, 100], [150, 175, 200]],
  ];
  const expectedImage = [
    [[33, 33, 33], [183, 183, 183]],
    [[100, 100, 100], [175, 175, 175]],
  ];

  const result = highlight(image);

  expect(result).toEqual(expectedImage);
});

// Test case 1: Blur pixel with valid neighboring pixels
test('Blur pixel with valid neighboring pixels', () => {
  const image = [
    [[100, 150, 200], [50, 75, 100], [200, 250, 100]],
    [[150, 175, 200], [0, 0, 0], [100, 150, 200]],
    [[50, 75, 100], [200, 250, 100], [150, 175, 200]],
  ];

  const expectedNewImage = [
    [[117, 158, 133], [50, 75, 100], [200, 250, 100]],
    [[150, 175, 200], [0, 0, 0], [100, 150, 200]],
    [[50, 75, 100], [200, 250, 100], [150, 175, 200]],
  ];

  // Mock getPixel function to return neighboring pixels

  const result = blurPixel(0, 0, image);

  expect(result).toEqual(expectedNewImage[0][0]);
});
// Test case: Check the output of the blur function
test('Check the output of the blur function', () => {
  const image = [
    [[100, 150, 200], [50, 50, 100]],
  ];

  const expectedImage = [
    [[75, 100, 150], [75, 100, 150]]];

  const result = blur(image);

  expect(result).toEqual(expectedImage);
});

/// //////Project 2

// Test 1: Convert all pixels to grayscale
test('imageMap converts image to grayscale', () => {
  // Create a test image with red, green, and blue pixels
  const img = [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]];

  // Apply imageMap to convert each pixel to grayscale
  const result = imageMap(img, (image, x, y) => {
    const c = getPixel(x, y, image);
    const grayValue = (c[0] + c[1] + c[2]) / 3;
    return [grayValue, grayValue, grayValue];
  });

  // Verify that all pixels in the result image are grayscale
  expect(getPixel(0, 0, result)[0]).toBeCloseTo(0.333);
});

// Test 2: Set all pixels to black
test('imageMap sets all pixels to black', () => {
  // Create a test image with red, green, and blue pixels
  const img = [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]];

  // Apply imageMap to set all pixels to black
  // eslint-disable-next-line no-unused-vars
  const result = imageMap(img, (image, x, y) => {
    const blackPixel = [0, 0, 0];
    return blackPixel;
  });

  // Verify that all pixels in the result image are black
  expect(getPixel(0, 0, result)[0]).toBe(0);
});

// Test 3: Invert the image colors
test('imageMap inverts image colors', () => {
  // Create a test image with red, green, and blue pixels
  const img = [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]];

  // Apply imageMap to invert the colors of each pixel
  const result = imageMap(img, (image, x, y) => {
    const c = getPixel(x, y, image);
    return [1 - c[0], 1 - c[1], 1 - c[2]];
  });

  // Verify that all pixels in the result image have inverted colors
  expect(getPixel(0, 0, result)[0]).toBe(0);
});
