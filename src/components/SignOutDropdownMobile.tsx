"use client";


import { Icons } from "@/components/Icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Image from "next/image";
import { signOut } from 'next-auth/react'
import { useState } from "react";
import { toast } from "./ui/Toast";





export function SignOutDropdownMobile({profilePic}:any) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const signUserOut = async () => {
        try {
          setIsLoading(true)
          await signOut()
        } catch (error) {
          toast({
            title: 'Error signing out',
            message: 'Please try again later.',
            type: 'error',
          })
        }
      }
	return (
		<DropdownMenu>
			<DropdownMenuTrigger >
				<Image
					priority
					className="rounded-full"
					quality={100}
					width={40} // Set the desired width
					height={40} // Set the desired height
					alt="Profile Picture"
					src={profilePic || "placeholder"}
				/>
				<div className="absolute inset-0 rounded-full" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" forceMount className="cursor-pointer">
				<DropdownMenuItem
					onClick={signUserOut}
					className="cursor-pointer"
				>
					<Icons.LogOut className="mr-2 h-4 w-4" />
					<span>Sign Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
