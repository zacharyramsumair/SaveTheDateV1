import { db } from '@/lib/db';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { FormData } from "../../../components/EventForm";
import EventForm from "../../../components/EventForm";
import { Metadata } from 'next';


type Props = {};

export const metadata: Metadata = {
  title: "Save The Date | Your Event",
  description: "Plan your next event and let your people know!",
};

const Event = async (props: Props) => {
	const user = await getServerSession(authOptions);
	if (!user) {
		redirect("/login");
	}

  const currentUser = await db.user.findFirst({
    where: { id: user.user.id},
  })
  const initialFormValues: FormData = {
    username: currentUser?.username  || "",
    title: currentUser?.eventTitle || "",
    dateTime: currentUser?.eventDate ? currentUser.eventDate : "",
    optionalMessage: currentUser?.eventInfo1 || "",
  };




	return (
		<>
			<EventForm initialFormValues={initialFormValues} />
		</>
	);
};

export default Event;
