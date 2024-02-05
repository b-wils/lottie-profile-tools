const Ajv = require("ajv/dist/2020");
const rectSchema = require("../rectangle.json");
const rectLottie = require("./rectangle.lottie.json");
const ellipseLottie = require("./ellipse.lottie.json");

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
});


describe('Rectangle Validation', () => {
  test('fails if shape is a rectangle', () => {
    const validate = ajv.compile(rectSchema);
    const valid = validate(rectLottie);
    expect(valid).toBe(false);
  });

  test('passes if shape is an ellipse', () => {
    const validate = ajv.compile(rectSchema);
    const valid = validate(ellipseLottie);
    expect(valid).toBe(true);
  });
});