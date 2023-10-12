import { server } from "../server";

// Routers
import { usersRouter } from "./users";
import { newsRouter } from "./news";
import { commentsRouter } from "./comments";

server.register(usersRouter);
server.register(newsRouter);
server.register(commentsRouter);

server.get('/', () => 'API da TNT News!')

export default server