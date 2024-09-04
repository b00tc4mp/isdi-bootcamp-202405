import { User, Contract } from "../data/models.js";
import { validate, errors } from "com";

const { NotFoundError, ValidationError, SystemError } = errors;

export default (userId, contractId) => {
  validate.string(userId, "userId");
  validate.string(contractId, "contractId");

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return Contract.findById(contractId)
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then((contract) => {
          if (!contract) throw new NotFoundError("Contract not found");

          // Verificar que el usuario sea parte del contrato (propietario o inquilino)
          if (
            ![contract.owner.toString(), contract.tenant.toString()].includes(
              userId
            )
          ) {
            throw new ValidationError("User is not part of this contract");
          }

          // Verificar si el usuario ya ha firmado el contrato
          if (contract.signedBy.includes(userId)) {
            throw new ValidationError("User has already signed this contract");
          }

          // Añadir la firma del usuario al contrato
          contract.signedBy.push(userId);

          return contract.save().catch((error) => {
            throw new SystemError(error.message);
          });
        });
    });
};
