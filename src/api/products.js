import axios from "axios";
import { handleData, handleUrl } from "@/util";

export const getProducts = (params) =>
  new Promise((resolve, reject) => {
    handleUrl();
    axios
      .get(`${handleUrl()}data.json`)
      .then((res) => {
        const { size, orderBy } = params;
        setTimeout(() => {
          resolve({
            data: handleData(res.data.data, size, orderBy),
          });
        }, 500);
      })
      .catch((error) => {
        reject(error);
      });
  });
