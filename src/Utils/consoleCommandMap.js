const consoleCommands = {
  //<editor-fold desc="Json Commands">
  get2DJson: (...args) => __debugApi__.get2DJson(),
  get3DJson: (...args) => __debugApi__.get3DJson(),
  set2DJson: (...args) => __debugApi__.set2DJson(...args),
  set2DJsonByURL: (...args) => __debugApi__.set2DJsonByUrl(...args),
  //</editor-fold>
  //<editor-fold desc="CPP">
  showCornice: (...args) => __debugApi__.drawCorniceRuns(...args),
  showPelmet: (...args) => __debugApi__.drawPelmetRuns(...args),
  showPlinth: (...args) => __debugApi__.drawPlinthRuns(...args)
  //</editor-fold>
}

export const commandMap = new Map(Object.entries(consoleCommands))
