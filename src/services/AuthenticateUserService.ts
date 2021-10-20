import axios from "axios"
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken"

interface IAccessTokenResponse {
    access_token: string;
}


interface IUserResponse {
    id: number;
    avatar_url: string;
    login: string;
    name: string
}

class AuthenticateUserService {
    async execute(code: string) {
        const uri = "https://github.com/login/oauth/access_token";

        const { data: access_token_response } = await axios.post<IAccessTokenResponse>(uri, null, { //requisição para autenticação com github
            params: {
                client_id: process.env.OAUTH_GIT_HUB_CLIENT_ID,
                client_secret: process.env.OAUTH_GIT_HUB_CLIENT_SECRET,
                code: code
            },
            headers: {
                "Accept": "application/json"
            }
        })

        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${access_token_response.access_token}`
            }
        })

        const { id, avatar_url, login, name } = response.data

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login: login,
                    avatar_url: avatar_url,
                    name: name
                }
            })
        }

        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id,
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );


        return { token, user }; //retorna as informaçoes do usuario

    }

}

export { AuthenticateUserService }