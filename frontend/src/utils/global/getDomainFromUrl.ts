export function getDomainFromUrl(url: string) {
  // Crée un objet URL
  const urlObj = new URL(url);

  // Récupère le nom de domaine sans le sous-domaine 'www'
  const domain = urlObj.hostname.replace(/^www\./, "");

  return domain;
}

// urlPattern
export const urlPattern =
  // /^(https?:\/\/)?(www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w-]*)*$/;
  /^(https?:\/\/)[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w-]*)*$/;
