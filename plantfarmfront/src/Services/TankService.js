import axios from 'axios'

// Adres url serwera
const TANK_API_BASE_URL="http://localhost:8080/api/tank";

// Klasa odpowiedzialna za dostęp do danych o zbiornikach
class TankService {

    // Metoda zwracająca zbiornik o danym id
    getTank(id){
        return axios.get(TANK_API_BASE_URL + "/" + id);
    }
     // Metoda odpowiedzialna za wysłanie wiadomości o chęci podlania roślin
    waterPlants(id){
        return axios.post(TANK_API_BASE_URL + "/" + id);
    }


}
export default new TankService()