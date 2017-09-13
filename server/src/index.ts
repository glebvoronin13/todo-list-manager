import server from './server';

async function start() {
    const port = await server.start(process.env.PORT || 3000);
    console.log(`Server is listening on port ${port}!`);
}

start();
