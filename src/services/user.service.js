import { isValidPasswordDto, userDto } from "../dto/user.dto.js";
import cartRepository from "../repositories/cart.repository.js";
import UserRepository from "../repositories/user.repository.js";

class SessionService {
    async register(dataUser, email) {
        const existeUser = await UserRepository.findOne(email);
        if(!existeUser){
            const cart = await cartRepository.createCart()
            const cartId = await cart._id
            const user = await UserRepository.createUser(userDto(dataUser, cartId));
            
            return user;

        }else {
            throw new Error("Email ya esta en uso");
            
        }
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
