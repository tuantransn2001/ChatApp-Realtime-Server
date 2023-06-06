import axios from "axios";
import { API_STUFF } from "../ts/enums/api_enums";
class RestFullAPIRequest {
  public static URL: string = API_STUFF.default_URL;
  public static token: string = API_STUFF.access_token;
  public static message: string = "";

  public static async createInstance(
    baseURL: string | null,
    token: string | null
  ) {
    return await axios.create({
      baseURL: baseURL ? baseURL : RestFullAPIRequest.URL,
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}

export default RestFullAPIRequest;
