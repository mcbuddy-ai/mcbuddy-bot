import { fail } from "../shared/error";

export const token = process.env.TELEGRAM_BOT_TOKEN || fail("TELEGRAM_BOT_TOKEN is not set")();
