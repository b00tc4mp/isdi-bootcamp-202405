export const signContract = (contractId, userId) => {
    validate.string(contractId, 'contractId');
    validate.string(userId, 'userId');
  
    return Contract.findById(contractId)
      .then(contract => {
        if (!contract) throw new NotFoundError('Contract not found');
  
        // Verificar que el usuario sea parte del contrato (propietario o inquilino)
        if (![contract.owner.toString(), contract.tenant.toString()].includes(userId)) {
          throw new ValidationError('User is not part of this contract');
        }
  
        // Verificar si el usuario ya ha firmado el contrato
        if (contract.signedBy.includes(userId)) {
          throw new ValidationError('User has already signed this contract');
        }
  
        // Añadir la firma del usuario al contrato
        contract.signedBy.push(userId);
  
        return contract.save();
      })
      .catch(error => { throw new SystemError(error.message); });
  };
  