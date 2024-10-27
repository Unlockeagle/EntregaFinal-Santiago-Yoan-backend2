import { createHash, isValidPassword} from "../utils/bcrypt.js";

export const userDto = (dataUser) =>  {

    const {first_name, last_name, age, email, password, cartId, imgUrl} = dataUser

    const newUser = {
        first_name, last_name, age, email, password: createHash(password), cartId, imgUrl
    }
    return newUser

}

export const isValidPasswordDto = (password, user) => {
    const compare = isValidPassword(password, user)
    return compare
}