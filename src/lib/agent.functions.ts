import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runDifyAgent } from "./dify.server";

export const askAgent = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ query: z.string().trim().min(1).max(500) }).parse(d))
  .handler(async ({ data }) => runDifyAgent(data.query));
