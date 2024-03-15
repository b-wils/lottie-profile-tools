const Ajv = require("ajv/dist/2020");
const rectLottie = require("./rectangle.lottie.json");
const ellipseLottie = require("./ellipse.lottie.json");
const { makeSchema } = require("../../../../utils/bundle-schema");
const { getUserErrorMessages } = require("../../../../utils/get-user-error-messages");

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
});

require("ajv-errors")(ajv);


describe('Rectangle Validation', () => {
  let validate;
  let profile;
  beforeAll(async () => {
    const bundledSchema = await makeSchema();
    validate = ajv.compile(bundledSchema);
  });

  describe('rectangle enabled', () => {
    beforeAll(() => {
      profile = makeAllEnabledProfile();
    });

    test('passes if shape is a rectangle', async () => {
      const valid = validate({lottie: rectLottie, profile: makeAllEnabledProfile()});
      expect(valid).toBe(true);
    });

    test('passes if shape is an ellipse', async () => {
      const valid = validate({lottie: ellipseLottie});
      expect(valid).toBe(true);
    });
  });

  describe('rectangle disabled', () => {
    beforeAll(() => {
      profile = makeAllEnabledProfile();
      profile.shapes.rectangle = false;
    });

    test('fails if shape is a rectangle', async () => {
      const valid = validate({lottie: rectLottie});
      expect(valid).toBe(false);
      const errorMessages = validate.errors.filter(error => error.keyword === 'errorMessage').map(error => error.message);
  
      expect(errorMessages.length).toBe(1);
      expect(errorMessages[0]).toBe('Rectangle not supported by current profile');
    });
  
    test('passes if shape is an ellipse', async () => {
      const valid = validate({lottie: ellipseLottie});
      expect(valid).toBe(true);
    });
  });
});

function makeAllEnabledProfile() {
  return {
    shapes: {
      rectangle: true,
    }
  }
}
