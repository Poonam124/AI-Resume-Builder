import React, { useEffect, useState } from 'react'
import Header from '../../../components/custom/Header'
import ResumePreview from '../../../dashboard/resume/components/ResumePreview'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import GlobalApi from '@/service/GlobalApi';
import { useParams } from 'react-router-dom';
import { Download, Share, Share2Icon } from 'lucide-react';
import { RWebShare } from 'react-web-share';


function ViewResume() {

  const [resumeInfo,setResumeInfo]=useState();
  const params=useParams();


  const GetResumeInfo=()=>{
        console.log(params)
        GlobalApi.GetResumeById(params?.resumeId).then(resp=>{
          console.log(resp.data.data)
          setResumeInfo(resp.data.data)
        })
      }

useEffect(()=>{
    GetResumeInfo()
  },[])

  const handleDownload=()=>{
    window.print();
  }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div id="no-print">
      <Header/>
      <div className=" bg-gray-50">
        <div className='flex flex-col items-center justify-center  px-4'>
          <h2 className='text-center text-3xl font-bold text-gray-800 mb-4'>Congrats! Your Ultimate AI generated Resume is Ready</h2>
          <p className='text-center text-gray-400 mb-8 max-w-2xl'>Now you are ready to download your resume and you can share unique resume url with your friends and family. </p>
          <div className='space-x-4 mb-6'>
            <button onClick={handleDownload} className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
              <div className='flex gap-2'>
                <Download/>
                Download
              </div>
            </button>
            
            <RWebShare
        data={{
          text: "Hello everyone this is my Resume",
          url: import.meta.env.VITE_BASE_URL+"/my-resume"+params?.resumeId+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume ",
        }}
        onClick={() => console.log("shared successfully!")}
      >
            <button className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors'>
              <div className='flex gap-2'> 
                <Share2Icon/>
                Share
              </div>
            </button>
            </RWebShare>
          </div>

          {/* A4 width fixed, height grows/shrinks with ResumePreview content */}
          <div className='flex items-center justify-center py-10 w-full'>
            <div
              style={{
                width: '210mm',
                maxWidth: '100%',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                background: '#fff',
                borderRadius: 6,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
  <div className='my-10 mx-10 md:mx-20 lg:mx-36'
    id="print-area"
  >
    <ResumePreview />
  </div>


    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
