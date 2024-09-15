import React, { useContext, useState, useEffect } from 'react'
import { logos, pic } from '../assets/assets'
import { Context } from '../context/context';
import { SvgLoader } from '../assets/svgs';

function Main() {
    const {
        onsent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    } = useContext(Context);

    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [isInputFocused, setIsInputFocused] = useState(false); // Track input focus state
    const message = 'Hello';

    useEffect(() => {
        if (index < message.length) {
            const timeoutId = setTimeout(() => {
                setText((prev) => prev + message[index]);
                setIndex(index + 1);
            }, 150);

            return () => clearTimeout(timeoutId);
        }
    }, [index, message]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const cardinput = (prompt) => {
        setInput(prompt);
    }

    return (
        <div className='sm:flex-grow'>
            {/* nav */}
            <div className='flex justify-between items-center'>
                <h1 className='ml-6 sm:m-5 text-4xl sm:text-3xl'>QueryMate</h1>
                <img src={logos.User} className='m-3 w-14 hover:scale-110' alt="User logo"></img>
            </div>
            {/* main container */}
            <div className='flex flex-col'>
                {
                    !showResult ?
                        <>
                            <div className='mx-auto mt-10'>
                                <div className='ml-6 sm:ml-0'>
                                    <p className="text-6xl sm:text-5xl bg-gradient-to-r from-purple-800 via-pink-200 to-red-100 bg-clip-text text-transparent">{text}</p>
                                    <p className='text-4xl sm:text-3xl'>How can I help you today?</p>
                                </div>
                                {/* card container */}
                                <div className='flex flex-wrap flex-row mt-10 p sm:mt-20 gap-1 sm:gap-20'>
                                    <div className='w-32 h-44 sm:w-60 sm:h-52 text-start p-5 rounded-2xl shadow-lg hover:scale-105'
                                        onClick={() => cardinput("Quiz me to find out if I'm a soccer superfan")}
                                    >
                                        <img src={pic.Football} className='w-2/4' alt="Football"></img>
                                        <p>Tell me about history of football</p>
                                    </div>
                                    <div className='w-32 h-44 sm:w-60 sm:h-52 text-start p-5 rounded-2xl shadow-lg hover:scale-105'
                                        onClick={() => cardinput("Recommend new types of water sports, including pros & cons")}>
                                        <img src={pic.WaterSport} className='w-2/4' alt="Water Sports"></img>
                                        <p>Recommend new types of water sports</p>
                                    </div>
                                    <div className='w-32 h-44 sm:w-60 sm:h-52 text-start p-5 rounded-2xl shadow-lg hover:scale-105'
                                        onClick={() => cardinput("Explore wonderful places around world")}>
                                        <img src={pic.Tourism} className='w-2/4' alt="Tourism"></img>
                                        <p>wonderful places around world</p>
                                    </div>
                                </div>
                            </div>
                        </>
                        : <div className='p-5 sm:p-0'>
                            <div className='mx-auto bg-gray-50 w-full sm:w-2/3 shadow-lg rounded-2xl max-h-96 overflow-y-scroll '>
                                <div className='p-5'>
                                    <img src={logos.User} alt='/' className='w-8'></img>
                                    <p>{recentPrompt}</p>
                                </div>
                                <div className='mx-auto w-full p-5'>
                                    {
                                        loading ?
                                            <div className='flex gap-2 items-center w-full'>
                                                <SvgLoader />
                                                <span>Generating...</span>
                                            </div>
                                            :
                                            <div>
                                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                }
                <div>
                    <div className='flex justify-between w-11/12 sm:w-3/5 mx-auto gap-5 mt-24'>
                        <input
                            className="w-full p-3 border-2 border-gray-300 rounded-2xl shadow-lg focus:outline-none hover:scale-105"
                            value={input}
                            type='text'
                            onChange={handleInputChange}
                            onFocus={() => setIsInputFocused(true)}  // Set focus state
                            onBlur={() => setIsInputFocused(false)}  // Reset focus state on blur
                            placeholder="Enter your Query"
                        />
                        <img src={logos.Send} onClick={() => onsent()} className='hover:scale-105 w-14 h-14 p-2 border-2 hover:border-4 rounded-full shadow-xl focus:shadow-2xl' alt="Send"></img>
                    </div>
                </div>
                <div>
                    {/* Conditionally hide footer when input is focused on mobile */}
                    <p className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 ${isInputFocused ? 'hidden sm:block' : ''}`}>
                        @2024 Yash Gangan
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main;
