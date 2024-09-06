import React, { useState,useContext } from 'react'
import { logos } from '../assets/assets'
import { Context } from '../context/context';
function Sidebar() {
    const {
        setShowResult,
    } = useContext(Context);

    const [expand, setExpand] = useState(false);
    const toggleExpand = () => {
        setExpand(!expand);
    }
    return (
        <div className={`h-screen hidden sm:inline-flex flex-col justify-between bg-gray-100 p-5 ${expand ? 'w-72' : 'w-20'} md:${expand ? 'w-72' : 'w-20'} `}>
    <div>
        <img src={logos.Sidebar} className='w-8 cursor-pointer'
            onClick={toggleExpand}
        />
        <div className='flex justify-center gap-2 bg-gray-200 rounded-md p-2 cursor-pointer mt-5'
        onClick={()=>setShowResult(false)}>
            <img src={logos.Plus} className='w-6'></img>
            {
                expand && (
                    <p>New Chat</p>
                )
            }
        </div>
        {
            expand && (
                <div className='mt-5'>
                    <p>Recent</p>
                    <div className='flex justify-start mt-5 gap-2 bg-gray-200 rounded-md p-2 cursor-pointer '>
                        <img src={logos.Message} className='w-6'></img>
                        <p>What is react..</p>
                    </div>
                </div>
            )
        }

    </div>
    <div>
        <div className='flex gap-2 justify-start my-5 cursor-pointer' >
            <img src={logos.Q} className='w-6'></img>
            {
                expand && (
                    <p>Help</p>
                )
            }

        </div>
        <div className='flex gap-2 justify-start my-5 cursor-pointer'>
            <img src={logos.History} className='w-6'></img>
            {
                expand && (
                    <p>Activity</p>
                )
            }
        </div>
        <div className='flex gap-2 justify-start cursor-pointer'>
            <img src={logos.Settings} className='w-6'></img>
            {
                expand && (
                    <p>Settings</p>
                )
            }

        </div>

    </div>
</div>

    )
}

export default Sidebar