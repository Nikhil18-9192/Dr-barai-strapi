"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
const axios = require("axios").default;
const queryString = require("query-string");
const PROMO_KEY = `X2g9E3wlciH7RhqW`;
const TRAN_KEY = "QUeoo2jtaF2I8JAc";
const API_URL = "https://www.hellotext.live/vb/apikey.php?";
const senderid = "DBARAI";
module.exports = {
  lifecycles: {
    async afterUpdate(result) {
      if (process.env.NODE_ENV !== "production") return;
      const { reorderLevel, stock } = result;
      if (stock <= reorderLevel) {
        await notifyAdmin(result);
      }
    },
  },
};

const notifyAdmin = (result) => {
  return new Promise(async (resolve, reject) => {
    const apikey = TRAN_KEY;
    const nums = ["9766387420"];
    const params = {
      apikey,
      number: nums,
      message: `Product ${result.name} is low on stock! Current quantity is ${result.stock} and the re-order level is ${result.reorderLevel}.`,
      senderid,
    };
    const url =
      API_URL + queryString.stringify(params, { arrayFormat: "comma" });
    try {
      await axios.get(url);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
