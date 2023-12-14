const routes = require("./routes");

const notesPluggin = {
  name: "notes",
  register: async (server, options) => {
    const { notes } = options;
    server.route(routes);
    server.route([
      {
        method: "GET",
        path: "/plugin",
        handler: (request, h) => notes,
      },
    ]);
  },
};

module.exports = notesPluggin;
