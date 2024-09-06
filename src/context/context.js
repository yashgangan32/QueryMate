import React, { createContext, useState } from 'react';
import run from '../config/gemini';
// Create a Context
export const Context = createContext();

// Create a provider component
export const ContextProvider = (props) => {
    const [input,setInput]=useState("")
    const [recentPrompt,setRecentPromt]=useState("")
    const [prevPromt,setPrevPromt]=useState([])
    const [showResult,setShowResult]=useState(false)
    const [loading,setLoading]=useState(false)
    const [resultData,setResultData]=useState("")

    const delayPara=(index,nextWord)=>{
        setTimeout(()=>{
            setResultData((prev)=>prev+nextWord);
        },50*index)
    }
    const onsent=async ()=>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPromt(input);
        const response=await run(input);
        let responseArray=response.split("**");
        let newResponse;
        for(let i=0;i<responseArray.length;i++)
        {
            if(i===0 || i%2 !==1)
            {
                newResponse+=responseArray[i];    
            }
            else
            {
                newResponse+="<br><b>"+responseArray[i]+"</b>"; 
            }
        }
        newResponse=newResponse.replace('undefined', '');
        newResponse=newResponse.split("*").join("</b>")
        let newResponsearray=newResponse.split(" ")
        //newResponse=newResponse.replace(/\s*\*\s*/g, '\n');
        for(let i=0;i<newResponsearray.length;i++)
        {
            const nextWord=newResponsearray[i];
            delayPara(i,nextWord+" ");
        }
        setLoading(false);
        setInput("")
    }
    const contextValue={
        prevPromt,
        setPrevPromt,
        onsent,
        setRecentPromt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        setShowResult

    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};
export default ContextProvider;
