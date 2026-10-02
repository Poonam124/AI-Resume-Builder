import { University } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "./../../../../context/ResumeInfoContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "react-toastify";



function Education() {
  const [educationaList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params=useParams();

  const handleChange = (index, event) => {
    const newEntries = educationaList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationaList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationalList((educationaList) => educationaList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true)
    const data={
        data:{
        education:educationaList
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

    

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationaList,
    });
  }, [educationaList]);

  return (
    <div>
      <div className="p-6 shadow-lg rounded-xl border-t-4 border-purple-500 bg-white">
        <h2 className="font-extrabold text-xl mb-2 text-gray-800">
          Education Experience
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Add your Educational details
        </p>

        <div>
          {educationaList.map((item, index) => (
            <div key={index}>
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-100 p-4 mb-5 rounded-lg hover:shadow transition-shadow duration-150">
                <div className="col-span-2">
                  <label>University Name</label>
                  <input
                  defaultValue={item?.universityName}
                    name="universityName"
                    onChange={(event) => handleChange(index, event)}
                    className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label>Degree</label>
                  <input 
                    defaultValue={item?.degree}
                    name="degree"
                    onChange={(event) => handleChange(index, event)}
                    className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label>Major</label>
                  <input
                    defaultValue={item?.major}
                    name="major"
                    onChange={(event) => handleChange(index, event)}
                    className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    className="border border-gray-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div className="col-span-2">
                    <label>Description</label>
                  <textarea
                  name="description"
                    required
                    placeholder="Type your message..."
                    rows="4"
                    className="w-full mt-4 p-4 border border-black-800 rounded-2xl bg-white text-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="space-x-4">
            <button
              onClick={AddNewEducation}
              className="text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-600 px-3 py-1.5 rounded-md transition-colors duration-150"
            >
              <div className="flex">
                <Plus /> Add More Education
              </div>
            </button>

            <button
              onClick={RemoveEducation}
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
  );
}

export default Education;
