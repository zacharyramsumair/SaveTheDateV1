import NotFound from "@/app/not-found";
import CountdownToDateAndTime from "@/components/CountdownToDateAndTime";
import EditButton from "@/components/EditButton";
import Icons from "@/components/Icons";
import ShareUrlButton from "@/components/ShareUrlButton";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata: Metadata = {
	title: "Save The Date | Event",
	description: "Plan your next event and let your people know!",
};

const page = async ({ params }: any) => {
	// let data = await getSpecificEventHelper(params.username as string)
	// console.log(data)

	if (!params.username.startsWith("@") && !params.username.startsWith("%40")) {
		const encodedUsername = encodeURIComponent(params.username);
		redirect(`/event/@${encodedUsername}`);
	}

	const currentUser = await getServerSession(authOptions);

	// what username to search

	const actualUsername = params.username.split(/@|%40/)[1];

	const creator = await db.user.findFirst({
		where: { username: actualUsername },
		select: {
			id: true,
			username: true,
			eventTitle: true,
			eventDate: true,
			eventInfo1: true,
		},
	});

	if (!creator || !creator.eventTitle || creator.eventTitle == "") {
		return (
			<>
				<div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-lg">
						<div className="flex flex-col items-center gap-6 text-center">
							<LargeHeading size="sm">404 - Page Not Found</LargeHeading>
							<Paragraph>Double Check your URL</Paragraph>

							<Link
								className={buttonVariants({
									variant: "ghost",
									className: "w-fit",
								})}
								href="/"
							>
								<Icons.ChevronLeft className="mr-2 h-4 w-4" />
								Back to home page
							</Link>
						</div>
					</div>
				</div>
			</>
		);
	}

	// console.log(creator?.eventDate)
	const date = new Date(creator?.eventDate || "");

	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const dayOfWeek = daysOfWeek[date.getDay()];
	const dayOfMonth = date.getDate();
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const monthName = monthNames[date.getMonth()];
	const year = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	// Add "th", "st", "nd", "rd" to day of month
	const daySuffix = (day: any) => {
		if (day >= 11 && day <= 13) {
			return "th";
		}
		const lastDigit = day % 10;
		switch (lastDigit) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	};

	const formattedDate = `${dayOfWeek} ${dayOfMonth}${daySuffix(
		dayOfMonth
	)} ${monthName}, ${year} at ${hours % 12}:${
		minutes < 10 ? "0" : ""
	}${minutes} ${hours >= 12 ? "p.m." : "a.m."}`;

	// if eventDate passed
	const eventDate = new Date(creator?.eventDate || "");
	const currentDate = new Date();

	return (
		<>
			<div
				id="relative"
				className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center "
			>
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
					<div className="flex flex-col items-center text-center gap-6">
						<LargeHeading size="lg">{creator?.eventTitle}</LargeHeading>
						<div>
							{eventDate < currentDate ? (
								<LargeHeading size="sm">Event Expired: Hope it was Great!</LargeHeading>
							) : (
								<CountdownToDateAndTime
									eventDate={creator?.eventDate}
								/>
							)}
						</div>
						<LargeHeading size="sm">{formattedDate}</LargeHeading>
						<ShareUrlButton />
						<Paragraph>{creator?.eventInfo1}</Paragraph>
					</div>
				</div>
			</div>
			{creator?.id == currentUser?.user?.id ? (
				<span id="absolute">
					<EditButton />
				</span>
			) : (
				<></>
			)}
		</>
		// <>
		//   <div>{creator?.eventTitle}</div>
		//   <div>
		//     <CountdownToDateAndTime eventDate={creator?.eventDate} />
		//   </div>
		//   <div>{creator?.eventDate?.toLocaleDateString()}</div>
		//   <div>{creator?.eventInfo1}</div>
		// </>
	);
};

export default page;
