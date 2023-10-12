import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function usersRouter(server: FastifyInstance) {
  // db.user...

  // .findMany()
  server.get("/users", (request, reply) => {});

  // .create()
  server.post("/users", async (request, reply) => {
    const createNewsSchema = z.object({
      email: z.string().email(),
      name: z
        .string()
        .regex(/^[A-zÀ-ú ]+$/)
        .max(30),
      password: z
        .string()
        .regex(/[0-9]+/)
        .regex(/[A-Z]+/)
        .regex(/[a-z]+/)
        .regex(/\W/)
        .min(8)
        .max(24),
      admin: z.boolean(),
    });

    try {
      const { email, name, password, admin } = createNewsSchema.parse(
        request.body
      );

      const hash = await bcrypt.hash(password, 10);

      const user = await db.user.create({
        data: { email, name, password:hash, admin },
      });
      
      reply.code(201).send(user);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  });

  server.post("/auth/login", async (request, reply) => {
    const loginSchema = z.object({
      username: z.string().email(),
      passcode: z
        .string()
        .regex(/[0-9]+/)
        .regex(/[A-Z]+/)
        .regex(/[a-z]+/)
        .regex(/\W/)
        .min(8)
        .max(24)
    });

    try{
      const {username, passcode} = loginSchema.parse(
        request.body
      );
      const user = await db.user.findUnique({
        where:{
          email: username,
        },
      })


      if (!user){
        reply.code(404).send({error: 'User not found'})
      } else {
        const match = await bcrypt.compare(passcode, user.password)
        if (!match){
          reply.code(401).send({error: 'Invalid Pasword'})
        }else{
          const token = jwt.sign({id: user.id}, 'secret', {expiresIn: '1h'});
          reply.code(200).send({token:token});
        }

      }
    }catch(error){
      reply.code(500).send(error)
    }
  })
}
  