export default function getColorByName(name?: string) {
  if (!name) return "gray";

  const firstLetter = name.charAt(0).toUpperCase();
  const charCode = firstLetter.charCodeAt(0);

  switch (charCode % 7) {
    case 0:
      return "red";
    case 1:
      return "yellow";
    case 2:
      return "green";
    case 3:
      return "blue";
    case 4:
      return "purple";
    case 5:
      return "pink";
    case 6:
      return "orange";
    default:
      return "gray";
  }
}
