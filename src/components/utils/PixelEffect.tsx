interface PixelEffectElement extends HTMLElement {
  style: CSSStyleDeclaration;
}

export const createPixelEffect = (element: PixelEffectElement | null): void => {
  if (element && element.style) {
    element.style.imageRendering = "pixelated";
    element.style.imageRendering = "crisp-edges";
  }
};

export const applyPixelEffect = createPixelEffect;
