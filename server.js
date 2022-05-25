require('./init');
const cluster = require('cluster');
const os = require('os');

const configs = require("./config/app.config");

const PORT = configs.PORT;

const makeApplication = require('./app');
const server = makeApplication();

if (cluster.isMaster && configs.APP_MODE === "production" && false) {
  console.log(`Running on: http://localhost:${PORT}`);

  for (let cpu of os.cpus()) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died (${signal}. Restarting...)`);
    cluster.fork();
  });
} else {
  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running...`);
  });
}