"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { confirmWithToast } from "@/utils/confirmToast";
import { toast } from "react-toastify";

const ManageFoodsPage = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser()


    const email = user?.primaryEmailAddress?.emailAddress

    useEffect(() => {
        async function fetchFoods() {
            try {
                setLoading(true)
                const res = await fetch(`http://localhost:3000/api/foods?email=${email}`);
                const data = await res.json();
                setFoods(data);
            } catch (error) {
                console.error("Error fetching foods:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchFoods();
    }, [email]);


    const handleDelete = async (id) => {
        console.log(typeof id);
        
        const confirmed = await confirmWithToast("Are you sure you want to delete this item?");
        if (!confirmed) return;

        try {
            const res = await fetch(`http://localhost:3000/api/foods/${id}`, { method: "DELETE" });

            if (res.ok) {
                setFoods((prev) => prev.filter((item) => item._id !== id));
                toast.success("Item deleted successfully!");
            } else {
                toast.error("Failed to delete.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };


    if (loading) return <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>

    return (
        <div className="p-6 min-h-screen bg-linear-to-b from-gray-100 to-gray-200">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                Manage Your Foods
            </h1>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {foods.map((food) => (
                    <div
                        key={food._id}
                        className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:-translate-y-1">
                        <div className="relative">
                            <img
                                src={food.imageUrl}
                                alt={food.title}
                                className="h-48 w-full object-cover"
                            />
                            <span className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 text-sm rounded-full shadow-md">
                                {food.price}$
                            </span>
                        </div>

                        <div className="p-5 flex flex-col">
                            <h2 className="text-xl font-bold text-gray-800">{food.title}</h2>
                            <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                                {food.shortDescription}
                            </p>


                            <div className="flex justify-between items-center mt-5 pt-4 border-t">
                                <Link href={`/Foods/${food._id}`} className="px-4 py-2 text-white text-sm bg-success hover:bg-green-800 rounded-lg shadow-md transition-all">
                                    View
                                </Link>

                                <button onClick={() => handleDelete(food._id.toString())} className=" px-4 py-2 text-white text-sm bg-error hover:bg-red-600 rounded-lg shadow-md transition-all">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {foods.length === 0 && (
                <p className="mt-10 text-center text-gray-500">No foods found.</p>
            )}
        </div>
    );

};

export default ManageFoodsPage;
