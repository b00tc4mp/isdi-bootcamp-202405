export default (contractId, userId) => {
    validate.string(contractId, 'contractId');
    validate.string(userId, 'userId');

    // Realiza la solicitud a la API para firmar el contrato
    return fetch(`${import.meta.env.VITE_API_URL}/contracts/${contractId}/sign`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,  // Asumiendo que el token se almacena en sessionStorage
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),  // Enviar el userId del firmante
    })
    .catch(error => {
        throw new SystemError(error.message); // Manejo de errores del sistema
    })
    .then(response => {
        const { status } = response;

        if (status === 200) return; // Si la firma es exitosa, no hacemos nada más

        return response.json().then(body => {
            const { error, message } = body;

            const constructor = errors[error]; // Obtiene el constructor del error correspondiente

            throw new constructor(message); // Lanza un error personalizado basado en la respuesta del servidor
        });
    });
};