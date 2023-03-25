

export default function sidebarMenuItem({displayName, component }: {displayName: string, component: JSX.Element }) {

  return(
    <div className="collapse collapse-arrow sidebarMenuItem">
      <input type="checkbox" className="peer" />
      <div className="collapse-title">
        <h2 className="sidebarMenuTitle">{displayName}</h2>
      </div>
      <div className="collapse-content">
        {component}
      </div>
    </div>
  )

}