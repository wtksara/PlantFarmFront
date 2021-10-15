import axios from 'axios'

const PLANTS_API_BASE_URL="http://localhost:8080/api/plants";

class PlantService {

    getPlants(){
        return axios.get(PLANTS_API_BASE_URL);
    }

    addPlant(plant){
        return axios.post(PLANTS_API_BASE_URL, plant);
    }

    getPlantById(id){
        return axios.get(PLANTS_API_BASE_URL + '/' + id);
    }
}
export default new PlantService()