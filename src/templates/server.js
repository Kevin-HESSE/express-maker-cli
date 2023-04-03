require('dotenv').config();

const app = require('./<%= appDirectory %>');

const PORT = process.env.PORT || <%= port %>;

app.listen(PORT, () => {
  console.log('The server is running on : http://localhost:'+ PORT);
});
