import axios from 'axios';

const baseUrl = 'http://localhost:5000/universities';

export const getUniversities = async (_id) => {
    _id = _id || '';
    return await axios.get(`${baseUrl}/${_id}`);
}

export const addUniversity = async (university) => {
    return await axios.post(`${baseUrl}`, university);
}

export const deleteUniversity = async (_id) => {
    return await axios.delete(`${baseUrl}/${_id}`);
}

export const editUniversity = async (_id, university) => {
    return await axios.put(`${baseUrl}/${_id}`, university)
}