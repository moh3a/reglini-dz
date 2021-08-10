// MODULE USED FOR SENDING A STATUS ALONG WITH A MESSAGE WHEN THROWING AN ERROR

class ErrorResponse extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
