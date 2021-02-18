module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri: `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass`,
      },
      options: {
        ssl: false,
      },
    },
  },
});
