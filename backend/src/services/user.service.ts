import { Repository } from "typeorm";
import * as argon2 from "argon2";
import User, {
  InputRegister,
  inputUpdateProfile,
  inputUpdateName,
  inputUpdatePassword,
} from "../entities/user.entity";
import datasource from "../lib/datasource";
import { AVATAR } from "../types";

export default class UserService {
  db: Repository<User>;
  constructor() {
    this.db = datasource.getRepository(User);
  }

  async listUsers() {
    return this.db.find();
  }

  async findUserByEmail(email: string) {
    return await this.db.findOneBy({ email });
  }

  async findUserById(id: string) {
    return await this.db.findOneBy({ id });
  }

  async createUser({
    email,
    password,
    username,
    accepted_terms,
  }: InputRegister) {
    const newUser = this.db.create({
      email,
      password,
      username,
      accepted_terms,
    });
    return await this.db.save(newUser);
  }

  async changeAvatarOfThisUser(user: User, newAvatar: AVATAR) {
    const editedUserAvatar = this.db.create({ ...user });
    editedUserAvatar.avatar = newAvatar;
    return await this.db.save(editedUserAvatar);
  }

  async updateProfileOfThisUser(user: User, updateData: inputUpdateProfile) {
    const updatedUserProfile = this.db.create({ ...user });
    updatedUserProfile.gender = updateData.gender;
    updatedUserProfile.birth_date = updateData.birth_date;
    updatedUserProfile.country = updateData.country;
    return await this.db.save(updatedUserProfile);
  }

  async updateNameOfThisUser(user: User, updateName: inputUpdateName) {
    const updatedUsername = this.db.create({ ...user });
    updatedUsername.username = updateName.username;
    return await this.db.save(updatedUsername);
  }

  async changeUserPassword(user: User, passwordData: inputUpdatePassword) {
    const updatedPassword = this.db.create({ ...user });
    updatedPassword.password = await argon2.hash(passwordData.newPassword);
    return await this.db.save(updatedPassword);
  }

  async deleteThisAccount(user: User) {
    return await this.db.delete(user.id);
  }

  async upgradeToPremium(user: User) {
    const editedUserPremium = this.db.create({ ...user });
    editedUserPremium.isPremium = true;
    return await this.db.save(editedUserPremium);
  }

  async removePremium(user: User) {
    const editedUserPremium = this.db.create({ ...user });
    editedUserPremium.isPremium = false;
    return await this.db.save(editedUserPremium);
  }
}
