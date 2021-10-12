import axios from 'axios'

const PLANTS_API_BASE_URL="http://localhost:8080/api/plants";

class PlantService {

    getPlants(){
        return axios.get(PLANTS_API_BASE_URL)
    }
}
export default new PlantService()