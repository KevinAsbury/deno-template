import { Application, green, yellow } from './deps.ts';
import router from './routes/router.ts';

const app = new Application();
const port = 5050;

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', ({ secure, hostname, port }) => {
  const protocol = secure ? 'https://' : 'http://';
  const url = `${protocol}${hostname ?? 'localhost'}:${port}`;
  console.log(`${yellow('Listening on:')} ${green(url)}`);
});

await app.listen({ port });
