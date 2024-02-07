import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function HealthChecker() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  // const handleCheckHealth = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:4001/proxy", {
  //       url: url,
  //       method: "GET", // Méthode HTTP (facultative, par défaut GET)
  //     });
  //     console.log(url);
  //     // const response = await axios.post(url);
  //     console.log("Réponse du proxy:", response.data);
  //     setStatus(`Status code: ${response.data}`);
  //   } catch (error: any) {
  //     console.error("Erreur de proxy:", error.message);
  //     setStatus(`Error: ${error.message}`);
  //   }
  // };
  const handleCheckHealth = async () => {
    try {
      console.log("toto");
      console.log(url);
      const response = await axios.post("http://localhost:4001", {
        url: url,
      });
      console.log(response);
      setStatus(response.data); // Met à jour le statut avec le code de statut de la réponse
      setError("Tout va bien!"); // Réinitialise les erreurs
    } catch (error: any) {
      console.error("Erreur de requête:", error.message);
      setError(
        "Une erreur s'est produite lors de la vérification de la santé.",
      ); // Met à jour l'erreur
      setStatus(null); // Réinitialise le statut
    }
  };
  return (
    <div className="[w-400] flex flex-column p-2 gap-2 rounded-lg border">
      <div className="flex flex-column gap-1">
        <Input value={url} onChange={(e) => setUrl(e.target.value)} />
        <Button onClick={handleCheckHealth}>Vérifier</Button>
      </div>
      {status}
    </div>
  );
}
