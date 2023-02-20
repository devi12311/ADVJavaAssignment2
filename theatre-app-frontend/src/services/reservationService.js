module.exports = {
    getReservations: async ({ token }) => {
        const playsUrl = `${process.env.REACT_APP_URL}/reservations/list`
        return fetch(playsUrl , {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json());
    },
    makeReservation: async ({ token, playId, hallId, email }) => {
        const playsUrl = `${process.env.REACT_APP_URL}/reservations/create`
        return fetch(playsUrl , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ playId: parseInt(playId), hallId: parseInt(hallId), email })
        }).then(response => response.json());
    }
}
