"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 *
 */
const axios = require("axios").default;
const queryString = require("query-string");
const PROMO_KEY = `X2g9E3wlciH7RhqW`;
const TRAN_KEY = "QUeoo2jtaF2I8JAc";
const API_URL = "https://www.hellotext.live/vb/apikey.php?";
const senderid = "MSGMSG";

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      if (process.env.NODE_ENV !== "production") return;
      if (result.sendToAll) {
        await sendMessageToAll(result);
      } else {
        await sendMessageToSelected(result);
      }
    },
  },
};

const sendMessageToAll = (result) => {
  return new Promise(async (resolve, reject) => {
    const nums = await strapi.services.patient.find({ _limit: -1 });

    const apikey = result.type === "promotion" ? PROMO_KEY : TRAN_KEY;

    const params = {
      apikey,
      number: nums.map((n) => n.mobile),
      message: result.message,
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

const sendMessageToSelected = (result) => {
  return new Promise(async (resolve, reject) => {
    const apikey = result.type === "promotion" ? PROMO_KEY : TRAN_KEY;
    const nums = result.patients.map((n) => n.mobile);
    const params = {
      apikey,
      number: nums,
      message: result.message,
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
