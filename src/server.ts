import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import scalarAPIReference from '@scalar/fastify-api-reference';
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform
} from 'fastify-type-provider-zod';
import { getCourseByIdRoute } from './routes/courses/get-course-by-id.ts';
import { getCoursesRoute } from './routes/courses/get-courses.ts';
import { createCourseRoute } from './routes/courses/create-course.ts';

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Education API',
      version: '1.0.0'
    },
  },
  transform: jsonSchemaTransform
});

server.register(scalarAPIReference, {
  routePrefix: '/docs'
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, { origin: '*' });

server.register(getCourseByIdRoute, { prefix: '/api' });
server.register(getCoursesRoute, { prefix: '/api' });
server.register(createCourseRoute, { prefix: '/api' });


server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!');
  console.log('DB', process.env.DATABASE_URL);
})