import React from "react";
import { toast } from "react-toastify";

export const showError = (message) => {
  toast.error(<h6 className="error-message">{message}</h6>, {
    hideProgressBar: false,
    autoClose: 5000,
    position: "top-right",
  });
};

export const showSuccess = (message) =>
  toast.success(<h6 className="success-message">{message}</h6>, {
    hideProgressBar: false,
    autoClose: 5000,
    position: "top-right",
  });
