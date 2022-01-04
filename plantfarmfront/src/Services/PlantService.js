import axios from 'axios'

// Adres url serwera
const PLANTS_API_BASE_URL="http://localhost:8080/api/plants";

// Klasa odpowiedzialna za dostęp do danych o roślinach
class PlantService {

   // Metoda zwracająca wszystkie rośliny o danym typie
    getPlantsByType(type){
        return axios.get(PLANTS_API_BASE_URL + '/type/' + type);
    }
     // Metoda zwracająca rośline o danym id
    getPlantById(plantId){
        return axios.get(PLANTS_API_BASE_URL + '/' + plantId);
    }

    // Metoda zwracająca wszystkie rośliny 
    getPlants(){
        return axios.get(PLANTS_API_BASE_URL);
    }

    // Metoda zwracająca trzy pierwsze rośliny z bazy
    getShowPlants(){
        return axios.get(PLANTS_API_BASE_URL + '/show')
    }

    // Metoda odpowiedzialna za dodanie nowej rośliny
    addPlant(formData){
        return axios.post(PLANTS_API_BASE_URL, formData);
    }

     // Metoda odpowiedzialna za aktualizacje danych o roślinie
    updatePlant(formData){
        return axios.put(PLANTS_API_BASE_URL,  formData);
    }

     // Metoda odpowiedzialna za aktualizacje danych oraz grafiki rośliny
    updatePlantAndImage(formData){
        return axios.put(PLANTS_API_BASE_URL + '/all',  formData);
    }

     // Metoda odpowiedzialna za usuniecie danej rośliny z bazy
    deletePlant(plantId){
        return axios.delete(PLANTS_API_BASE_URL + '/' + plantId);
    }
}
export default new PlantService()