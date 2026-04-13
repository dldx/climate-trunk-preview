<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { ringInfo } from "../data/ringInfo";

  let { trunkUrl = "" } = $props();

  // Svelte 5 Runes for state management
  let rawTrunkAsset = $state("");
  let hoveredData = $state<any>(null);
  let showAnimations = false;
  let error = $state("");
  let loading = $state(true);

  // Fetch the SVG on mount
  onMount(async () => {
    if (!trunkUrl) {
      error = "No SVG URL provided.";
      loading = false;
      return;
    }
    try {
      const response = await fetch(trunkUrl);
      if (!response.ok)
        throw new Error(`Failed to load SVG: ${response.statusText}`);
      rawTrunkAsset = await response.text();
    } catch (err: any) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

  // Dynamically prefix SVG hover rules so they only activate when showAnimations is true
  let Trunk = $derived(
    rawTrunkAsset
      .replace(/svg:has\(/g, ".disabled-styles svg:has(")
      .replace(
        /\[id\$="-ring"\]:hover/g,
        ".disabled-styles [id$='-ring']:hover",
      )
      .replace(/\[id\$="-icon"\]/g, ".disabled-styles [id$='-icon']")
      .replace(/\[id\$="-text"\]/g, ".disabled-styles [id$='-text']"),
  );

  /**
   * Event delegation for hover detection
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

<div class="climate-trunk-widget">
  <div class="container">
    {#if loading}
      <p>Loading...</p>
    {:else if error}
      <p>Error: {error}</p>
    {:else}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore a11y_mouse_events_have_key_events -->
      <div
        class="svg-wrapper"
        onmouseover={handleMouseOver}
        onmouseout={handleMouseOut}
      >
        {@html Trunk}
      </div>
    {/if}

    {#if hoveredData}
      <div class="tooltip-container">
        <div class="tooltip" transition:fade={{ duration: 150 }}>
          <h2 style="color: #fff;">{hoveredData.title}</h2>
          <div class="divider"></div>
          <p class="description">{hoveredData.description}</p>
          <div class="visuals">VISUALS: {hoveredData.visuals}</div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .climate-trunk-widget {
    --color-primary: #371d13;
    --color-bg: #fcfaf7;
    --color-text-dim: #c4c4c4;
    --glass-bg: rgba(255, 255, 255, 0.7);

    width: 100%;
    min-height: 600px;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    font-family: "FranzSans", sans-serif;
  }

  .container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .svg-wrapper {
    height: 80vh;
    max-height: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .svg-wrapper :global(svg) {
    height: 100%;
    width: auto;
    display: block;
    filter: drop-shadow(0 10px 30px rgba(62, 29, 20, 0.1));
  }

  .tooltip-container {
    position: absolute;
    top: 0;
    right: 20px;
    bottom: 0;
    width: 320px;
    pointer-events: none;
    z-index: 1000;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (min-width: 1600px) {
    .tooltip-container {
      right: -100px;
    }
  }

  @media (min-width: 1200px) and (max-width: 1599px) {
    .tooltip-container {
      right: -20px;
    }
  }

  .tooltip {
    position: sticky;
    top: 20px;
    width: 320px;
    background-color: rgba(55, 29, 19, 0.85);
    backdrop-filter: blur(8px);
    color: #ffffff;
    padding: 25px;
    border-radius: 4px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    pointer-events: auto;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }

  .description {
    color: var(--color-text-dim);
  }

  .tooltip h2 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 1.1;
    text-align: left;
  }

  .divider {
    width: 30px;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.3);
    margin: 15px 0;
  }

  .tooltip p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 300;
    margin-bottom: 20px;
    text-align: left;
  }

  .visuals {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    opacity: 0.8;
    text-align: left;
  }

  .svg-wrapper :global([id$="-ring"]) {
    transition: filter 0.3s ease;
  }

  @media (max-width: 1024px) {
    .tooltip-container {
      display: none !important;
    }
    .tooltip {
      display: none !important;
    }
    .svg-wrapper {
      height: auto;
      width: 100%;
    }
  }
</style>
