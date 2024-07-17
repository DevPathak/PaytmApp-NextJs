"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
	provider: string,
	amount: number
) {
	// Ideally the token should come from the banking provider (hdfc/axis)
	// const token = await axios.get("https://api.hdfcbank.com/getToken", {
	//     amount: amount,
	//     user: userId
	// });
	const session = await getServerSession(authOptions);
	if (!session?.user || !session.user?.id) {
		return {
			message: "Unauthenticated request",
		};
	}
	const token = Math.random().toString();
	console.log("heeheh");
	await prisma.onRampTransaction.create({
		data: {
			provider,
			status: "Processing",
			startTime: new Date(),
			token: token,
			userId: Number(session?.user?.id),
			amount: amount * 100,
		},
	});

	return {
		message: "Done",
	};
}
