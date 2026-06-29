import chalk from "chalk";
import {select, isCancel} from "@clack/prompts";
import { runAgentMode } from "./agent/orchestrator.js";
import "dotenv/config";
import { runAskMode } from "./ask/orchestrator.js";
import { runPlanMode } from "./plan/orchestrator.js";

export async function runCliMode() {
    while(true) {
        const mode = await select({
            message: "Choose CLI sub-mode",
            options: [
                {value: "agent", label: "Agent Mode" },
                {value: "plan", label: "Plan Mode"},
                {value: "ask", label: "Ask Mode"},
                {value: "back", label: "Back to main menu"},
            ]
        });

        if (isCancel(mode) || mode == "back") {
            return;
        }
        if (mode === "agent") {
            await runAgentMode();
        } else if (mode === "plan") {
            await runPlanMode();
        } else if (mode === "ask") {
            await runAskMode();
        } else {
            console.log(chalk.yellow("\n This mode is not implemented yet.\n"));
        }
    }
}