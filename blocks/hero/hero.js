export default function decorate(block) {
  block.classList.add('hero');

  // Extract layout variation from the class string: hero(image-left)
  const styleMatch = block.className.match(/hero\(([^)]+)\)/i);
  const styleClass = styleMatch?.[1]?.toLowerCase()?.trim();

  if (styleClass) {
    block.classList.add(`hero--${styleClass}`);
  }

  // Find the image and title from block's children
  const rows = [...block.children];
  let imageEl, titleText;

  rows.forEach((row) => {
    if (!imageEl) imageEl = row.querySelector('img');
    if (!titleText) {
      const maybeText = row.textContent?.trim();
      if (maybeText) titleText = maybeText;
    }
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'hero-wrapper';

  if (imageEl) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'hero-image';
    imageContainer.appendChild(imageEl);
    wrapper.appendChild(imageContainer);
  }

  if (titleText) {
    const textContainer = document.createElement('div');
    textContainer.className = 'hero-text';
    const heading = document.createElement('h1');
    heading.textContent = titleText;
    textContainer.appendChild(heading);
    wrapper.appendChild(textContainer);
  }

  block.innerHTML = '';
  block.appendChild(wrapper);
}
