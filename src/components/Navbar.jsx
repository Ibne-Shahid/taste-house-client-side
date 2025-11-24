"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    useUser,
    SignInButton,
    SignUpButton,
    SignOutButton,
} from "@clerk/nextjs";
import LgNavbar from "./LgNavbar";
import ResponsiveNavbar from "./ResponsiveNavbar";

export default function Navbar() {
    const { isSignedIn, user } = useUser();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/Products" },
        { name: "AboutUs", href: "/AboutUs" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="backdrop-blur-xl bg-gradient-to-r from-blue-400/80 via-blue-500/70 to-blue-600/80 shadow-lg sticky top-0 z-50 font-sans text-white border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">


                    <Link href="/" className="text-3xl font-extrabold tracking-tight">
                        <p className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                            TasteHouse
                        </p>
                    </Link>

                    {/* Navbar for LG screen */}
                    <LgNavbar navItems={navItems} pathname={pathname} SignInButton={SignInButton} SignUpButton={SignUpButton} SignOutButton={SignOutButton} setDropdownOpen={setDropdownOpen} dropdownOpen={dropdownOpen} user={user} isSignedIn={isSignedIn}></LgNavbar>


                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden text-3xl"
                    >
                        ☰
                    </button>
                </div>

                {/* Responsive navbar for mobile and MD screens */}
                <ResponsiveNavbar navItems={navItems} pathname={pathname} SignInButton={SignInButton} SignUpButton={SignUpButton} SignOutButton={SignOutButton} user={user} isSignedIn={isSignedIn} mobileOpen={mobileOpen}></ResponsiveNavbar>

            </div>
        </nav>
    );
}
