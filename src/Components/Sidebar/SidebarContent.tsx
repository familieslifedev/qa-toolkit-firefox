import SidebarMenuItem from "~Components/Sidebar/SidebarMenuItem";
import Bolt from "~Components/Bolt/Bolt";
import ToolSets from "~Components/JsonTools/ToolSets";
import ColourPicker from "~Components/ColourPicker/ColourPicker";
import Calc from "~Components/Calc/Calc";
import DebugCommands from "~Components/DebugCommands/DebugCommands";
import { Request as BackgroundRequest, RequestType } from "../../Services/Background/Request";
import MiscTools from "~Components/MiscTools/MiscTools";

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
    <SidebarMenuItem displayName={"Auto Tools"} component={<MiscTools/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Tool Sets"} component={<ToolSets/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Debug Commands"} component={<DebugCommands/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Colour Picker"} component={<ColourPicker/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Calculator"} component={<Calc/>} ></SidebarMenuItem>
  </div>
)
}

export default SidebarContent
