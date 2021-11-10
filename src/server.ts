import { serverHttp } from "./app";

const port = process.env.PORT || 8080
serverHttp.listen(port, () =>
    console.log(`🚀  Server is running:${port}`)
);