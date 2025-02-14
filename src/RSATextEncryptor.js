import React, { useState } from "react";
import "./RSATextEncryptor.css";

// Extended Euclidean Algorithm to find modular inverse
const gcdExtended = (a, b) => {
  if (a === 0) return [b, 0, 1];
  const [gcd, x1, y1] = gcdExtended(b % a, a);
  return [gcd, y1 - Math.floor(b / a) * x1, x1];
};

const modInverse = (a, m) => {
  const [gcd, x] = gcdExtended(a, m);
  if (gcd !== 1) {
    throw new Error("Modular inverse does not exist.");
  }
  return (x % m + m) % m;
};

// Fast modular exponentiation
const modExp = (base, exp, mod) => {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % mod;
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
};

const RSATextEncryptor = () => {
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState([]);
  const [decryptedText, setDecryptedText] = useState("");

  // RSA Parameters
  const p = 61, q = 53;
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const e = 17;
  const d = modInverse(e, phi); // Compute modular inverse dynamically

  // Encrypt text
  const encryptText = () => {
    const encrypted = text.split("").map((char) => modExp(char.charCodeAt(0), e, n));
    setEncryptedText(encrypted);
  };

  // Decrypt text
  const decryptText = () => {
    const decrypted = encryptedText.map((num) => String.fromCharCode(modExp(num, d, n))).join("");
    setDecryptedText(decrypted);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>RSA Text Encryptor</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={encryptText}>Encrypt</button>
      <button onClick={decryptText} style={{ marginLeft: "10px" }}>Decrypt</button>
      <h3>Encrypted Message:</h3>
      <p>{encryptedText.join(" ")}</p>
      <h3>Decrypted Message:</h3>
      <p>{decryptedText}</p>
    </div>
  );
};

export default RSATextEncryptor;
