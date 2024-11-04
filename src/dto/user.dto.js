import { createHash, isValidPassword} from "../utils/bcrypt.js";

export const userDto = (dataUser, cartId) =>  {

    const {first_name, last_name, age, email, password, imgUrl} = dataUser

    const newUser = {
        first_name, last_name, age, email, password: createHash(password), cartId: cartId, imgUrl
    }
    return newUser

}

export const isValidPasswordDto = (password, user) => {
    const compare = isValidPassword(password, user)
    return compare
}