import useIParticipantStore from "src/stores/participant.store";
import { z } from "zod";

export const participantSchema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
});

export type TParticipantForm = z.infer<typeof participantSchema>;
