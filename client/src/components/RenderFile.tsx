import { FunctionComponent } from "react"
import { IFile } from "../../libs/Types"
import { FaRegFileLines } from "react-icons/fa6";
import { MdOutlineAudioFile } from "react-icons/md";
import { sizeInMB } from "../../libs/SizeInMB";

const RenderFile: FunctionComponent<{ file: IFile }> = ({ file: { format, sizeInBytes, name } }) => {
    return (
        <div className="w-full flex items-center gap-2 shadow-custom_second p-2">
            {format == 'audio' ? <MdOutlineAudioFile className="text-[20px] text-primary opacity-95" /> : <FaRegFileLines className="text-[20px] text-primary opacity-95" />}
            <div className="flex flex-col">
                <span className="text-[14px] font-semibold">{name}</span>
                <span className="text-[10px] text-secondary">{sizeInMB(sizeInBytes)}</span>
            </div>
        </div>
    )
}

export default RenderFile