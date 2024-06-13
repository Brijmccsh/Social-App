// app.js or index.js
const express = require('express');
const swagger = require('./config/swagger');
const swaggerUi = require('swagger-ui-express');
const app = express();

// Other app configurations and middleware setups

// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.specs));

// Mount your API routes
const profileRouter = require('./routes/profile');
const channelRouter = require('./routes/channel');
// Add more routes as needed

app.use('/api/profile', profileRouter);
app.use('/api/channel', channelRouter);
// Add more routes as needed

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

