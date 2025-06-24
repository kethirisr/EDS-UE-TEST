export default function decorate(block) {
    block.classList.add('hero');
  
    const variation = block.className.match(/hero\(([^)]+)\)/i)?.[1]?.toLowerCase();
    if (variation) block.classList.add(`hero--${variation.trim()}`);
  
    const rows = [...block.children];
    const [imageRow, titleRow] = rows;
  
    const image = imageRow?.querySelector('img');
    const title = titleRow?.textContent;
  
    const wrapper = document.createElement('div');
    wrapper.className = 'hero-wrapper';
  
    if (image) {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'hero-image';
      imgContainer.appendChild(image);
      wrapper.appendChild(imgContainer);
    }
  
    if (title) {
      const textContainer = document.createElement('div');
      textContainer.className = 'hero-text';
      const heading = document.createElement('h1');
      heading.textContent = title;
      textContainer.appendChild(heading);
      wrapper.appendChild(textContainer);
    }
  
    block.textContent = '';
    block.appendChild(wrapper);
  }
  
