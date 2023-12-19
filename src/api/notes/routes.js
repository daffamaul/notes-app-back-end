const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    // handler: (request, h) => handler.postNoteHandler(request, h),
    handler: handler.postNoteHandler
  },
  {
    method: 'GET',
    path: '/notes',
    // handler: () => handler.getAllNotesHandler(),
    handler: handler.getAllNotesHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    // handler: (request, h) => handler.getNoteByIdHandler(request, h),
    handler: handler.getNoteByIdHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    // handler: (request, h) => handler.putNoteByIdHandler(request, h),
    handler: handler.putNoteByIdHandler
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    // handler: (request, h) => handler.deleteNoteByIdHandler(request, h),
    handler: handler.deleteNoteByIdHandler
  },
];

module.exports = routes;
