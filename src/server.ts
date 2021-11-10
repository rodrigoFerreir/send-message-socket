import { serverHttp } from "./app";

serverHttp.listen(80, () =>
    console.log(`🚀  Server is running`)
);