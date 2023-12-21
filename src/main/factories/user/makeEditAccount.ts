import { EditAccountData } from "../../../data/useCases/user/editAccountData";
import { IsUniqueField } from "../../../data/useCases/user/isUniqueField";
import { UserRepository } from "../../../infra/typeorm/repositories/userRepository";
import { EditAccount } from "../../../presentation/controllers/user/editAccount";
import { type Controller } from "../../../presentation/protocols/controller";

export const makeEditAccount = (): Controller => {
  const unique = new IsUniqueField(UserRepository)
  const editAccount = new EditAccountData(UserRepository) 
  const controller = new EditAccount(editAccount, unique)
  return controller
}