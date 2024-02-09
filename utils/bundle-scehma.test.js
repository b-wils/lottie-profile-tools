const {makeSchema} =  require('./bundle-schema')

test('schema succesfully bundles', async () => {
    const bundledSchema = await makeSchema();
});