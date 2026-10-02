import axios from "axios";
// const { default: axios }= require("axios");

const API_KEY=import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient=axios.create({
    baseURL:'http://localhost:1337/a',
    headers:{
        'content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
})

const CreateNewResume=(data)=>axiosClient.post('/user-resumes', data);

const GetUserResumes=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

const UpdateResumeDetail=(data)=>axiosClient.put('/user-resume' + id, data);

const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id+"?populate=*");

const DeleteResumeById=(id)=>axiosClient.delete('/user-resume'+id);

export default{
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
}