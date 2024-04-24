import { useState,useCallback, useEffect,useRef} from "react"

const App = () => {
  const[length,setLength]=useState(8);
  const[numAllowed,setNumAllowed]=useState(false)
  const[charAllowed,setCharAllowed]=useState(false)
  const[password,setPassword]=useState()
  const passwordGenerator=useCallback(()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="~!@#$%^&*()_+{}[]:;'?/.,`|"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
      

    }
setPassword(pass)
  }
  , [length,numAllowed,charAllowed,setPassword])
  const copyPassword=useCallback(()=>{
    passRef.current?.select();
    
    window.navigator.clipboard.writeText(password)
  },[password])
useEffect(()=>{
  passwordGenerator()
},[length,numAllowed,charAllowed,passwordGenerator]);

const passRef=useRef(null)
  return (
   <>
   <div className="w-full max-w-md my-40 mx-auto rounded-lg px-5 bg-slate-600 text-orange-500 py-4 ">
    <h2 className="text-center text-3xl text-white my-3">Password Generator</h2>
    <div className=" flex shadow-xl overflow-hidden mb-3 rounded-lg">
      <input 
      placeholder="Password"
      value={password}
      className="outline-none py-1 px-3 w-full"
      readOnly
      ref={passRef}
      />
      <button onClick={copyPassword}
      className="outline-none bg-blue-400 text-white px-3 py-0.3 shrink-0 ">
      Copy</button>
    </div>
    <div className='flex text-sm flex-wrap gap-x-5'>
      <div className="flex flex-wrap items-center gap-x-1">
        <input type="range"
        min={6}
        max={50}
        value={length}
        className="cursor-pointer"
        onChange={(e)=>{setLength(e.target.value)}}/>
        <label >Length :{length}</label>
      </div>
      <div className="flex flex-wrap items-center gap-x-1">
        <input type="checkbox"
        defaultChecked={numAllowed}
        id="numberInput"
        onChange={()=>{setNumAllowed((prev=>!prev))}}/>
        <label htmlFor="numberInput" >Number</label>
      </div>
      <div className="flex flex-wrap items-center gap-x-1">
        <input type="checkbox"
        defaultChecked={charAllowed}
        id="charInput"
        onChange={()=>{setCharAllowed((prev=>!prev))}}/>
        <label htmlFor="numberInput" >Characters</label>
      </div>
    </div>
   </div>
   </>
  )
}

export default App
