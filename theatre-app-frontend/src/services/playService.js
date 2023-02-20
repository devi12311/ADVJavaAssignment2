module.exports = {
    getAll: async () => {
        const playsUrl = `${process.env.REACT_APP_URL}/play/list`
        return fetch(playsUrl , {
            method: 'GET'
        }).then(response => response.json());
    },
    getOne: async ({ id }) => {
        const playsUrl = `${process.env.APP_URL}/plays/${id}`
        return fetch(playsUrl , {
            method: 'GET'
        }).then(response => response.json());
    }
}
