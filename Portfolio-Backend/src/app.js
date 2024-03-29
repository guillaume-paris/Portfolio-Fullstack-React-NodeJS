require('dotenv').config();
require('./config/database.js');

const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const swaggerDocument = require('./config/swagger');
const authRoutes = require('./api/routes/authRoutes');
const userRoutes = require('./api/routes/userRoutes');
const projectRoutes = require('./api/routes/projectRoutes');

const app = express();

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Initialisation
app.use(express.json());
app.use(cors());

// Main routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 4242;

http.createServer(app).listen(port, () => {
  console.log(`API server listening on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is already in use. Please free up the port and try again.`);
    process.exit(1);
  } else {
    throw err;
  }
});
