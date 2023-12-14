const Hapi = require("@hapi/hapi");
const notesPluggin = require(".");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register({
    plugin: notesPluggin,
    options: { notes: [] },
  });

  await server.start();
  console.log(`server running ${server.info.uri}`);
};

init();
