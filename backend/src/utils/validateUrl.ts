type URLString = string;

/**
 * Valide si une chaîne est une URL bien formée en utilisant une expression régulière.
 * Accepte les formats avec "https", "www", "http", ou juste le nom de domaine.
 * @param url La chaîne à valider comme URL.
 * @returns true si l'URL est valide, sinon false.
 */
export default function validateUrl(url: URLString): boolean {
  const urlPattern =
    /^(https?:\/\/)?(www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w-]*)*$/;
  return urlPattern.test(url);
}

// Exemples d'utilisation
// console.log(validateURL("https://www.example.com")); // true
// console.log(validateURL("http://example.com")); // true
// console.log(validateURL("www.example.com")); // true
// console.log(validateURL("example.com")); // true
// console.log(validateURL("https://example.com/path/to/file")); // true
// console.log(validateURL("https://example.com/path/to/file with space")); // false
