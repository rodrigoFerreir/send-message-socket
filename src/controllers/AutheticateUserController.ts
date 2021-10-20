import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AutheticateUserController {
    async handle(request: Request, response: Response) {
        const { code } = request.body;
        const service = new AuthenticateUserService();
        try {
            const result = await service.execute(code);
            return response.json(result);
        } catch (error) {
            return response.json({
                Error: error.message,
                message: "Erro de autenticação"
            })
        }

    }
}

export { AutheticateUserController }