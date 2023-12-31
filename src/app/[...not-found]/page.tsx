import Icons from "@/components/Icons";
import { buttonVariants } from "@/components/ui/Button";
import LargeHeading from "@/components/ui/LargeHeading";
import type { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";

export const metadata: Metadata = {
	title: "Save The Date | Page Not Found (404)",
	description: "Plan your next event and let your people know!",
};

const NotFound: FC = () => {
	return (
		<>
			<div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-lg">


					<div className="flex flex-col items-center gap-6 text-center">
                    <LargeHeading size="sm">404 - Page Not Found</LargeHeading>

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
};

export default NotFound;
