import { Logger } from "tslog";

class ConsoleWrapper {
  constructor(private readonly logger: Logger<any>) {
    this.logger = logger;
  }

  info(message: string, ...args: any[]) {
    console.log("[INFO] " + message, ...args);
  }

  warn(message: string, ...args: any[]) {
    console.log("[WARN] " + message, ...args);
  }

  error(message: string, ...args: any[]) {
    console.log("[ERROR] " + message, ...args);
  }
}

export const logger = new ConsoleWrapper(new Logger({ type: "json", name: "MCBuddy-Bot" }));
logger.info("🔄 Initialization of MCBuddy Bot");