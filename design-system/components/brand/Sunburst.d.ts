import type * as React from 'react';

/**
 * The six sanctioned permutations of the sunburst.
 *
 * Contrast contract: 'field', 'arc' and 'halo' emit a scrim layer and place
 * `children` above it. Never position type over a Sunburst by absolute
 * positioning from outside — pass it as children so the scrim protects it.
 */
export interface SunburstProps extends React.HTMLAttributes<HTMLElement> {
  /** horizon = full-bleed rising sun, rays clipped to a lower band closed by a keyline, clean air above (the hero treatment; needs a tall section) · bloom = edgeless atmosphere, oversized and radially faded, content sits inside it (use in short sections where a band would read as a decorative strip) · square = master symbol · arc = half-sun panel · rays = hairline divider band · field = background layer for a positioned parent · halo = contained disc beside type */
  variant?: 'horizon' | 'bloom' | 'square' | 'arc' | 'rays' | 'field' | 'halo';
  tone?: 'ivory' | 'titanium';
  /** Width in px (edge, for 'halo'). Ignored by 'field'. */
  size?: number;
  /** Override the artwork. Defaults to the inlined ray illustration, so the
   *  component needs no sibling assets/ directory and survives being copied
   *  out or published on its own. */
  src?: string;
  /** Ambient drift + breathe, 18s. 'field' and 'halo' only. */
  drift?: boolean;
  /** Ray opacity. Keep at or below 0.55 when children are present, 0.36 for 'bloom' (its mask peaks under the content). */
  opacity?: number;
  /** Override the variant's default scrim, or pass null to remove it (only legal when there are no children). */
  scrim?: 'solid' | 'left' | 'bottom' | 'radial' | null;
  /** Content that sits above the scrim on z-index 3. */
  children?: React.ReactNode;
}
export declare function Sunburst(props: SunburstProps): React.JSX.Element;
