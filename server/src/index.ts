import server from './server';

async function start() {
    let port = await server.start(process.env.PORT || 3000);
    console.log(`Server is listening on port ${port}!`);
}

start();
