# tRPC - POC
tRPC stands for `TypeScript-first RPC`, and is a Remote Procedure Call over HTTP using JSON. The server exports types, the client imports them directly, so you get end-to-end type safety with zero codegen.

## How it works 
You define a router with procedures (queries/mutations). At runtime it’s just HTTP endpoints; at compile time your client is type-checked against the server’s procedures and zod schemas.

## When to use
You control both client and server in a TypeScript monorepo; you want fast iteration and compile-time guarantees without maintaining OpenAPI/Protobuf.

## Downsides
- Not polyglot (TS-centric)
- no binary transport 
- no built-in streaming (beyond what you build)
- less ideal for public/open APIs consumed by many non-TS clients.