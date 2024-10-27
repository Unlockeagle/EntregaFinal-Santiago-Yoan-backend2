import UserDao from "../dao/user.dao.js";

class UserRepository {
    async createUser(dataUser){
        return await UserDao.save(dataUser)
    }
    async findOne(email){
        return await UserDao.findOne(email)
    }
}

export default new UserRepository()

