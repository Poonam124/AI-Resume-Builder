import React, { useEffect } from 'react'
import { useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Minus, Plus } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "./../../../../context/ResumeInfoContext";
import { useContext } from 'react';
import GlobalApi from "@/service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";



function Skills() {
    const [skillsList,setSkillsList]=useState([{
        name:'',
        rating:0,
    }])
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params=useParams();

    const AddNewSkill = () => {
    setSkillsList([
      ...skillsList,
      {
        name:'',
        rating:0,
      },
    ]);
  };

   const RemoveSkill = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

    const  handleChange=(index,name,value)=>{
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
    }

    const onSave=()=>{
            setLoading(true)
                const data={
                    data:{
                    skills:skillsList
                    }
                }
                GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
                    console.log(resp);
                    setLoading(false)
                    toast('Details Updated')
                },(error)=>{
                    setLoading(false);
                    toast("Server Error, Please try again")
                })
    }

     useEffect(()=>{
        setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
     },[skillsList])
    
  return (
    <div>
       <div className="p-6 shadow-lg rounded-xl border-t-4 border-purple-500 bg-white">
        <h2 className="font-extrabold text-xl mb-2 text-gray-800">
          Skills
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Add your Professional skills
        </p>

        <div>
            {skillsList.map((item,index)=> (
                <div key={index} className='relative grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-100 p-4 mb-5 rounded-lg hover:shadow transition-shadow duration-150"'>
                    
                    <div>
                  <label className='text-lg'>Name</label>
                  <input 
                  defaultValue={item?.name}
                    onChange={(e) => handleChange(index, 'name',e.target.value)}
                    className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                 <Rating style={{ maxWidth: 150 }} defaultValue={item.rating} onChange={(v) => handleChange(index, 'rating',v)} />

                </div>
            ))}
        </div>
                <div className="flex items-center justify-between mt-4">
          <div className="space-x-4">
            <button
              onClick={AddNewSkill}
              className="text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-600 px-3 py-1.5 rounded-md transition-colors duration-150"
            >
              <div className="flex">
                <Plus /> Add More Skills
              </div>
            </button>

            <button
              onClick={RemoveSkill}
              className="text-gray-500 hover:text-red-700 px-3 py-1.5 rounded-md"
            >
              Remove
            </button>
          </div>

          <button
            onClick={onSave}
            type="submit"
            className="bg-purple-500 text-white rounded-lg flex justify-right 
            px-4 py-2 mt-4 hover:bg-purple-900"
            disabled={loading}
          >
            {" "}
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </button>
        </div>

        </div>
    </div>
  )
}

export default Skills
