import axios from 'axios'

const PATCHS_API_BASE_URL="http://localhost:8080/api/patches";

class PatchService {

    getPatches(){
        return axios.get(PATCHS_API_BASE_URL);
    }
    
    getPatchById(patchId){
        return axios.get(PATCHS_API_BASE_URL + '/' + patchId, {
            headers: {
                'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
            }});
    }

    updatePatch(patchId, plantId){
        return axios.put(PATCHS_API_BASE_URL + '/' + patchId + '/plant/' + plantId, {
            headers: {
                'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
            }});
    }

    endPatch(patchId){
        return axios.put(PATCHS_API_BASE_URL + '/' + patchId,{
            headers: {
                'Authorization':'Bearer '+ localStorage.getItem('USER_KEY')
            }});
    }
}
export default new PatchService()