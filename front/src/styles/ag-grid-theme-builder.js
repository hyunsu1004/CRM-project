import { themeQuartz, iconSetMaterial } from "@ag-grid-community/theming";

// to use myTheme in an application, pass it to the theme grid option
const myTheme = themeQuartz.withPart(iconSetMaterial).withParams({
  accentColor: "#305673",
  browserColorScheme: "light",
  columnBorder: false,
  fontFamily: "inherit",
  foregroundColor: "#000000",
  headerFontSize: 14,
  headerFontWeight: 700,
  rowBorder: true,
  sidePanelBorder: false,
  wrapperBorder: false,
});

export default myTheme;
