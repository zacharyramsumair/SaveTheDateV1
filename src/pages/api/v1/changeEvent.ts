import { withMethods } from "@/lib/api-middlewares/with-methods";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const user = await getServerSession(req, res, authOptions).then(
			(res) => res?.user
		);

		if (!user) {
			return res.status(401).json({ error: "Unauthorized", success: false });
		}

		const currentUser = await db.user.findFirst({
			where: { id: user.id },
		});
        if (!currentUser) {
			return res.status(401).json({ error: "Unauthorized", success: false });
		}

		const { username, title, dateTime, optionalMessage } = req.body.FormInfo;

		if (!username || !title || !dateTime) {
			console.log("Username is required");
			return res
				.status(400)
				.json({ error: "Missing required Info", success: false });
		}

		if (username.length > 49 || !/^[a-zA-Z0-9]+$/.test(username)) {
			console.log("Invalid Username");

			return res
				.status(400)
				.json({ error: "Invalid Username", success: false });
		}

		const userWithThatUsername = await db.user.findFirst({
			where: { username: username },
		});


		//check if null first
		if (userWithThatUsername == null) {
		} else if (userWithThatUsername.id == currentUser.id) {
		} else if (userWithThatUsername != currentUser && userWithThatUsername) {
			return res
				.status(400)
				.json({ error: "Username is already taken", success: false });
		}

		// Update the user's username
		await db.user.update({
			where: { id: currentUser.id },
			data: {
				username: username,
				eventTitle: title,
				eventDate: dateTime as string,
				eventInfo1: optionalMessage

			},
		});

		return res.status(200).json({ error: null, success: true });

		
	} catch (error) {
		console.log(error);
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues, success: false });
		}


		return res
			.status(500)
			.json({ error: "Internal Server Error", success: false });
	}
};

export default withMethods(["PUT"], handler);
