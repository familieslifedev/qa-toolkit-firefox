import { commandMap } from "./consoleCommandMap";

// only run from service worker
export const executeBackground = async (currentTab: chrome.tabs.Tab, command: string, args: any[] = null): Promise<any> => {
    const result = await chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        // @ts-ignore
        world: chrome.scripting.ExecutionWorld.MAIN,
        args: args,
        func: commandMap.get(command),
    });

    return result;
}
