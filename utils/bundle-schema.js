const $RefParser = require("@apidevtools/json-schema-ref-parser");
const schemaRoot = require("../schema/profile-validator.json");

async function makeSchema() {
    const bundledScehma = await $RefParser.bundle(schemaRoot);

    return bundledScehma;
}

exports.makeSchema = makeSchema;