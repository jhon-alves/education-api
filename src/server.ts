import { server } from "./app.ts"

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!');
  console.log('DB', process.env.DATABASE_URL);
  console.log('ENV', process.env.NODE_ENV);
})