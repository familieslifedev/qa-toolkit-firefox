import SidebarMenuItem from "~sidebar/sidebarMainContent/sidebarMenuItem";
import Bolt from "~sidebar/sidebarMainContent/sidebarComponents/bolt/Bolt";
import JsonTools from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/jsonTools";
import ColourPicker from "~sidebar/sidebarMainContent/sidebarComponents/ColourPicker/colourPicker";
import Calc from "~sidebar/sidebarMainContent/sidebarComponents/Calc/calc";
import DebugCommands from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugCommands";
import { Request as BackgroundRequest, RequestType } from "../BackgroundService/Request";

const SidebarContent = (): JSX.Element => {

  function openOptions(): void {

    const request: BackgroundRequest = {
      type: RequestType.OpenOptionsPage,
      functionName: null,
      arguments: null
    };

    chrome.runtime.sendMessage(request);
  }

  return (
  <div className="sidebarMainContentContainer">
    <SidebarMenuItem displayName={"Bolt"} component={<Bolt/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Json Tools"} component={<JsonTools/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Debug Commands"} component={<DebugCommands/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Colour Picker"} component={<ColourPicker/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Calculator"} component={<Calc/>} ></SidebarMenuItem>
  </div>
)
}

export default SidebarContent