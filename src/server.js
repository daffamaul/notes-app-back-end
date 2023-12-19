const Hapi = require('@hapi/hapi');
const NotesService = require('./services/postgres/NotesService');
const notes = require('./api/notes');
const NotesValidator = require('./validator/notes');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
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
