export default function decorate(block) {
  block.classList.add('hero');

  // Apply layout style from the class string, e.g., hero(centered)
  const styleMatch = block.className.match(/hero\(([^)]+)\)/i);
  const styleClass = styleMatch?.[1]?.toLowerCase();
  if (styleClass) block.classList.add(`hero--${styleClass.trim()}`);

  // Attempt to extract authorable fields based on expected model structure
  const rows = [...block.children];
  let imageEl, titleText;

  // Assume the image and title could be in any row
  rows.forEach(row => {
    if (!imageEl) imageEl = row.querySelector('img');
    if (!titleText) {
      const text = row.textContent?.trim();
      if (text) titleText = text;
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
