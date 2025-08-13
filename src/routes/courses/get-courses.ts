import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../../database/client.ts'
import { courses } from '../../database/schema.ts'
import { courseSchema } from '../../schemas/course.schema.ts'

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/courses', {
    schema: {
      tags: ['courses'],
      summary: 'Get all courses',
      response: {
        200: z.object({ courses: z.array(courseSchema) })
      }
    }
  }, async (request, reply) => {
    const result = await db.select().from(courses)
  
    return reply.send({ courses: result })
  })
}