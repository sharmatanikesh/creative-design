interface PixelEffectElement extends HTMLElement {
  style: CSSStyleDeclaration;
}

export const applyPixelEffect = (element: PixelEffectElement | null): void => {
  if (element && element.style) {
    element.style.imageRendering = "pixelated";
    element.style.imageRendering = "crisp-edges";
  }
};
