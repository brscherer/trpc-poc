import { initTRPC } from '@trpc/server';
import { z } from 'zod';

type Post = { id: number; title: string; body: string };
const t = initTRPC.create();

let posts: Post[] = [
  { id: 1, title: 'Hello tRPC', body: 'End-to-end types are neat.' },
];

export const appRouter = t.router({
  health: t.procedure.query(() => 'ok'),

  hello: t.procedure
    .input(z.object({ name: z.string().min(1) }))
    .query(({ input }) => `Hello, ${input.name}!`),

  post: t.router({
    list: t.procedure.query(() => posts),

    getById: t.procedure
      .input(z.object({ id: z.number().int().positive() }))
      .query(({ input }) => posts.find(p => p.id === input.id) ?? null),

    create: t.procedure
      .input(z.object({
        title: z.string().min(1),
        body: z.string().min(1),
      }))
      .mutation(({ input }) => {
        const id = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
        const post = { id, ...input };
        posts.push(post);
        return post;
      }),

    updateTitle: t.procedure
      .input(z.object({
        id: z.number().int().positive(),
        title: z.string().min(1),
      }))
      .mutation(({ input }) => {
        const p = posts.find(x => x.id === input.id);
        if (!p) return null;
        p.title = input.title;
        return p;
      }),
  }),
});

export type AppRouter = typeof appRouter;
