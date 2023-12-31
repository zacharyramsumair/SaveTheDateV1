"use client";
import React from "react";
import { Icons } from "./Icons";
import Link from "next/link";

type Props = {};

const EditButton: React.FC<Props> = () => {
	return (
		<Link
			className={`flex items-center justify-center p-3  rounded-full bg-gray-200 text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-125 focus:outline-none fixed  bottom-4 right-4 lg:bottom-10 lg:right-10`}
            href='/event'
		>
			<Icons.FileEdit className={`text-gray-800`} />
		</Link>
	);
};

export default EditButton;
