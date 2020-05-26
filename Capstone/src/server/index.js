
const PORT = 3000;

// Setup server
const app = require('./app');

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}. You can open it in your browser`);
});
