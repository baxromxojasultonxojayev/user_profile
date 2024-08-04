import { setupWorker } from "msw";
import { handlers } from "./handlers";

// Setup the Service Worker
export const worker = setupWorker(...handlers);
