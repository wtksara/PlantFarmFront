import axios from 'axios'

const LOGIN_API_BASE_URL="http://localhost:8080/api/auth";

class LoginService {
    loginIn(clientDetails){
        return axios.post(LOGIN_API_BASE_URL + '/login', clientDetails);
    }
}

export default new LoginService()