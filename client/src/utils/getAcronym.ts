export default function getAcronym(phrase?: string) {
  if (!phrase) return "";

  return phrase
    .split(" ")
    .map((word, _, arr) => (arr.length > 1 ? word.charAt(0) : word.slice(0, 2)))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
