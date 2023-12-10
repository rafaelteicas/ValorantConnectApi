import { GetAccountById } from "../../../data/useCases/user/getAccountById";
import { UserRepository } from "../../../infra/typeorm/repositories/userRepository";
import { GetAccountBy } from "../../../presentation/controllers/user/getAccountById";
import { type Controller } from "../../../presentation/protocols/controller";

export const makeGetUserById = (): Controller => {
  const getAccountById = new GetAccountById(UserRepository);
  return new GetAccountBy(getAccountById)
}