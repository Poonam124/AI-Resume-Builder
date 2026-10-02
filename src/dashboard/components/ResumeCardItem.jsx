import { Ellipsis, EllipsisVertical, Loader2Icon, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import GlobalApi from "@/service/GlobalApi";
import cv from "@/assets/cv.jpeg";
import * as AlertDialog from "@/components/ui/alert-dialog";
// import toast from "sonner";

function ResumeCardItems({ resume,refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (resp) => {
        console.log(resp);
        toast.success("Resume Deleted!");
        refreshData(); // refresh resume list after delete
        setLoading(false);
        setOpenAlert(false); // close the dialog
      },
      (error) => {
        console.error(error);
        toast.error("Failed to delete resume");
        setLoading(false);
      }
    );
  };

  return (
    <div className="transform transition-transform duration-300 hover:scale-105">
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div
          className="p-14  bg-gradient-to-b
     from-pink-100 via-purple-200 to-blue-200
   h-[280px] 
     rounded-t-lg border-t-4 
     transition-all duration-300 hover:shadow-xl
   "
          style={{
            borderColor: resume?.themeColor || "#ff6666",
          }}
        >
          <div
            className="flex 
   items-center justify-center h-[180px] "
          >
            {/* <Notebook/> */}
            <img src={cv} width={120} height={120} />
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between text-white rounded-b-lg shadow-lg transition-all duration-300 hover:shadow-xl"
        style={{
          background: resume?.themeColor || "#ff6666",
        }}
      >
        <h2 className="text-sm">{resume.title}</h2>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="text-white rounded-md hover:bg-gray-600 transition-colors duration-200">
              <EllipsisVertical />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[160px] bg-white border rounded-md shadow-md p-2"
              sideOffset={5}
            >
              <DropdownMenu.Item
                onClick={() =>
                  navigation("/dashboard/resume/" + resume.documentId + "/edit")
                }
                className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                Edit Resume
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() =>
                  navigation("/my-resume/" + resume.documentId + "/view")
                }
                className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                View
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() =>
                  navigation("/my-resume/" + resume.documentId + "/view")
                }
                className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                Download
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this resume?"
                  );
                  if (confirmDelete) {
                    onDelete();
                  }
                }}
                className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-red-600"
              >
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <AlertDialog open={openAlert}>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Show Dialog
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setOpenAlert(false)} >Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={onDelete}
      disabled={loading}>
        {loading? <Loader2Icon className="animate-spin"/>:'Delete'}
        Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItems;
