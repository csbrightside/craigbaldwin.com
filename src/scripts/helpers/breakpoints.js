/**
 * Helper: Breakpoints
 * -----------------------------------------------------------------------------
 * Global configuration for consistent values for media queries in scripts.
 * - These values should mirror the breakpoint values defined in `grid.scss`.
 */
export const values = {
  tiny: 320,
  small: 576,
  medium: 768,
  large: 1024,
  wide: 1328,
};

export default {
  tiny: `${values.tiny}px`,
  small: `${values.small}px`,
  medium: `${values.medium}px`,
  large: `${values.large}px`,
  wide: `${values.wide}px`,
};
