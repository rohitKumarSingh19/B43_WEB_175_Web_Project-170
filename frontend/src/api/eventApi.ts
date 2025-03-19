import axios from 'axios';
const API_URL='http://localhost:5000/api/events';
//CREATE EVENT
export const createEvent=async(eventData:object)=>{
    try{
        const response=await axios.post(`${API_URL}/create`,eventData);
        return response.data;

    }catch(error){
        console.error("Error creating event:",error);
        throw error;
    }
};
// Get All Events
export const getEvents=async()=>{
    try{
        const response=await axios.get(API_URL);
        return response.data;
    }catch(error){
        console.error('Error fetching events:',error);
        throw error
    }
};