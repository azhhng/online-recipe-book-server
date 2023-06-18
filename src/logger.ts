const logger = (
  fileName: string,
  functionName: string,
  message: string,
  error: any
) => {
  console.log({
    File: fileName,
    Function: functionName,
    Message: message,
    Error: error,
  });
};

export { logger };
