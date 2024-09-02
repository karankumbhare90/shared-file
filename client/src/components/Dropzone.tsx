import { Dispatch, FunctionComponent, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { MdOutlineFileUpload } from "react-icons/md";

const Dropzone: FunctionComponent<{ setFile: Dispatch<any> }> = ({ setFile }) => {

    const onDrop = useCallback((acceptedFiles: any) => {
        console.log(acceptedFiles);
        setFile(acceptedFiles[0]);
    }, [setFile])


    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'audio/mpeg': ['.mp3']
        }
    });

    return (
        <div className='w-full'>
            <div className='w-full h-72 rounded-[3px] cursor-pointer focus:outline-none' {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={
                    'h-[100%] flex flex-col gap-2 items-center justify-center border-[1px] border-secondary rounded-[3px] '
                    + (isDragReject === true ? "border-red-500" : "")
                    + (isDragAccept === true ? "border-green-500" : "")
                }>
                    <MdOutlineFileUpload className='text-5xl text-secondary mb-2' />
                    {isDragReject
                        ? <p className='p-2 text-[12px] font-semibold'>Sorry, Currently only support the images and audio..</p>
                        : <>
                            <p className='text-xl font-semibold'>Drap & Drop File Here</p>
                            <p className='text-[14px] text-secondary font-medium'>Only .jpeg, .png & .mp3 files are supported.</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dropzone