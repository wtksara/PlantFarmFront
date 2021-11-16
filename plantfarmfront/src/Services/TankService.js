import axios from 'axios'

const TANK_API_BASE_URL="http://localhost:8080/api/tank";

class TankService {

    getTank(){
        return axios.get(TANK_API_BASE_URL);
    }
}
export default new TankService()