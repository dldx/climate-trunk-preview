<script lang="ts">
  import { fade } from "svelte/transition";
  import TrunkAsset from "$lib/assets/Landing_page_Feb_2026_v2.svg?raw";
  import { ringInfo } from "$lib/data/ringInfo";

  import { widgetCode } from "$lib/data/widgetCode";

  // Svelte 5 Runes for state management
  let hoveredData = $state<any>(null);
  let showAnimations = false;
  let showEmbed = $state(false);
  let copied = $state(false);

  // Test values to show that overrides work in the preview
  const testVisuals: Record<string, string> = {
    science: "24",
    solutions: "12",
  };

  const embedSnippet = `<div id="climate-trunk-app"
            data-svg-url="https://cdn.prod.website-files.com/698af11ef91de40fb23e1da9/69dd1149710bc47f59416986_Landing_page_Feb_2026_v2.svg"
            data-science="4" data-impacts="0" data-economics="0" data-political-economy="0" data-governance="0"
            data-solutions="0" data-energy="0" data-you="0"
            data-science-description="What we know about the climate system, how we know it and where uncertainties remain."
            data-impacts-description="How climate change is affecting people, ecosystems and the natural world."
            data-economics-description="The incentives, costs, markets and capital flows that shape the pace of the transition."
            data-political-economy-description="How interests, industry and competing priorities shape what gets done – and what gets delayed."
            data-governance-description="The rules, institutions, diplomacy and accountability mechanisms that seek to coordinate action."
            data-solutions-description="The macro and micro of how the net zero transition happens – from emission reductions and carbon removals to deploying clean technologies and adapting to climate impacts."
            data-energy-description="The system at the heart of the transition, from fossil fuels and renewables to industry, electrification and transport."
            data-you-description="How your choices, voice and sphere of influence can accelerate progress.">
        </div>
<script type="text/javascript">
${widgetCode}
<\/script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedSnippet);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  };

  // Dynamically prefix SVG hover rules so they only activate when showAnimations is true
  let Trunk = $derived(
    TrunkAsset.replace(/svg:has\(/g, ".animations-disabled svg:has("),
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
        hoveredData = {
          ...ringInfo[id],
          visuals: testVisuals[id] || ringInfo[id].visuals,
        };
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
    <button class="embed-trigger" onclick={() => (showEmbed = !showEmbed)}>
      {showEmbed ? "Hide Embed" : "Get Embed Code"}
    </button>
  </div>

  {#if showEmbed}
    <div class="embed-modal" transition:fade={{ duration: 200 }}>
      <div class="embed-header">
        <h3>Webflow Embed Code</h3>
        <button class="copy-btn" class:copied onclick={copyToClipboard}>
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      <div class="code-container">
        <pre><code>{embedSnippet}</code></pre>
      </div>
      <p class="embed-hint">
        Copy this snippet into a Webflow Embed element to display the Climate
        Trunk on your site.
      </p>
    </div>
  {/if}

  <div class="container" class:shifted={showEmbed}>
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
    background: radial-gradient(
      circle at center,
      #ffffff 0%,
      var(--color-bg) 100%
    );
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
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .embed-trigger {
    background: none;
    border: none;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    color: var(--color-primary);
    opacity: 0.7;
    transition: opacity 0.2s ease;
    padding: 0;
  }

  .embed-trigger:hover {
    opacity: 1;
  }

  .embed-modal {
    position: absolute;
    top: 90px;
    left: 30px;
    width: 450px;
    background: white;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    z-index: 1500;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .embed-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .embed-header h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-primary);
  }

  .copy-btn {
    background: var(--color-primary);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .copy-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(55, 29, 19, 0.2);
  }

  .copy-btn.copied {
    background: #4caf50;
  }

  .code-container {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    border: 1px solid rgba(0, 0, 0, 0.05);
    margin-bottom: 15px;
    max-height: 300px;
  }

  .code-container pre {
    margin: 0;
    font-family: "JetBrains Mono", "Fira Code", monospace;
    font-size: 0.75rem;
    line-height: 1.5;
    color: #333;
  }

  .embed-hint {
    margin: 0;
    font-size: 0.8rem;
    color: #666;
    line-height: 1.4;
  }

  .container.shifted {
    transform: translateX(100px);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
    text-align: left;
  }

  .tooltip h2 {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 1.1;
    color: #fff;
    text-align: left;
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
    text-align: left;
  }

  .visuals {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: #ffffff;
    opacity: 0.9;
    text-align: left;
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
