import UserModel from "../models/user.model.js";

class UserDao {
    async save(dataUser) {
        const user = new UserModel(dataUser);
        return await user.save();
    }
    async findOne(email) {
        return await UserModel.findOne({ email });
    }
}

export default new UserDao();
