import app from './app';
import * as http from 'http';

const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, () => {
  console.log(`Server bound to PORT: ${PORT}`);
});