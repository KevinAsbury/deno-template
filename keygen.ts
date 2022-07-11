import { format } from './src/deps.ts';
// deno run --allow-write --allow-read keygen.ts
await window.crypto.subtle
  .generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  )
  .then(async ({ publicKey, privateKey }) => {
    const exportedPublicKey = await window.crypto.subtle.exportKey(
      'jwk',
      publicKey
    );
    const exportedPrivateKey = await window.crypto.subtle.exportKey(
      'jwk',
      privateKey
    );

    const existingPrivateKeyFile = readJson(
      './config/RSA-OAEP-256-Private.json'
    );
    if (existingPrivateKeyFile) {
      writeJson(
        `./config/RSA-OAEP-256-Private-replaced-${format(
          new Date(),
          'yyyy-MM-dd-HH-mm-ss'
        )}.json`,
        JSON.parse(existingPrivateKeyFile) as JsonWebKey
      );
    }

    const existingPublicKeyFile = readJson('./config/RSA-OAEP-256-Public.json');
    if (existingPublicKeyFile) {
      writeJson(
        `./config/RSA-OAEP-256-Public-replaced-${format(
          new Date(),
          'yyyy-MM-dd-HH-mm-ss'
        )}.json`,
        JSON.parse(existingPublicKeyFile) as JsonWebKey
      );
    }

    writeJson('./config/RSA-OAEP-256-Private.json', exportedPrivateKey);
    writeJson('./config/RSA-OAEP-256-Public.json', exportedPublicKey);
  });

function writeJson(path: string, data: JsonWebKey): void {
  try {
    Deno.writeTextFileSync(path, JSON.stringify(data), { append: false });
  } catch (e) {
    console.error(e.message);
  }
}

function readJson(path: string): string | null {
  try {
    return Deno.readTextFileSync(path);
  } catch (e) {
    console.error({ error: e.message });
    return null;
  }
}
