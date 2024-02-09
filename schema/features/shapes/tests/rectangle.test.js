const Ajv = require("ajv/dist/2020");
const rectSchema = require("../rectangle.json");
const rectLottie = require("./rectangle.lottie.json");
const ellipseLottie = require("./ellipse.lottie.json");
const {makeSchema} = require("../../../../utils/bundle-schema");

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
});
describe('Rectangle Validation', () => {
  let validate;

  beforeAll(async () => {
    const bundledSchema = await makeSchema();
    validate = ajv.compile(bundledSchema);
  });

  test('fails if shape is a rectangle', async () => {
    const valid = validate(rectLottie);
    expect(valid).toBe(false);
  });

  test('passes if shape is an ellipse', async () => {
    const valid = validate(ellipseLottie);
    expect(valid).toBe(true);
  });
});