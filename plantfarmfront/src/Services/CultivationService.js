import axios from 'axios'

// Adres url serwera 
const CULTIVATION_API_BASE_URL="http://localhost:8080/api/cultivation";

// Klasa odpowiedzialna za dostęp do danych o uprawach
class CultivationService {

      // Metoda zwracająca wszystkie uprawy
    getAllCultivations(){
        return axios.get(CULTIVATION_API_BASE_URL);
    }
}
export default new CultivationService()