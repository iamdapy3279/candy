# X&Y homepage line-art pack

These are editable SVG references for the line-art direction shown in the approved homepage concept.

## Files
- `01-coffee-cup.svg` — cup, rim, handle, coffee line and three steam strokes
- `02-croissant.svg` — croissant silhouette and six fold strokes
- `03-fork.svg`
- `04-whisk.svg`
- `05-flowing-line.svg` — reusable connector flourish
- `06-location-pin.svg`

## Important use instructions
These are supplied as fixed visual assets so the implementation agent does not invent replacement illustrations. Use these exact SVGs as the starting assets. Do not replace them with emoji, icon-library glyphs, generated illustrations, or generic clip art.

The homepage concept image is a layout/art-direction reference. The SVGs are the actual reusable line-art assets. The agent may reposition, scale proportionally, clip, and animate them, but should not redraw their forms.

All SVGs use `#35251D` stroke, no fill, rounded caps/joins. Use `getTotalLength()` at runtime for stroke-dash animation. Keep line weight visually delicate at final rendered size.

## Responsive composition
Do not scale one desktop composition to mobile. Compose separate desktop and mobile placements:
- Desktop: long flowing connector can cross broad whitespace; cup can sit near the hero-to-philosophy transition; croissant can sit near the philosophy-to-locations transition; small fork/whisk flourishes can sit near lower content.
- Mobile: use fewer assets, smaller scale, and a mostly vertical connector in outer margins or section gaps. Never overlay text, buttons, location details, or important image content.

The assets are illustrations, not a complete page layout. Preserve the existing site's content and styling.
