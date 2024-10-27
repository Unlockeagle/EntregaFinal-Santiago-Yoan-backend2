import { isValidPasswordDto, userDto } from "../dto/user.dto.js";
import UserRepository from "../repositories/user.repository.js";

class SessionService {
    async register(dataUser) {
        const user = await UserRepository.createUser(userDto(dataUser));
        return user;
    }
    async login(email, password) {
        const user = await UserRepository.findOne(email);
         
        if (!user) {
            throw new Error("Error usuario no existe");
        }
        const isValidPassword = isValidPasswordDto(password, user);

        if (!isValidPassword) {
            throw new Error("Error Contraseña no valida");
        } else {
            return user;
        }
    }
}

export default new SessionService();
