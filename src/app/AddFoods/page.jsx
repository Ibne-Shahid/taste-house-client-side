"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { toast } from "react-toastify";

const Page = () => {

    const {user} = useUser();
    console.log();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const shortDescription = form.shortDescription.value;
        const fullDescription = form.fullDescription.value;
        const price = form.price.value;
        const priority = form.priority.value;
        const relevantField = form.relevantField.value;
        const imageUrl = form.imageUrl.value;
        const sellerEmail = form.sellerEmail.value;
        const sellerUsername = form.sellerUsername.value;
        const category = form.category.value;

        const newFood = {
            title,
            shortDescription,
            fullDescription,
            price: parseFloat(price),
            priority,
            relevantField,
            imageUrl,
            sellerEmail,
            sellerUsername,
            category,
        };

        try {
            const response = await fetch("/api/foods", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFood),
            });

            const data = await response.json()
            toast.success(data.message);

            form.reset()
        } catch (error) {
            toast.error("Error adding food: " + error.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto flex flex-col gap-4 p-6 bg-white shadow rounded"
        >
            <h2 className="text-xl font-semibold">Add Your Home made Food</h2>

            <input name="title" placeholder="Title" className="border p-2 rounded" required />
            <input name="shortDescription" placeholder="Short Description" className="border p-2 rounded" required />
            <textarea name="fullDescription" placeholder="Full Description" className="border p-2 rounded" required />
            <input name="price" type="number" placeholder="Price" className="border p-2 rounded" required />
            <input name="priority" placeholder="Priority" className="border p-2 rounded" />
            <input name="relevantField" placeholder="Relevant Field" className="border p-2 rounded" />
            <input name="imageUrl" placeholder="Image URL" className="border p-2 rounded" required />
            <input name="sellerEmail" type="email" placeholder="Seller Email" className="border p-2 rounded" value={user?.emailAddresses?.[0]?.emailAddress || ""} readOnly />
            <input name="sellerUsername" placeholder="Seller Username" className="border p-2 rounded" value={user?.fullName || ""} readOnly />

            <select name="category" className="border p-2 rounded" required>
                <option value="">Select Category</option>
                <option value="fast-food">Fast Food</option>
                <option value="dessert-beverages">Dessert / Beverages</option>
                <option value="asian-middle_eastern">Asian / Middle Eastern</option>
                <option value="italian-western">Italian / Western</option>
                <option value="healthy-vegetarian">Healthy / Vegetarian</option>
            </select>

            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Submit
            </button>
        </form>
    );
};

export default Page;
