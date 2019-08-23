export default key =>
  key
    .split('_')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ')
