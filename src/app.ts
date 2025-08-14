import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarAPIReference from '@scalar/fastify-api-reference'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { createCourseRoute } from './routes/courses/create-course.ts'
import { getCourseByIdRoute } from './routes/courses/get-course-by-id.ts'
import { getCoursesRoute } from './routes/courses/get-courses.ts'

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
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Education API',
        version: '1.0.0',
      }
    },
    transform: jsonSchemaTransform,
  })
  
  server.register(scalarAPIReference, {
    routePrefix: '/docs',
  })
}
server.register(fastifyCors, { origin: '*' });

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(getCourseByIdRoute, { prefix: '/api' });
server.register(getCoursesRoute, { prefix: '/api' });
server.register(createCourseRoute, { prefix: '/api' });

export { server }