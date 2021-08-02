const response = {
  success: (res, result, msg) => {
    const success = {
      success: true,
      data: result,
      code: 200,
      message: msg,
    };
    res.json(success);
  },
  failed: (res, code, err) => {
    if (code === 500) {
      const codefail = {
        success: false,
        data: null,
        errorCode: 500,
        error: err,
        message: 'There was an error on the server and the request could not be completed',
      };
      res.json(codefail);
    } else if (code === 401) {
      const codefail = {
        success: false,
        data: null,
        errorCode: 404,
        error: err,
        message: 'Your Request is not found',
      };
      res.json(codefail);
    } else if (code === 401) {
      const codefail = {
        success: false,
        data: null,
        errorCode: 401,
        error: err,
        message: 'Unauthorized',
      };
      res.json(codefail);
    }
  },
};
module.exports = response;
