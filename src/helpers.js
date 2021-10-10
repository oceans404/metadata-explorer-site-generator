export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export const roundToDecimal = (num) => Math.round(num * 1000) / 1000;

export const makePercent = (val, total) => roundToDecimal((100 * val) / total);
