# UI SDK — demo interativa

Demonstração **não oficial** do [UI SDK](https://github.com/vercel-labs/ui) da [Vercel Labs](https://github.com/vercel-labs). Não é um site da Vercel. O SDK ainda está em beta; as APIs podem mudar.

A página está em português e mostra componentes ao vivo feitos com `@ui-sdk/core` e `@ui-sdk/react`.

- Demo: [ui-sdk-demo-ze.vercel.app](https://ui-sdk-demo-ze.vercel.app)

- Documentação oficial: [ui-sdk.dev/docs](https://ui-sdk.dev/docs)
- Repositório oficial: [github.com/vercel-labs/ui](https://github.com/vercel-labs/ui)

## O que tem na demo

- Campo de busca montado com `definePrimitive` e `createFocusRecovery` (exemplo do README)
- Select, Combobox, Abas, Menu, Date Picker e Field com validação (componentes prontos do pacote)
- Avaliação com estrelas (`@ui-sdk/react/rating`)

## Como rodar

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

Requer Node 18+ e React 19.
