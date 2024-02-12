const Ajv = require("ajv/dist/2020");
const rectLottie = require("./rectangle.lottie.json");
const ellipseLottie = require("./ellipse.lottie.json");
const { makeSchema } = require("../../../../utils/bundle-schema");
const { getUserErrorMessages } = require("../../../../utils/get-user-error-messages");

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
});

ajv.addKeyword({
  keyword: "errorMessage",
  type: "object",
  schemaType: "string",
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
    const errorMessages = getUserErrorMessages(validate);
    expect(errorMessages.length).toBe(1);
    expect(errorMessages[0]).toBe('Rectangle not supported by current profile');
  });

  test('passes if shape is an ellipse', async () => {
    const valid = validate(ellipseLottie);
    expect(valid).toBe(true);
  });
});
