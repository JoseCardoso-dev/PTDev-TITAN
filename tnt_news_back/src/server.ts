import fastify, { FastifyInstance } from "fastify";
import cors from '@fastify/cors';

export const server = fastify();

server.register(cors);

export async function startServer(server: FastifyInstance) {
    try {
        await server.listen({
            port: process.env.PORT ? Number(process.env.PORT) : 3333,
            host: '0.0.0.0'
        })
        console.log('TNT API rodando...')
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}