export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3084,
  MONGO_URL: process.env.MONGO_URL,
  DATA_API_URL: process.env.DATA_API_URL,
});
