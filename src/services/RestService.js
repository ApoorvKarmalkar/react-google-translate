import axios from "axios";

export const restService = async (
  url,
  method,
  data = {},
  headers = {
    headers: {
      "X-RapidAPI-Key": "0d0943144amsh1b86757da7205cap146a23jsn36e53d3288a7",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
  }
) => {
  try {
    let response;
    switch (method) {
      case "get":
        response = await axios[method](url, headers);
        break;

      case "post":
        response = await axios[method](url, data, headers);
        break;

      default:
        break;
    }
    if (200 === response.status) {
      return response.data;
    } else {
      console.log("error", response.status);
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};
