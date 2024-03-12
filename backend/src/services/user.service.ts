import datasource from "../lib/datasource";
import { Repository } from "typeorm";
import User, { InputRegister } from "../entities/user.entity";

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

  async createUser({ email, password }: InputRegister) {
    const newUser = this.db.create({ email, password });
    return await this.db.save(newUser);
  }

  async upgradeRoleToAdmin(user: User){
    const editedUser = this.db.create({...user});
    editedUser.role = "ADMIN";

    return await this.db.save(editedUser);

  }
}