import { css } from 'lit';

const baseStyle = css`
  .form-control {
    color: var(--ntx-form-theme-color-secondary);
    background-color: var(
      --ntx-form-theme-color-input-background,
      transparent
    );
    font-size: var(--ntx-form-theme-text-input-size);
    font-family: var(--ntx-form-theme-font-family);
    border: 1px solid var(--ntx-form-theme-color-border);
    border-radius: var(--ntx-form-theme-border-radius);
  }

  .form-control:focus {
    outline: none;
    border-color: var(--ntx-form-theme-color-primary);
  }
`;

export const styles = [baseStyle];