import { Logger } from "tslog";

export const logger = new Logger({ type: "json", name: "MCBuddy-Bot" });
logger.info("🔄 Initialization of MCBuddy Bot");