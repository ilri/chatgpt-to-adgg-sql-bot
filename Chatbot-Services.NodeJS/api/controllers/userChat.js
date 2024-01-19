const userChatService = require("../helpers/services/userChatService");
const customResponse = require("../../config/globalResponse").customResponse;
const errorResponse = require("../../config/errorResponse").customError;
const getDataByUserReq = async (req, res, next) => {
  const body = req.swagger.params["body"].value;
  try {
    const data = await userChatService.getDataByUserReq(body);
    if (!data.isSuccess) {
      return res.send(data.message);
    } else {
      customResponse.isSuccess = true;
      customResponse.error = { error: "", errorDescription: "" };
      customResponse.data = { ...data.data };
      return res.send(customResponse);
    }
  } catch (e) {
    res.send(
      errorResponse.errorHandler(
        errorResponse.ServiceUnavailable,
        "DATABASE_ERROR"
      )
    );
  }
};

module.exports = {
  getDataByUserReq,
};
