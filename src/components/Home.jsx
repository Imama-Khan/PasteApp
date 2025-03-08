import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams]= useSearchParams();
    const pasteId= searchParams.get("pasteId");
    const dispatch= useDispatch();
    const allPastes= useSelector((state) => state.paste.pastes)


    useEffect(() => {
        if (pasteId && allPastes.length > 0) {  // Ensure allPastes is loaded
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {  
                setTitle(paste.title);
                setValue(paste.content); 
            } else {
                console.error("Paste not found in allPastes");
            }
        }
    }, [pasteId, allPastes]); // Also watch for allPastes changes
    


    function createPaste(){
        const paste= {
            title: title,
            content: value,
            _id: pasteId ||
                Date.now().toString(36),
            createdAt:new Date().toISOString(),
        }

    

        if(pasteId){
            dispatch(updateToPastes(paste));

        }
        else{   
            dispatch(addToPastes(paste));
        }
        setTitle('');
        setValue('');
        setSearchParams({});
    }
  
    return (
    <div>
        <div className="flex flex-row gap-7 place-content-between" >
      <input
      className = "p-2 rounded-2xl mt-2 w-[66%] pl-4" 
      type="text"
      placeholder="enter title here"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />

      <button 
        onClick={createPaste}
        className = "p-2 rounded-2xl mt-2 ">
        {
            pasteId ? "Update My Paste"
            : "Create My Paste"
        }
      </button>

        </div>

        <div className='mt-8'>
            <textarea
                className="rounded-2xl mt-4, min-w-[500px] p-4"
                value={value}
                placeholder=" enter content here"
                onChange={(e) => setValue(e.target.value)}
                rows={20}
            />
        </div>
    </div>

  )
}

export default Home
