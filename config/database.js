module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri: `mongodb://strapi:IrsaIIRsDvLI7aLJ@cluster0-shard-00-00.bgyvv.mongodb.net:27017,cluster0-shard-00-01.bgyvv.mongodb.net:27017,cluster0-shard-00-02.bgyvv.mongodb.net:27017/strapi-primary?ssl=true&replicaSet=atlas-11s3bn-shard-0&authSource=admin&retryWrites=true&w=majority`,
      },
      options: {
        ssl: true,
      },
    },
  },
});
