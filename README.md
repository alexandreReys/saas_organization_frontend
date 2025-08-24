# Frontend Admin - Aplicação React Next.js TypeScript

Uma aplicação moderna de frontend administrativo construída com as melhores tecnologias do ecossistema React.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **ESLint** - Linting de código

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router (Next.js 13+)
│   ├── globals.css     # Estilos globais
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página inicial
├── components/         # Componentes reutilizáveis
│   └── ui/            # Componentes de UI base
├── lib/               # Utilitários e configurações
├── types/             # Definições de tipos TypeScript
└── ...
```

## 🛠 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd frontend-adm
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📝 Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Constrói a aplicação para produção
- `npm run start` - Executa a aplicação em produção
- `npm run lint` - Executa o linting do código

## 🎨 Componentes

### Componentes de UI Base

- **Button** - Componente de botão com variantes
- **Card** - Componente de cartão para exibir conteúdo

### Utilitários

- **cn()** - Função para combinar classes CSS (clsx + tailwind-merge)

## 🔧 Configurações

### Tailwind CSS

O projeto está configurado com Tailwind CSS 4 para estilização rápida e consistente.

### TypeScript

Configurado com verificação de tipos estrita para melhor experiência de desenvolvimento.

### ESLint

Configurado com as regras recomendadas do Next.js para manter a qualidade do código.

## 📚 Próximos Passos

- [ ] Adicionar autenticação
- [ ] Implementar roteamento protegido
- [ ] Adicionar formulários com validação
- [ ] Integrar com API backend
- [ ] Adicionar testes unitários
- [ ] Configurar deployment

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
