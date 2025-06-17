export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: "https://cms.ite4108m.com/",
  app: {
    keys: env.array('APP_KEYS'),
  },
});