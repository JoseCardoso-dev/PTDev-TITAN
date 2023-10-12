import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db";

export async function newsRouter(server: FastifyInstance) {
    // db.news...

    // .findMany()
    server.get('/news', async (_, reply) => {
        try {
            const news = await db.news.findMany({
                orderBy: {
                    date: 'desc'
                }
            });

            reply.send(news);
        } catch (error) {
            console.error(error);
            const errorMessage = (error as Error).message;

            reply.code(500).send({ error: "Internal Server Error", details: errorMessage });
        }
    })

    // .recents
    server.get('/news/recent', async (_, reply) => {
        try {
            const recentNews = await db.news.findMany({
                orderBy: {
                    date: 'desc'
                },
                take: 4
            });

            reply.send(recentNews);
        } catch (error) {
            console.error(error);
            const errorMessage = (error as Error).message;

            reply.code(500).send({ error: 'An error occurred', details: errorMessage });
        }
    });

    // .filter category
    server.get('/news/:category', async (request, reply) => {
        const { category } = request.params as { category: string };

        try {
            const newsByCategory = await db.news.findMany({
                where: {
                    category: category
                },
                orderBy: {
                    date: 'desc'
                }
            });

            reply.send(newsByCategory);
        } catch (error) {
            console.error(error);
            const errorMessage = (error as Error).message;

            reply.code(500).send({ error: 'An error occurred', details: errorMessage });
        }
    });

    // .search news
    server.get('/news/search/:query', async (request, reply) => {
        const { query } = request.params as { query: string };

        try {
            const searchResults = await db.$queryRaw`
            SELECT *
                FROM News
                WHERE
                    LOWER(title) LIKE ${`%${query.toLowerCase()}%`}
                    OR LOWER(content) LIKE ${`%${query.toLowerCase()}%`}
                    OR LOWER(category) LIKE ${`%${query.toLowerCase()}%`}
                ORDER BY date DESC;
            `;

            reply.code(200).send(searchResults);
        } catch (error) {
            console.error(error);
            reply.code(500).send({ error: 'Erro interno do servidor' });
        }
    });

    // .create()
    server.post('/news', async (request, reply) => {
        const createNewsSchema = z.object({
            image: z
                .string()
                .url(),
            title: z
                .string()
                .min(5)
                .max(100),
            content: z
                .string()
                .max(3000),
            category: z.string(),
            date: z.coerce.date(),
            authorId: z
                .string()
                .uuid()
        });

        try {
            const { image, title, content, category, date, authorId } = createNewsSchema.parse(
                request.body
            );

            const news = await db.news.create({
                data: { image, title, content, category, date, authorId },
            });

            reply.code(201).send(news);
        } catch (error) {
            console.error(error);
            reply.code(500).send({ error: 'Internal Server Error' });
        }

    })
}
