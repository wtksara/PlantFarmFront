import axios from 'axios'

const TANK_API_BASE_URL="http://localhost:8080/api/tank";

class TankService {

    getTank(id){
        return axios.get(TANK_API_BASE_URL + "/" + id);
    }

    watering(){
        return axios.post(TANK_API_BASE_URL + "/watering");
    }

}
export default new TankService()