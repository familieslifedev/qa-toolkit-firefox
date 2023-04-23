
import SidebarMenuItem from "~sidebar/sidebarMainContent/sidebarMenuItem";
import Bolt from "~sidebar/sidebarMainContent/sidebarComponents/bolt/Bolt";
import JsonTools from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/jsonTools";
import ColourPicker from "~sidebar/sidebarMainContent/sidebarComponents/ColourPicker/colourPicker";
import Calc from "~sidebar/sidebarMainContent/sidebarComponents/Calc/calc";
import DebugCommands from "~sidebar/sidebarMainContent/sidebarComponents/DebugCommands/DebugCommands";
const  sidebarContent  = () => {
  function openOptions() {
    chrome.runtime.sendMessage({"action": "openOptionsPage"});
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

export default sidebarContent