"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
const moment = require("moment");
module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      const clinicalNotes = data.clinicalNotes;
      if (!clinicalNotes) return;
      if (clinicalNotes.observations) {
        await updateObsTemplates(clinicalNotes.observations);
      }
      if (clinicalNotes.diagnoses) {
        await updateDiagTemplates(clinicalNotes.diagnoses);
      }
    },

    async afterCreate(result) {
      const date = moment(result.startDateTime).format("DD MMMM YYYY");
      const time = moment(result.startDateTime).format("hh:mm A");

      const patients = [result.patient.id];

      const message = `You have/had an appointment at Dr. Barais Clinic on ${date} ${time}. Contact +919766387420 for more info.`;
      try {
        await strapi.services.notification.create({
          message,
          patients,
        });
      } catch (error) {
        console.log("error sending appointment sms");
      }
    },

    async beforeUpdate(params, data) {
      const clinicalNotes = data.clinicalNotes;
      if (!clinicalNotes) return;
      if (clinicalNotes.observations) {
        await updateObsTemplates(clinicalNotes.observations);
      }
      if (clinicalNotes.diagnoses) {
        await updateDiagTemplates(clinicalNotes.diagnoses);
      }
    },
  },
};

const updateObsTemplates = (obs) => {
  return new Promise(async (resolve, reject) => {
    try {
      await strapi.services["observation-template"].create({ value: obs });
      resolve();
    } catch (error) {
      resolve();
    }
  });
};

const updateDiagTemplates = (diag) => {
  return new Promise(async (resolve, reject) => {
    try {
      await strapi.services["diagnose-template"].create({ value: diag });
      resolve();
    } catch (error) {
      resolve();
    }
  });
};
