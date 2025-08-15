const colorClassMap: { [path: string]: string[] } = {
  "/entries": ["max-lg:bg-blue-900", "bg-blue-800", "hover:bg-blue-700", "bg-blue-700"],
  "/media": ["max-lg:bg-indigo-900", "bg-indigo-800", "hover:bg-indigo-700", "bg-indigo-700"],
  "/tasks": ["max-lg:bg-purple-900", "bg-purple-800", "hover:bg-purple-700", "bg-purple-700"],
  "/calender": ["max-lg:bg-fuchsia-900", "bg-fuchsia-800", "hover:bg-fuchsia-700", "bg-fuchsia-700"],
  "/profile": ["max-lg:bg-pink-900", "bg-pink-800", "hover:bg-pink-700", "bg-pink-700"]
};

export function getColor(currentPagePath: string) {
  return colorClassMap[currentPagePath] || "blue";
}
