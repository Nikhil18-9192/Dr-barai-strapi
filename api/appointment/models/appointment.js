"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      const clinicalNotes = data.clinicalNotes;
      if (clinicalNotes.observations) {
        await updateObsTemplates(clinicalNotes.observations);
      }
      if (clinicalNotes.diagnoses) {
        await updateDiagTemplates(clinicalNotes.diagnoses);
      }
    },

    async beforeUpdate(params, data) {
      const clinicalNotes = data.clinicalNotes;
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
