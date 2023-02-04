import { z } from "zod";

export const roomIdSchema = z.object({
  roomId: z
    .string()
    .min(4, { message: "Code should have at least 2 character" }),
});

export type TRoomIDForm = z.infer<typeof roomIdSchema>;

export const roomIdFormInitial = {
  roomId: "",
};
