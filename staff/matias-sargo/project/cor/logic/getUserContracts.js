export const getUserContracts = (userId) => {
    validate.string(userId, 'userId');
  
    return Contract.find({
      $or: [
        { owner: userId },
        { tenant: userId }
      ]
    })
      .populate('property owner tenant')
      .lean()
      .catch(error => { throw new SystemError(error.message); });
  };
  