import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './router';

async function main() {
  const client = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
  });

  const health = await client.health.query();
  console.log('health:', health);

  const hi = await client.hello.query({ name: 'Bruno' });
  console.log('hello:', hi);

  const created = await client.post.create.mutate({
    title: 'Types all the way down',
    body: 'No OpenAPI/Protobuf; still type-safe.',
  });
  console.log('created:', created);

  const list = await client.post.list.query();
  console.log('posts:', list);

  const byId = await client.post.getById.query({ id: created.id });
  console.log('getById:', byId);

  const updated = await client.post.updateTitle.mutate({
    id: created.id,
    title: 'Updated title',
  });
  console.log('updated:', updated);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});