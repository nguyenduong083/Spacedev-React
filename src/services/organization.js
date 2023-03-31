import axios from 'axios'
import { api,ORGANIZATION_API}  from '../config/api'

export const organizationService = {
    contact(data){
        return axios.post(`${ORGANIZATION_API}/contact`, data)
    }
}