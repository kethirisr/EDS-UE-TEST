export default function decorate(block) {
  block.classList.add('hero');

  // Define supported layout variants
  const variants = ['centered', 'image-left', 'image-right'];

  // Find which variant class is already applied to the block
  const activeVariant = variants.find(v => block.classList.contains(v));
  variants.forEach(v => block.classList.remove(`hero--${v}`)); // Clear old variations

  if (activeVariant) {
    block.classList.add(`hero--${activeVariant}`);
  }

  // Prevent full rebuild if already decorated (for UE live updates)
  if (block.querySelector('.hero-wrapper')) return;

  // Extract content: image and title
  const rows = [...block.children];
  let imageEl, titleText;

  rows.forEach(row => {
    if (!imageEl) imageEl = row.querySelector('img');
    if (!titleText) {
      const maybeText = row.textContent?.trim();
      if (maybeText) titleText = maybeText;
    }
  });

  // Create layout
  const wrapper = document.createElement('div');
  wrapper.className = 'hero-wrapper';

  if (imageEl) {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'hero-image';
    imgContainer.appendChild(imageEl);
    wrapper.appendChild(imgContainer);
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
