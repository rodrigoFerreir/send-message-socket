import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server, Socket } from "socket.io";

import { router } from "./routes";

const app = express();
app.use(cors())
const serverHTTP = http.createServer(app);

const io = new Server(serverHTTP, {
    cors: {
        origin: "*"
    }
})

io.on("connection", socket => {
    console.log(`Usuario conectado no socket ${socket.id}`)
})

const PORT = process.env.PORT || 4000;
const clinet_id_oauth = process.env.OAUTH_GIT_HUB_CLIENT_ID;

app.use(express.json());

app.use(router);

//criando rota de auteticação
app.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${clinet_id_oauth}`);
})

//callback
app.get("/signin/callback", (request, response) => {
    const { code } = request.query;
    return response.json(code)
})

app.listen(PORT, () => console.log(`🚀 app is running PORT=${PORT} ... `))