import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Editor from 'react-simple-wysiwyg';
import RichTextEditor from '../RichTextEditor';
import { Minus, Plus } from 'lucide-react';
import { ResumeInfoContext } from './../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '@/service/GlobalApi';
import { toast } from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';




const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:''
}
function Experience() {

    const[experienceList,setExperienceList]=useState([formField])
    const params = useParams();


    const onSave = (e) => {
            e.preventDefault();
            console.log("working");
            console.log("Form Data to be saved:", params?.resumeId);
            setLoading(true);
            
            const data = {
                data:{
                    experience:List
                }
            }
    
          GlobalApi.UpdateResumeDetail(params?.resumeId, data).then((res) => {
                console.log("Resume Updated Successfully", res);
                        
                        setLoading(false);
                        toast.success("Resume details saved successfully!"),console.log("Saved")
                        
            },(errror) => {
            setLoading(false);
            toast("Server Error, Please try again")
                
            });  
        }





    const handleChange=(index,event)=>{
        const newEntries=experienceList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        setExperienceList(newEntries)
        
    }

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const[loading,setLoading]=useState(false)

    const AddNewExperience=()=>{
        setExperienceList([...experienceList,{
            title:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummary:''
        }])
    }
    const RemoveExperience = () => {
        setEducationalList((experienceList) => experienceList.slice(0, -1));
  };

    const handleRichTextEditor=(e,name,index)=>{
        const newEntries=experienceList.slice();
        newEntries[index][name]=e.target.value;
        setExperienceList(newEntries)
    }
  
 

    useEffect(()=>{
        setResumeInfo({...resumeInfo,
            experience:experienceList
        })
    },[experienceList])

     
return (
    <div>
        <div className="p-6 shadow-lg rounded-xl border-t-4 border-purple-500 bg-white">
            <h2 className="font-extrabold text-xl mb-2 text-gray-800">Professional Experience</h2>
            <p className="text-sm text-gray-600 mb-6">Add your previous/current job experience</p>

            <div>
                {experienceList.map((item, index) => (
                    <div
                        key={index}
                        className="relative grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-100 p-4 mb-5 rounded-lg hover:shadow transition-shadow duration-150"
                    >
                        

                        <div>
                            <label className="block font-medium text-sm mb-1 text-gray-700">Position Title</label>
                            <input
                                name="title"
                                defaultValue={item?.title}
                                onChange={(event) => handleChange(index, event)}
                                className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                                placeholder="e.g. Senior Frontend Engineer"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-sm mb-1 text-gray-700">Company Name</label>
                            <input
                                name="companyName"
                                defaultValue={item?.companyName}
                                onChange={(event) => handleChange(index, event)}
                                className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                                placeholder="e.g. Acme Corp"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-sm mb-1 text-gray-700">City</label>
                            <input
                                name="city"
                                defaultValue={item?.city}
                                onChange={(event) => handleChange(index, event)}
                                className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                                placeholder="e.g. San Francisco"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-sm mb-1 text-gray-700">State</label>
                            <input
                                name="state"
                                defaultValue={item?.state}
                                onChange={(event) => handleChange(index, event)}
                                className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                                placeholder="e.g. CA"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-sm mb-1 text-gray-700">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                defaultValue={item?.startDate}
                                onChange={(event) => handleChange(index, event)}
                                className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-sm mb-1 text-gray-700">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                defaultValue={item?.endDate}
                                onChange={(event) => handleChange(index, event)}
                                className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block font-medium text-sm mb-2 text-gray-700">Work Summary</label>
                            <div className="border border-gray-100 rounded-md p-2 bg-gray-50">
                                <RichTextEditor
                                index={index}  
                                onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummary',index)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="space-x-4">
                    <button
                        onClick={AddNewExperience}
                        className="text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-600 px-3 py-1.5 rounded-md transition-colors duration-150"
                    >
                        <div className='flex'><Plus/> Add More Experience</div>
                    </button>

                    <button
                        onClick={RemoveExperience}
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

export default Experience
