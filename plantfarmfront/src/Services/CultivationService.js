import axios from 'axios'

const CULTIVATION_API_BASE_URL="http://localhost:8080/api/cultivation";

class CultivationService {

    getAllCultivations(){
        return axios.get(CULTIVATION_API_BASE_URL,{
            headers: {
                'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
            }});
    }
}
export default new CultivationService()