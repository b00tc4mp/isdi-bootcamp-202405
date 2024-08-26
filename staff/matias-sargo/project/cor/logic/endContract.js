export const endContract = (contractId) => {
    validate.string(contractId, 'contractId');
  
    return Contract.findByIdAndUpdate(
      contractId,
      { endDate: new Date() },
      { new: true }
    )
      .catch(error => { throw new SystemError(error.message); });
  };
  