import axios from "axios"
import { GetServerSidePropsContext, NextPage } from "next"
import { IFile } from "../../../../libs/Types"
import { HiOutlineDownload } from "react-icons/hi";
import RenderFile from "@/components/RenderFile";
import fileDownload from "js-file-download";

const Index: NextPage<{ file: IFile }> = ({ file: { format, name, sizeInBytes, id } }) => {

    const handleFileDownload = async () => {
        const { data } = await axios.get(`http://localhost:8000/api/files/${id}/download`, {
            responseType: "blob"
        })
        fileDownload(data, name);
    }


    return (
        <div className="min-w-80 shadow-custom_first py-4 px-3 flex flex-col gap-2 items-center">
            {!id
                ? <span>Oops! File does not exist !! Check the URL.</span>
                : <>
                    <HiOutlineDownload className="text-4xl opacity-95 mb-2" />
                    <h1 className="text-[15px] font-[500]">Your File is Ready to be Downloaded !!</h1>
                    <RenderFile file={{ format, sizeInBytes, name }} />
                    <button
                        className="mt-2 w-full bg-primary text-white p-2 rounded-[3px] font-semibold text-[14px] focus:outline-none"
                        onClick={handleFileDownload}
                    >
                        Download
                    </button>
                </>}
        </div>
    )
}

export default Index;


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;
    let file;
    try {
        const { data } = await axios.get(`http://localhost:8000/api/files/${id}`);
        file = data;
    } catch (error) {
        console.log(error)
        file = {}
    }

    return {
        props: {
            file
        },
    };
}