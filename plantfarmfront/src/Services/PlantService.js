import axios from 'axios'

const PLANTS_API_BASE_URL="http://localhost:8080/api/plants";

class PlantService {

    getPlants(){
        return axios.get(PLANTS_API_BASE_URL);
    }

    addPlant(formData){
        return axios.post(PLANTS_API_BASE_URL, formData);
    }

    getPlantById(plantId){
        return axios.get(PLANTS_API_BASE_URL + '/' + plantId);
    }

    updatePlant(plant, plantId){
        return axios.put(PLANTS_API_BASE_URL + '/' + plantId,  plant);
    }

    deletePlant(plantId){
        return axios.delete(PLANTS_API_BASE_URL + '/' + plantId);
    }

}
export default new PlantService()