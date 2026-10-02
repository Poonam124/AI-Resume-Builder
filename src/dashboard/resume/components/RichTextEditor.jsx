import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar} from 'react-simple-wysiwyg';
import { Brain, Copy, LoaderCircle } from "lucide-react";
import { runGeneration } from "@/service/AIanswer";
import { useContext} from 'react';
import { ResumeInfoContext } from './../../../context/ResumeInfoContext';
import { Toaster,toast } from "react-hot-toast";
import { marked } from "marked";




function RichTextEditor({onRichTextEditorChange,index}) {
    const [value, setValue] = useState("");
    const [loading, setLoading] = React.useState(false);
    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext);
    const PROMPT=`position title: ${resumeInfo.experience[index]?.title} , Depends on position title give me 5-7 one line bullet points for my experience in resume keep them short and crisp`;
    const [htmlContent,setHtmlContent]=useState("");
    const GenerateSummaryFromAI=async ()=>{
        if(!resumeInfo.experience[index]?.title)
        {
            toast('Please Add Position Title')
            return;
        }
        console.log(PROMPT)
        setLoading(true);
        const result = await runGeneration(PROMPT);
        
        const Content = marked.parse(result || "");
        setHtmlContent(Content);
        console.log(result);
         setLoading(false);
    }

return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-start justify-between mb-3">
            <div>
                <label className="text-xs text-gray-600 font-medium">Summary</label>
                <p className="text-[11px] text-gray-500 mt-1">Short, crisp one-line bullet points for this role</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    disabled={loading}
                    onClick={GenerateSummaryFromAI}
                    className="px-3 py-2 text-sm font-medium text-purple-600 bg-white border border-purple-500 rounded-md hover:bg-purple-50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
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
        </div>

        <EditorProvider>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <Toolbar className="flex flex-wrap items-center gap-1 px-3 py-2 bg-gray-50">
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />
                    <div className="ml-auto">
                        <BtnClearFormatting />
                    </div>
                </Toolbar>

                <div className="p-3">
                    <Editor
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            onRichTextEditorChange(e);
                        }}
                        className="min-h-[140px] w-full bg-white outline-none"
                        style={{ minHeight: 140 }}
                    />
                </div>
            </div>
        </EditorProvider>

        <div className="mt-3 flex flex-col md:flex-row gap-3">
            <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-gray-600 font-medium">AI Suggestions</label>
                    <span className="text-[11px] text-gray-500">Preview (generated HTML)</span>
                </div>
                <div className="prose max-w-none p-3 bg-white border border-dashed border-gray-200 rounded-md min-h-[80px]">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent || "<span class='text-gray-400'>No suggestions yet</span>" }} />
                </div>
            </div>

            <div className="w-full md:w-48 flex flex-col gap-2">
                <button
                    type="button"
                    onClick={() => {
                        if (!htmlContent) {
                            toast('No generated content to copy');
                            return;
                        }
                        navigator.clipboard
                            .writeText(htmlContent)
                            .then(() => toast.success('Copied HTML to clipboard'))
                            .catch(() => toast.error('Failed to copy'));
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    <Copy /> Copy HTML
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setHtmlContent("");
                        toast('Cleared AI suggestions');
                    }}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Clear Suggestions
                </button>
            </div>
        </div>

        <Toaster />
    </div>
)
}

export default RichTextEditor
