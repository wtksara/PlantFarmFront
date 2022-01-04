import axios from 'axios'

// Adres url serwera 
const LOGIN_API_BASE_URL="http://localhost:8080/api/auth/login";

// Klasa odpowiedzialna za dostęp do bazy danych użytkowników
class LoginService {

    // Metoda odpowiedzialana za uwierzytelnienie użytkownika
    loginIn(clientDetails){
        return axios.post(LOGIN_API_BASE_URL, clientDetails);
    }
}
export default new LoginService()