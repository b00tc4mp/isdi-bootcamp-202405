export default (propertyId, ownerId, tenantId, startDate, endDate, price) => {
    // Validaciones
    validate.string(propertyId, 'propertyId');
    validate.string(ownerId, 'ownerId');
    validate.string(tenantId, 'tenantId');
    validateDate(startDate, 'startDate');
    validateDate(endDate, 'endDate');
    validate.number(price, 'price');

    return fetch(`${import.meta.env.VITE_API_URL}/contracts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            propertyId,
            ownerId,
            tenantId,
            startDate,
            endDate,
            price,
        }),
    })
        .catch(error => {
            throw new SystemError(error.message);
        })
        .then(response => {
            const { status } = response;

            if (status === 201) return;

            return response.json().then(body => {
                const { error, message } = body;

                const constructor = errors[error];

                throw new constructor(message);
            });
        });
};
