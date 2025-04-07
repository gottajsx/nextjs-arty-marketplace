"use client";

import { Menu, Person, Search, ShoppingCart } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleLogout = async () => {
    signOut({ callbackUrl: "/login" });
  };

  const searchWork = async () => {
    router.push(`/search/${query}`);
  };

  const cart = user?.cart;

  return (
    <div className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-md z-50 sticky top-0">
      <Link href="/">
        <img src="/assets/logo.png" alt="logo" className="w-32 h-auto" />
      </Link>

      <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-1/3">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm"
        />
        <IconButton disabled={query === ""} onClick={searchWork}>
          <Search sx={{ color: "red" }} />
        </IconButton>
      </div>

      <div className="relative flex items-center gap-4">
        {user && (
          <Link
            href="/cart"
            className="flex items-center text-sm gap-1 hover:text-blue-600 transition"
          >
            <ShoppingCart sx={{ color: "gray" }} />
            Cart <span>({cart?.length})</span>
          </Link>
        )}

        <button
          className="flex items-center gap-2"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: "gray" }} />
          {!user ? (
            <Person sx={{ color: "gray" }} />
          ) : (
            <img
              src={user.profileImagePath}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 w-40 z-50 text-sm">
            <Link href="/login" className="hover:text-blue-500">
              Log In
            </Link>
            <Link href="/register" className="hover:text-blue-500">
              Sign Up
            </Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 w-48 z-50 text-sm">
            <Link href="/wishlist" className="hover:text-blue-500">
              Wishlist
            </Link>
            <Link href="/cart" className="hover:text-blue-500">
              Cart
            </Link>
            <Link href="/order" className="hover:text-blue-500">
              Orders
            </Link>
            <Link
              href={`/shop?id=${user._id}`}
              className="hover:text-blue-500"
            >
              Your Shop
            </Link>
            <Link href="/create-work" className="hover:text-blue-500">
              Sell Your Work
            </Link>
            <button
              onClick={handleLogout}
              className="text-left hover:text-red-500"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;