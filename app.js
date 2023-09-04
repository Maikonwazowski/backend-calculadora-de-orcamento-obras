const Hapi = require('@hapi/hapi');
const HapiCors = require('hapi-cors');
const endpoints = require('./endpoints');

async function start() {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  await server.register({
    plugin: HapiCors,
    options: {
      origins: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    },
  });

  server.route(endpoints);

  try {
    await server.start();
    console.log(`Servidor rodando em: ${server.info.uri}`);
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
  }
}

start();
