export function shuffle(options) {
  return options.sort(() => Math.random() - 0.5);
}
