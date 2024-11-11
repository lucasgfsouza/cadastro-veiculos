import { createLogger, format, transport, transports } from "winston";

const logger = createLogger({
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV === "production" ? "http" : "debug"),
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json(),
    format.prettyPrint({ colorize: process.env.NODE_ENV !== "production" })
  ),
  defaultMeta: { service: "my-service" },
  transports: [new transports.Console()],
});

if (process.env.CI === "true") {
  logger.transports.forEach((t: transport) => (t.silent = true));
}

export default logger;
