import { hash, compare } from "bcrypt";

export class Password {
  static async toHash(password: string) {
    return await hash(password, 10);
  }
  static async compare(hashedPassword: string, password: string) {
    return await compare(password, hashedPassword);
  }
}
