const Hapi = require("@hapi/hapi");
const NotesService = require("./services/inMemory/NotesService");
const notes = require("./api/notes");
const NotesValidator = require("./validator/notes");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const notesService = new NotesService();

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`server running ${server.info.uri}`);
};

init();
