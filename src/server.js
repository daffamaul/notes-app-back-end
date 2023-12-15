const Hapi = require("@hapi/hapi");
const NotesService = require("./services/inMemory/NotesService");
const notes = require("./api/notes");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const noteService = new NotesService();

  await server.register({
    plugin: notes,
    options: { service: noteService },
  });

  await server.start();
  console.log(`server running ${server.info.uri}`);
};

init();
