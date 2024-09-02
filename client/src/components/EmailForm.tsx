import axios from 'axios';
import React, { FunctionComponent, useState } from 'react'

const EmailForm: FunctionComponent<{ id: string }> = ({ id }) => {

    const [emailFrom, setEmailFrom] = useState('');
    const [emailTo, setEmailTo] = useState('');

    const handleEmail = async (e: any) => {
        e.preventDefault();
        try {
            const { data } = await axios({
                method: "POST",
                url: "api/files/email",
                data: {
                    id, emailFrom, emailTo
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col gap-2 items-center'>
            <h3 className='text-[14px] font-[500] text-secondary'>You can also send the file through mail.</h3>
            <form className="flex flex-col gap-2 w-full" onSubmit={handleEmail}>
                <input
                    type="email"
                    className='w-full text-[14px] p-2 placeholder:text-[14px] border-[1px] border-[#ccc] rounded-[3px] placeholder:font-[500] placeholder:opacity-75 focus:outline-none'
                    placeholder='Enter Sender Mail'
                    required
                    value={emailFrom}
                    onChange={(e) => setEmailFrom(e.target.value)}
                />

                <input
                    type="email"
                    className='w-full text-[14px] p-2 placeholder:text-[14px] border-[1px] border-[#ccc] rounded-[3px] placeholder:font-[500] placeholder:opacity-75 focus:outline-none'
                    placeholder='Enter Receiver Mail'
                    required
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                />
                <button
                    className="w-full bg-primary text-white p-2 rounded-[3px] font-semibold text-[14px] focus:outline-none"
                >
                    Send Email
                </button>
            </form>
        </div>
    )
}

export default EmailForm