function getUserErrorMessages(validate) {

    const userErrors = validate.errors;
    const errorMessages = [];
  
    for (const error of userErrors) {
      // TODO json schem ref parser has bug with defs
      const unencodedString = error.schemaPath.replaceAll("%24", "$");
  
      // Traverse the nodes of the schema looking for user presentable errors
      const pathParts = unencodedString.split('/').slice(1);
      let currentSchemaObj = validate.schema;
      for (const pathPart of pathParts) {
        currentSchemaObj = currentSchemaObj[pathPart];
  
        if (!currentSchemaObj) {
          break;
        }
  
        if (currentSchemaObj.errorMessage) {
          errorMessages.push(currentSchemaObj.errorMessage);
        }
      }
    }
  
    return errorMessages;
  }

  exports.getUserErrorMessages = getUserErrorMessages;