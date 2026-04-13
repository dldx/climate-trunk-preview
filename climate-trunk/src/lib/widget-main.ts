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

  // Clear any existing content
  target.innerHTML = "";

  mount(ClimateTrunkWidget, {
    target: target,
    props: {
      trunkUrl: svgUrl,
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
