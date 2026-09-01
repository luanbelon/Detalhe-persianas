export function getSectionBackgroundStyle(background) {
  if (!background || background.type === 'class') return undefined;

  if (background.type === 'color') {
    return { backgroundColor: background.value };
  }

  if (background.type === 'gradient') {
    return {
      background: `linear-gradient(to bottom right, ${background.from}, ${background.to})`,
    };
  }

  if (background.type === 'image') {
    return {
      backgroundImage: `url(${background.value})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  return undefined;
}

export function getSectionClassName(background, fallbackClass = '') {
  if (!background || background.type === 'class') {
    return background?.value || fallbackClass;
  }
  return fallbackClass;
}
