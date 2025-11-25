"use client";

import { useUser } from "@clerk/nextjs";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
    const { user, isLoaded } = useUser();
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/foods?id=${id}`);
                const data = await response.json();
                setItem(data);
            } catch (err) {
                console.error("Error fetching item:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (isLoaded && !user) redirect("/sign-in");

    if (loading) return <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>


    if (!item) return <div className="p-10 text-center text-xl">Item not found.</div>;

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-300 pb-20">


            <div className="relative w-full h-64 sm:h-80 md:h-[450px] shadow-xl mb-10">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/50"></div>

                <button
                    onClick={() => history.back()}
                    className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md px-3 py-2 rounded-md text-sm sm:text-base transition"
                >
                    ← Back
                </button>

                <h1 className="absolute bottom-4 left-4 text-2xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-xl">
                    {item.title}
                </h1>
            </div>


            <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-3xl p-8 sm:p-12 border border-white/40 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)]">


                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                        Product Information
                    </h2>
                    <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

                    {/* PRICE */}
                    <div className="p-5 rounded-2xl bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <p className="text-gray-500 text-sm">Price</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">
                            {item.price}$
                        </p>
                    </div>


                    <div className="p-5 rounded-2xl bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <p className="text-gray-500 text-sm">Priority</p>
                        <p className="text-xl font-semibold text-gray-800 mt-1">
                            {item.priority}
                        </p>
                    </div>


                    <div className="p-5 rounded-2xl bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <p className="text-gray-500 text-sm">Added On</p>
                        <p className="text-xl font-semibold text-gray-800 mt-1">
                            {new Date(item.date).toLocaleDateString()}
                        </p>
                    </div>

                </div>


                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed sm:text-lg">
                        {item.fullDescription}
                    </p>
                </div>


                <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => history.back()} className="px-6 py-3 bg-secondary hover:bg-gray-600 text-white rounded-lg w-full sm:w-auto  font-medium shadow-sm transition-all hover:-translate-y-1">
                        Back
                    </button>

                    <button
                        onClick={() => toast.success(`Ordering: ${item.title}`)}
                        className="px-8 py-3 bg-primary text-white rounded-lg w-full sm:w-auto font-semibold shadow-md hover:shadow-lg hover:bg-orange-600 transition-all hover:-translate-y-1">
                        Order Now
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Page;
