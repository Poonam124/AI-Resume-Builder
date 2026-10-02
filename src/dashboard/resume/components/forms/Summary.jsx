import React from "react";
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css";
import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useEffect } from "react";
import GlobalApi from "@/service/GlobalApi";
import { Toaster, toast } from "react-hot-toast";
import { Brain, Copy, LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { runGeneration } from "@/service/AIanswer";

const Summary = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const params = useParams();
  const prompt = `Job Title: ${resumeInfo?.jobTitle}, Depends on job title give me summary for my resume within 4-5 lines in JSON format with field experince Level and Summary with Experience-level for Fresher, Mid-Level, Experienced Return the output strictly in the following JSON format (no markdown, no explanations) : `;
  const [aiGeneratedSummaryList, setAiGenerateSummneryList] = React.useState();



  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const result = await runGeneration(prompt);
    setLoading(false);

    setAiGenerateSummneryList(result);
  };

  useEffect(() => {
    summary && setResumeInfo({ ...resumeInfo, summary: summary });
  }, [summary]);

  const onSave = (e) => {
    e.preventDefault();
    console.log("working");
    console.log("Form Data to be saved:", params?.resumeId);
    setLoading(true);

    const data = {
      data: {
        summary: summary,
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log("Resume Updated Successfully", res);
        enabledNext(true);
        setLoading(false);
        toast.success("Resume details saved successfully!"),
          console.log("Saved");
      },
      (errror) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-md rounded-lg border-t-purple-500 border-t-4">
        <h2 className="font-bold text-lg mb-4">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <button
              type="button"
              disabled={loading}
              onClick={GenerateSummaryFromAI}
              className="px-4 flex gap-2 py-2 text-sm font-medium text-purple-600 bg-white border border-purple-500 rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <Brain /> Generate from AI
                </>
              )}
            </button>
          </div>

          <textarea
            required
            placeholder="Type your message..."
            rows="4"
            className="w-full mt-4 p-4 border border-black-800 rounded-2xl bg-white text-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              onChange={(e) => {
    setSummary(e.target.value);
    
  }}
          />
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-purple-500 text-white rounded-lg flex justify-right 
            px-4 py-2 mt-4 hover:bg-purple-900"
              disabled={loading}
            >
              {" "}
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </button>
          </div>
        </form>
        <div className="p-4">



         {aiGeneratedSummaryList ? (
  Object.entries(aiGeneratedSummaryList).map(([level, details]) => (
    <div key={level} className="mb-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold text-lg text-purple-700">{level}</h3>
      <div className="flex flex-row items-center justify-between w-full gap-2">
  <p className="text-sm text-gray-600 m-0 whitespace-nowrap">
    {
      details[
        "Experience-Level" 
      ]||
      details["Experience-level" ]||
      details["experience-level" ]||
      details["experiencelevel"]||
      details["Experiencelevel"]||
      details["experienceLevel"]||
      details["ExperienceLevel"]||
      details["Experience-Level"]||
      details["Experience-level" ]||
      details["experience-Level" ]||
      details["experiencelevel"]||
      details["Experiencelevel"]||
      details["experienceLevel"]||
      details["ExperienceLevel"]||
      details["Experience Level"]||
      details["Experience level"]||
      details["experience level"]
    }
  </p>
</div>


      <p className="mt-2 text-gray-800">{details["Summary"]||details["summary"]||details["Summary"]||details["summary"]}</p>
    </div>
  ))
) : (
  null
)}

      



        </div>
      </div>
    </div>
  );
}

export default Summary;
