module.exports = {
    login: async ({ email, password }) => {
        const loginUrl = `${process.env.REACT_APP_URL}/auth/login`
        return fetch(loginUrl , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(response => response.json());
    },

    register: async ({ email, password, firstName, lastName }) => {
        const registerUrl = `${process.env.REACT_APP_URL}/auth/register`
        return fetch(registerUrl , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, firstName, lastName })
        }).then(response => response.json());
    },

    update: async ({ email, password, firstName, lastName, token }) => {
        const registerUrl = `${process.env.REACT_APP_URL}/user/update`
        return fetch(registerUrl , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email, password, firstName, lastName })
        }).then(response => response.json());
    },

    info: async ({ token }) => {
        const registerUrl = `${process.env.REACT_APP_URL}/user/info`
        return fetch(registerUrl , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => response.json());
    },
}
