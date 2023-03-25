
import SidebarMenuItem from "~sidebar/sidebarMainContent/sidebarMenuItem";
import Bolt from "~sidebar/sidebarMainContent/sidebarComponents/bolt/Bolt";
import JsonTools from "~sidebar/sidebarMainContent/sidebarComponents/jsonTools/jsonTools";
import ComplianceTools from "~sidebar/sidebarMainContent/sidebarComponents/Compliance/Compliance";
import ColourPicker from "~sidebar/sidebarMainContent/sidebarComponents/ColourPicker/colourPicker";
import Calc from "~sidebar/sidebarMainContent/sidebarComponents/Calc/calc";
const  sidebarContent  = () => {
  function openOptions() {
    chrome.runtime.sendMessage({"action": "openOptionsPage"});
  }


  return (
  <div className="sidebarMainContentContainer">
    <SidebarMenuItem displayName={"Bolt"} component={<Bolt/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Json Tools"} component={<JsonTools/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Planner Tools"} component={<ComplianceTools/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Colour Picker"} component={<ColourPicker/>} ></SidebarMenuItem>
    <SidebarMenuItem displayName={"Calculator"} component={<Calc/>} ></SidebarMenuItem>
    {/*<SidebarMenuItem displayName={"Conversion Tools"} component={<ConversionTools/>} ></SidebarMenuItem>*/}
    {/*<SidebarMenuItem displayName={"Colour Picker"} component={<SidebarNav/>} ></SidebarMenuItem>*/}
    {/*<SidebarMenuItem displayName={"Console Commands"} component={<SidebarNav/>} ></SidebarMenuItem>*/}
  </div>
)

}

export default sidebarContent