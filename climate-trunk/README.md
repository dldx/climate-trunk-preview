# Climate Trunk Widget

An embeddable Svelte widget for displaying the Climate Trunk visualization. Built with SvelteKit and Vite, it supports two build modes: a full SvelteKit app and a standalone IIFE widget bundle for embedding in any webpage.

## Setup

Install dependencies:

```sh
bun install
```

## Development

Start the SvelteKit dev server:

```sh
bun run dev

# or open in browser automatically
bun run dev -- --open
```

## Building

### Widget (embeddable IIFE bundle)

Builds to `dist-widget/climate-trunk-widget.iife.js`:

```sh
APP_MODE=widget bun x vite build
```

### SvelteKit app

```sh
bun run build
```

Preview the production build:

```sh
bun run preview
```

## Embedding the Widget

Include the built script and add a target `div` with the required `data-*` attributes:

```html
<div id="climate-trunk-app"
    data-svg-url="https://..."
    data-science="4"
    data-impacts="0"
    data-economics="0"
    data-political-economy="0"
    data-governance="0"
    data-solutions="0"
    data-energy="0"
    data-us="0"
    data-science-description="..."
    data-impacts-description="..."
    data-economics-description="..."
    data-political-economy-description="..."
    data-governance-description="..."
    data-solutions-description="..."
    data-energy-description="..."
    data-us-description="...">
</div>

<script src="dist-widget/climate-trunk-widget.iife.js"></script>
```

See [test-widget.html](test-widget.html) for a full working example.
