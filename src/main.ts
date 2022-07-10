import { Application } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { green, yellow } from 'https://deno.land/std@0.53.0/fmt/colors.ts';
import userRouter from './routes/user.ts';

const app = new Application();
const port = 5050;

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.addEventListener('listen', ({ secure, hostname, port }) => {
  const protocol = secure ? 'https://' : 'http://';
  const url = `${protocol}${hostname ?? 'localhost'}:${port}`;
  console.log(`${yellow('Listening on:')} ${green(url)}`);
});

await app.listen({ port });
