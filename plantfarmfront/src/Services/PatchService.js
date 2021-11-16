import axios from 'axios'
axios.defaults.headers.common = {'Authorization': `Bearer ` + localStorage.getItem('USER_KEY')}

const PATCHS_API_BASE_URL="http://localhost:8080/api/patches";

class PatchService {

    getPatches(){
        return axios.get(PATCHS_API_BASE_URL)
    }

    getPatchById(patchId){
        return axios.get(PATCHS_API_BASE_URL + '/' + patchId)
    }

    updatePatch(patchId, plantId){
        return axios.put(PATCHS_API_BASE_URL + '/' + patchId + '/plant/' + plantId);
    }

    endPatch(patchId){
        return axios.put(PATCHS_API_BASE_URL + '/' + patchId);
    }
}
export default new PatchService()