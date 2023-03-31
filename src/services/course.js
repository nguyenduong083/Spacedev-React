import axios from 'axios'
import { api, COURSE_API } from '../config/api'

export const courseService = {
    // mock data
    getCourse: (query = '') => {
        return api.get(`${COURSE_API}/courses${query}`)
    },
    getCourseDetail(id) {
        return api.get(`${COURSE_API}/courses/${id}`)
    },
    getRelative(id) {
        return api.get(`${COURSE_API}/courses/related/${id}`)
    },
    register(id, data) {
        return api.post(`${COURSE_API}/courses/register/${id}`, data)
    },
    getMyCourse(){
        return api.get(`${COURSE_API}/courses/my-course`)
    }
}
