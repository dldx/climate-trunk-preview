<script lang="ts">
  import { fade } from "svelte/transition";
  import TrunkAsset from "$lib/assets/Landing_page_Feb_2026_v2.svg?raw";
  import { ringInfo } from "$lib/data/ringInfo";

  // Svelte 5 Runes for state management
  let hoveredData = $state<any>(null);
  let showAnimations = $state(true);

  // Dynamically prefix SVG hover rules so they only activate when showAnimations is true
  let Trunk = $derived(
    showAnimations
      ? TrunkAsset
      : TrunkAsset.replace(/svg:has\(/g, ".animations-disabled svg:has("),
  );

  /**
   * Event delegation to handle hover detection on SVG elements
   * specifically rings, icons, and text labels.
   */
  const handleMouseOver = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;
    const hoveredElement = target.closest(
      '[id$="-ring"], [id$="-icon"], [id$="-text"]',
    );

    if (hoveredElement) {
      const id = hoveredElement.id
        .replace("-ring", "")
        .replace("-icon", "")
        .replace("-text", "");

      if (ringInfo[id]) {
        hoveredData = ringInfo[id];
      }
    }
  };

  const handleMouseOut = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;
    const hoveredElement = target.closest(
      '[id$="-ring"], [id$="-icon"], [id$="-text"]',
    );

    if (hoveredElement) {
      hoveredData = null;
    }
  };
</script>

<svelte:head>
  <title>Climate Trunk | Journey Through the Rings</title>
</svelte:head>

<main>
  <!-- Settings Panel -->
  <div class="settings-panel">
    <div class="setting-item">
      <span>Animations</span>
      <label class="switch">
        <input type="checkbox" bind:checked={showAnimations} />
        <span class="slider"></span>
      </label>
    </div>
  </div>

  <div class="container">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_mouse_events_have_key_events -->
    <div
      class="svg-wrapper"
      onmouseover={handleMouseOver}
      onmouseout={handleMouseOut}
    >
      {@html Trunk}
    </div>

    {#if hoveredData}
      <div class="tooltip" transition:fade={{ duration: 150 }}>
        <h2>{hoveredData.title}</h2>
        <div class="divider"></div>
        <p class="description">{hoveredData.description}</p>
        <div class="visuals">VISUALS: {hoveredData.visuals}</div>
      </div>
    {/if}
  </div>
</main>

<style>
  :root {
    --color-primary: #371d13;
    --color-bg: #fcfaf7;
    --color-text-dim: #c4c4c4;
    --glass-bg: rgba(255, 255, 255, 0.7);
  }

  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: var(--color-bg);
    color: var(--color-primary);
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif;
  }

  main {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: radial-gradient(circle at center, #ffffff 0%, var(--color-bg) 100%);
    position: relative;
  }

  /* Settings Panel */
  .settings-panel {
    position: absolute;
    top: 30px;
    left: 30px;
    z-index: 2000;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    padding: 12px 20px;
    border-radius: 30px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }

  .setting-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--color-primary);
  }

  /* Switch Toggle */
  .switch {
    position: relative;
    display: inline-block;
    width: 34px;
    height: 20px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ddd;
    transition: 0.4s;
    border-radius: 20px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: var(--color-primary);
  }

  input:checked + .slider:before {
    transform: translateX(14px);
  }

  .container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
  }

  .svg-wrapper {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
  }

  .svg-wrapper :global(svg) {
    height: 100%;
    width: auto;
    display: block;
    filter: drop-shadow(0 10px 30px rgba(62, 29, 20, 0.1));
  }

  .tooltip {
    position: absolute;
    top: 40px;
    right: 40px;
    width: 400px;
    background-color: var(--color-primary);
    backdrop-filter: blur(12px);
    color: #ffffff;
    padding: 35px;
    border-radius: 4px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    pointer-events: none;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }

  .description {
    color: var(--color-text-dim);
  }

  .tooltip h2 {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 1.1;
    color: #fff;
  }

  .divider {
    width: 30px;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.3);
    margin: 18px 0;
  }

  .tooltip p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 300;
    margin-bottom: 25px;
  }

  .visuals {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: #ffffff;
    opacity: 0.9;
  }

  .svg-wrapper :global([id$="-ring"]) {
    transition: filter 0.3s ease;
  }

  @media (max-width: 1024px) {
    .tooltip {
      display: none !important;
    }

    .svg-wrapper {
      height: auto;
      width: 95vw;
      max-width: 500px;
    }

    .svg-wrapper :global(svg) {
      width: 100%;
      height: auto;
    }
  }
</style>
