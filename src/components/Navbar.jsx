"use client";
import { RxAvatar } from "react-icons/rx";

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";

export default function Navbar({ user }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-300 shadow sticky top-0 z-50 font-sans text-white">
      <div className="max-w-7xl mx-auto px-4">


        <div className="flex items-center justify-between h-16">


          <Link href="/" className="text-xl font-bold">
            <p className="text-4xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">TasteHouse</p>
          </Link>


          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="hover:text-base-100">Home</Link>
            <Link href="/products" className="hover:text-base-100">Products</Link>
            <Link href="/about" className="hover:text-base-100">About</Link>
            <Link href="/contact" className="hover:text-base-100">Contact</Link>
          </div>


          <div className="hidden lg:flex items-center space-x-4">
            {!user ? (
              <>
                <RxAvatar size={30}/>
                <Link href="/login"><Button className="bg-primary">Login</Button></Link>
                <Link href="/register"><Button className="bg-secondary">Register</Button></Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 hover:text-blue-600"
                >
                  <img
                    src={user.avatar}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded">
                    <div className="p-3 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>

                    <Link href="/products/add" className="block px-4 py-2 hover:bg-gray-100">
                      Add Product
                    </Link>

                    <Link href="/products/manage" className="block px-4 py-2 hover:bg-gray-100">
                      Manage Products
                    </Link>

                    <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>


          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
          >
            ☰
          </button>
        </div>


        {mobileOpen && (
          <div className="lg:hidden pb-3 space-y-2">


            {!user ? (
              <>
                <Link href="/login" className="block">Login</Link>
                <Link href="/register" className="block">Register</Link>
              </>
            ) : (
              <>
                <div className="px-2 py-1 border-b">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <Link href="/products/add" className="block">Add Product</Link>
                <Link href="/products/manage" className="block">Manage Products</Link>
                <button className="block text-left text-red-600">Logout</button>
              </>
            )}


            <Link href="/" className="block">Home</Link>
            <Link href="/products" className="block">Products</Link>
            <Link href="/about" className="block">About</Link>
            <Link href="/contact" className="block">Contact</Link>

          </div>
        )}
      </div>
    </nav>
  );
}
