export default function decorate(block) {
  block.classList.add('hero');

  // Handle both formats: hero(image-left) or image-left
  let variation;

  // Check for hero(image-left) syntax
  const styleMatch = block.className.match(/hero\(([^)]+)\)/i);
  if (styleMatch?.[1]) {
    variation = styleMatch[1].toLowerCase().trim();
  } else {
    // Check for direct variation class (e.g., image-left)
    const classList = Array.from(block.classList);
    variation = classList.find(cls =>
      ['centered', 'image-left', 'image-right'].includes(cls)
    );
  }

  if (variation) {
    block.classList.add(`hero--${variation}`);
  }

  // Extract image and title text
  const rows = [...block.children];
  let imageEl, titleText;

  rows.forEach((row) => {
    if (!imageEl) imageEl = row.querySelector('img');
    if (!titleText) {
      const text = row.textContent?.trim();
      if (text) titleText = text;
    }
  });

  // Build structured layout
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
