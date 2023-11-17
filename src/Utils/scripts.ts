import { commandMap } from "./consoleCommandMap";
import type { Tabs } from "webextension-polyfill";
import browser from "webextension-polyfill";

// only run from service worker
export const executeBackground = async (currentTab: Tabs.Tab, command: string, args: any[] = null): Promise<any> => {
    return await browser.scripting.executeScript({
        target: { tabId: currentTab.id },
        // @ts-ignore
        world: browser.scripting.ExecutionWorld.MAIN,
        args: args,
        func: commandMap.get(command),
    });
}
