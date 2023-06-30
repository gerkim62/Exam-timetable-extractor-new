export function toCamelCase(str) {
  // Split the string by non-alphanumeric characters
  const words = str.split(/[^a-zA-Z0-9]/);

  // Convert each word to lowercase except the first word
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return capitalize(word);
    }
  });

  // Join the words together
  return camelCaseWords.join("");
}

// Helper function to capitalize the first letter of a word
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
