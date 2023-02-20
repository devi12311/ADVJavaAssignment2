module.exports = {
    getAll: async ({ token }) => {
        const playsUrl = `${process.env.APP_URL}/halls`
        return fetch(playsUrl , {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json());
    },
    getOne: async ({ token, id }) => {
        const playsUrl = `${process.env.APP_URL}/halls/${id}`
        return fetch(playsUrl , {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json());
    }
}
