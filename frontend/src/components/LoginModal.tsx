import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"


export default function LoginModal () {
    const [count,setCount] = useState(5)
    const router = useRouter()
    useEffect(() => {
        if(count > 0) {
     const time = setTimeout(() => {

        setCount(prev => prev - 1)
      },1000)
      return () => clearTimeout(time)
    }else router.push("/login")
    
    },[count])
    
    console.log(count)
   return <div className="absolute inset-0 bg-primary flex justify-center items-center">
    <div className="border border-black bg-white shadow-neutral-200 h-96 w-96">
      <h1 className="text-black">{count}</h1>
    </div>

   </div>
}