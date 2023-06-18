const logger = (fileName: string, functionName: string, message: string) => {
  console.log({
    File: fileName,
    Function: functionName,
    Message: message,
  });
};

export { logger };
