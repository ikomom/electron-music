export function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

export function isEmptyElement(c) {
  return !(c.tag || (c.text && c.text.trim() !== ''));
}


export function filterEmpty(children = []) {
  return children.filter(c => !isEmptyElement(c));
}