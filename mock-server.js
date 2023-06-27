const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./mock-server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/auth/sign-in', (req, res) => {
  const response = router.db.get('login');
  res.json(response);
});

server.use(router);
server.listen(7001, () => {
  console.log('JSON Server is running on port 7001');
});
