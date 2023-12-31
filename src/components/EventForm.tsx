"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ZodType } from "zod/lib";
import LargeHeading from "./ui/LargeHeading";
import { changeEventHelper } from "@/helpers/changeEventHelper";
import { toast } from "./ui/Toast";
import { redirect, useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export type FormData = {
	username: string;
	title: string;
	dateTime: string;
	optionalMessage?: string;
};

const schema: ZodType<FormData> = z.object({
	username: z
		.string()
		.max(50, { message: "Username must be less than 50 characters" })
		.refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
			message: "Title can only contain alphanumeric characters",
		}),
	title: z
		.string()
		.max(300, { message: "Title must be less than 300 characters" }),
	dateTime: z.string().refine((value) => new Date(value) > new Date(), {
		message: "Date and time must be in the future",
	}),
	optionalMessage: z
		.string()
		.max(500, { message: "Message must be less than 500 characters" }),
});

type Props = {
	initialFormValues: FormData;
};

const EventForm: React.FC<Props> = ({ initialFormValues }) => {
	const { push } = useRouter();

	initialFormValues.dateTime = initialFormValues.dateTime.slice(0, 16);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: initialFormValues,
	});

	const submitData = (data: FormData) => {
		// Handle form submission logic here

		const changeEvent = async () => {
			try {
				await changeEventHelper(data);

				toast({
					title: "Event Updated",
					message: "You will be redirected momentarily",
					type: "success",
				});

				// Redirect to the desired route
				push(`/event/@${data.username}`);
			} catch (error) {
				if (error == "Error: Username is already taken") {
					toast({
						title: "Error: Username is already taken",
						message: "Try another Username.",
						type: "error",
					});
				} else {
					toast({
						title: "Error occurred",
						message: "Please try again later.",
						type: "error",
					});
				}
			} finally {
			}
		};
		// console.log(data);
		changeEvent();
	};

	return (
		<section className="loginPage flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-8">
			<LargeHeading className="py-4" size="sm">
				Your Event
			</LargeHeading>

			<form
				onSubmit={handleSubmit(submitData)}
				className="flex flex-col bg-white dark:text-slate-200 dark:bg-slate-700 p-8 md:p-16 rounded-xl "
			>
				<div className="flex-row flex flex-no-wrap items-center p-4 my-2 border border-gray-300 rounded-md">
					<span className="p-1">@</span>
					<input
						className="rounded-md p-1 w-full dark:bg-slate-700"
						type="text"
						placeholder="username"
						{...register("username")}
					/>
				</div>

				{errors.username && (
					<span className="text-sm p-1 text-red-500 text-left">
						{errors.username.message}
					</span>
				)}

				<input
					className="p-4 my-2 border border-gray-300 rounded-md dark:bg-slate-700"
					type="text"
					placeholder="Event Title"
					{...register("title")}
				/>
				{errors.title && (
					<span className="text-sm p-1 text-red-500 text-left  max-w-[300px] ">
						{errors.title.message}
					</span>
				)}

				<input
					className="p-4 my-2 border border-gray-300 rounded-md dark:bg-slate-700"
					type="datetime-local"
					placeholder="Date and Time"
					{...register("dateTime")}
				/>
				{errors.dateTime && (
					<span className="text-sm p-1 text-red-500 text-left">
						{errors.dateTime.message}
					</span>
				)}

				<input
					className="p-4 my-2 border border-gray-300 rounded-md dark:bg-slate-700"
					type="text"
					placeholder="Optional Message"
					{...register("optionalMessage")}
				/>
				{errors.optionalMessage && (
					<span className="text-sm p-1 text-red-500 text-left">
						{errors.optionalMessage.message}
					</span>
				)}

				<button
					className="submit w-full h-14 px-4 border-none bg-purple-600 text-white rounded-md font-bold text-lg cursor-pointer mt-4 mb-8"
					type="submit"
				>
					Submit
				</button>
			</form>
		</section>
	);
};

export default EventForm;
