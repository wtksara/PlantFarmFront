import axios from 'axios'
// Przekazanie w nagłówku tokenu uwierzytelniającego
axios.defaults.headers.common = {'Authorization': `Bearer ` + localStorage.getItem('USER_KEY')}

// Adres url serwera 
const PATCHS_API_BASE_URL="http://localhost:8080/api/patches";

// Klasa odpowiedzialna za dostęp do danych o plantacjach
class PatchService {

    // Metoda zwracająca wszystkie plantacje
    getPatches(){
        return axios.get(PATCHS_API_BASE_URL)
    }

    // Metoda zwracająca plantacje o danym id
    getPatchById(patchId){
        return axios.get(PATCHS_API_BASE_URL + '/' + patchId)
    }

    // Metoda ustawiająca na wybranej platancji nową uprawę rośliny
    updatePatch(patchId, plantId){
        return axios.put(PATCHS_API_BASE_URL + '/' + patchId + '/plants/' + plantId);
    }

    // Metoda odpowiadająca za zakończenie uprawy na danej plantacji
    endPatch(patchId){
        return axios.put(PATCHS_API_BASE_URL + '/' + patchId);
    }
}
export default new PatchService()