export {}
export const regionArray = [
  {Code: 'com', Name: "UK", Jenkins: 'build-gb'},
  {Code: "us", Name: "US", Jenkins: 'build-us'}
];

export const jenkinsJobsArray = [
  {Job: 'planner3d-gameci-native', Name: "Planner3D Mac", Modfier:' '},
  {Job: "planner3d-gameci-native-windows", Name: "Planner3D Win", Modfier:' '},
  {Job: "planner3d-assets-gameci", Name: "Planner3D Assets", Modfier:' '},
  {Job: "planner3d-light-atlasser-vr2", Name: "Planner3D Light Atlasser", Modfier:' '},
  {Job: "wrender-gameci-test", Name: "Planner3D HQ", Modfier:' '},
  {Job: "selenium-end-to-end-tests", Name: "Selenium Tests", Modfier:'build?delay=0sec'},
  {Job: "planner2d", Name: "Planner2D", Modfier:' '},
  {Job: "frontend", Name: "Frontend", Modfier:' '},
  {Job: "feeder", Name: "Feeder", Modfier:' '},
];

// export const environmentArray = [
//   {Code: " ", Name: "Live", Jenkins: "master"},
//   {Code: "project1. ", Name: "Project 1", Jenkins: "project1"},
//   {Code: "project2. ", Name: "Project 2", Jenkins: "project2"},
//   {Code: "project3. ", Name: "Project 3", Jenkins: "project3"},
//   {Code: "project4. ", Name: "Project 4", Jenkins: "project4"},
//   {Code: "project5. ", Name: "Project 5", Jenkins: "project5"},
//   {Code: "project6. ", Name: "Project 6", Jenkins: "project6"},
//   {Code: "project7. ", Name: "Project 7", Jenkins: "project7"},
//   {Code: "project8. ", Name: "Project 8", Jenkins: "project8"},
// ]
export function environmentArray() {
  //setup arrays first, then they can be used for initial values.
  const environmentArray = Array(9).fill( 9).map((_, i) => {
    return {Code: `project${i}.`, Name: `Project ${i}`, Jenkins: `project${i}`}
  })
  // Append Live into the array at the beginning.
  environmentArray.unshift({Code: '', Name: "Live", Jenkins: "master"})
  return environmentArray;
}