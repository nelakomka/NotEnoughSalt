const jsonServer = require('json-server');
const auth = require('json-server-auth');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
server.use(auth);

server.get('/user/me', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'No token provided or incorrect format' });
  }

  const token = authHeader.split(' ')[1]; // Получаем сам токен

  try {
    const secretKey = 'json-server-auth-123456'; // Убедитесь, что ключ корректен
    const decoded = jwt.verify(token, secretKey);

    const userId = Number(decoded.sub);

    const user = router.db.get('users').find({ id: userId }).value();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
