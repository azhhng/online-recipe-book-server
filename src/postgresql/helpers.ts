export const getPropertiesToUpdate = (propertiesToUpdate: {
  [property: string]: string;
}) => {
  let properties = "";

  for (let property in propertiesToUpdate) {
    properties += property;
    properties += "=";
    properties += "'";
    properties += propertiesToUpdate[property];
    properties += "'";
    properties += ",";
  }

  properties = properties.slice(0, -1);
  return properties;
};
