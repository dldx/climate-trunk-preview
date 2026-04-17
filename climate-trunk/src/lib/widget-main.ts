import { mount } from "svelte";
import ClimateTrunkWidget from "./components/ClimateTrunkWidget.svelte";

/**
 * Initializes the Climate Trunk Widget.
 * This can be called manually or will auto-run if the script is loaded.
 */
function initWidget() {
  const target = document.getElementById("climate-trunk-app");
  if (!target) {
    console.warn(
      'Climate Trunk Widget: Target element "#climate-trunk-app" not found.',
    );
    return;
  }

  // Get the SVG URL from data attribute
  const svgUrl = target.getAttribute("data-svg-url") || "";

  // Collect ring visuals from data attributes (e.g., data-science="10")
  // and descriptions from data attributes (e.g., data-science-description="...")
  const visuals: Record<string, string> = {};
  const descriptions: Record<string, string> = {};
  const ringIds = [
    "science",
    "impacts",
    "economics",
    "political-economy",
    "governance",
    "solutions",
    "energy",
    "us",
  ];

  ringIds.forEach((id) => {
    const val = target.getAttribute(`data-${id}`);
    if (val) visuals[id] = val;
    const description = target.getAttribute(`data-${id}-description`);
    if (description) descriptions[id] = description;
  });

  // Clear any existing content
  target.innerHTML = "";

  mount(ClimateTrunkWidget, {
    target: target,
    props: {
      trunkUrl: svgUrl,
      visuals: visuals,
      descriptions: descriptions,
    },
  });
}

// Auto-initialize if the DOM is already ready, or wait for it
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWidget);
} else {
  initWidget();
}

// Export for manual triggering if needed
export { initWidget };
