import { Application, green, yellow } from './deps.ts';
import router from './src/routes/router.ts';

const app = new Application();
const port = 5050;

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', ({ secure, hostname, port }) => {
  const protocol = secure ? 'https://' : 'http://';
  const url = `${protocol}${hostname ?? 'localhost'}:${port}`;
  console.log(`${yellow('Listening on:')} ${green(url)}`);
});

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
  .then(async cryptoKeyPair => {
    const message = 'I am a secret message';
    const enc = new TextEncoder();
    const encoded = enc.encode(message);
    const encrypted = await window.crypto.subtle
      .encrypt(
        {
          name: 'RSA-OAEP',
        },
        cryptoKeyPair.publicKey,
        encoded
      )
      .then(buffer => {
        const view = new Uint8Array(buffer);
        return view;
      });
    // console.log(encrypted);

    const decrypted = await window.crypto.subtle
      .decrypt(
        {
          name: 'RSA-OAEP',
        },
        cryptoKeyPair.privateKey,
        encrypted
      )
      .then(buffer => {
        const view = new Uint8Array(buffer);
        return view;
      });
    const decryptedMessage = new TextDecoder().decode(decrypted);
    console.log(decryptedMessage);
  });

await app.listen({ port });
