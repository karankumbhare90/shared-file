import { MdOutlineContentCopy } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";


const DownloadFile = ({ downloadPageLink }) => {

    const handleCopyLink = () => {
        navigator.clipboard.writeText(downloadPageLink).then(() => {
            toast.success('Link is copied');
        }).catch((err) => {
            console.error("Failed to copy: ", err);
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-[15px] font-semibold text-center">Your download link is ready !!</h1>
            <div className="w-full flex justify-between items-center">
                <span className="text-[12px] font-[500]">{downloadPageLink.substring(0, 45)}...</span>
                <MdOutlineContentCopy
                    className="text-[16px] font-semibold cursor-pointer"
                    onClick={handleCopyLink}
                />
            </div>
        </div>
    );
}

export default DownloadFile;
