import { FastifyInstance } from "fastify";
import { db } from "../db";
import {z} from "zod"

export async function commentsRouter(server: FastifyInstance) {
    // db.comment...

    // .findMany()
    server.get('/news/:id/comments', async (request, reply) => {
        const { id } = request.params as { id: string }

        try {
            const comments = await db.comment.findMany({
                where:{
                    newsId: id
                },
            });
            reply.code(200).send(comments)
        } catch (error){
            console.error(error);
            const errorMessage = (error as Error).message;

            reply.code(500).send({error: "An error occurred", details: errorMessage});
        }
    })  

    // .create()
    server.post('/news/:id/comments', async (request, reply) => {
        const { id } = request.params as { id: string };

        
        const createCommentSchema = z.object({
            content: z
                .string()
                .min(1)
                .max(500),
            authorId: z
                .string()
                .uuid(),
        }); 

        try {
            
            const existingNews = await db.news.findUnique({
                where: {id},
            });

            if (!existingNews) {
                return reply.code(404).send({ error: 'News not found' });
            }


            const { content, authorId } = createCommentSchema.parse(request.body);
            
            const comment = await db.comment.create({
                data: {
                    content: content,
                    authorId: authorId,
                    newsId: id,
                },
            });

            reply.code(201).send(comment);
        } catch (error) {
            console.error(error);
            reply.code(400).send({ error: 'Invalid Data' });
        }
    });
}
