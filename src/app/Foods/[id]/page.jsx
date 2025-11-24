"use client"

import { useUser } from "@clerk/nextjs"
import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const page = () => {
    const {user, isLoaded} = useUser()
    const {id} = useParams()
    const [item, setItem] = useState(null)
console.log(item);

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await fetch(`http://localhost:3000/api/foods?id=${id}`)
            const data = await response.json()
            setItem(data)
        }
        fetchData()
    },[id])

    if (isLoaded && !user) {
    redirect("/sign-in");
  }

  return (
    <div>This is details</div>
  )
}

export default page