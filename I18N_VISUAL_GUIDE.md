# 🌐 Guia Visual - Sistema i18n

## 📍 O Que Foi Criado

```
┌─────────────────────────────────────────────────────┐
│  ✅ ESTRUTURA DE INTERNACIONALIZAÇÃO (i18n)        │
└─────────────────────────────────────────────────────┘

1️⃣ ARQUIVO DE TRADUÇÕES
   📄 src/lib/i18n.ts
   ├── Tipos: Language (pt-BR | en-US)
   ├── Dados: 30+ chaves traduzidas
   ├── Função: getTranslation(lang, key)
   └── Exports: languages, translations

2️⃣ COMPONENTE DE MENU
   🎨 src/components/LanguageSwitcher.tsx
   ├── Localização: Canto superior direito
   ├── Funcionalidade: Seletor dropdown
   ├── Ação: Muda idioma com reload
   ├── Links: README em PT/EN
   └── Persistência: localStorage

3️⃣ DOCUMENTAÇÃO
   📚 Múltiplos arquivos:
   ├── README.md (Português)
   ├── README.en.md (English)
   ├── I18N.md (Guia completo)
   ├── SETUP_I18N.md (Resumo)
   └── IMPLEMENTATION_SUMMARY.md (Este)

4️⃣ INTEGRAÇÃO
   🔗 src/app/layout.tsx
   └── Adicionado: <LanguageSwitcher />
```

## 🎯 Fluxo de Funcionamento

```
┌────────────────────────────────────────────────────┐
│ USUÁRIO VISITA A PÁGINA                            │
└─────────────────┬──────────────────────────────────┘
                  │
                  ▼
          ┌──────────────┐
          │ localStorage │
          │ tem idioma?  │
          └──────────────┘
             │         │
          SIM│         │NÃO
             │         └─────────────────┐
             │                           │
             ▼                           ▼
       ┌──────────────┐        ┌──────────────┐
       │ Usa idioma   │        │ Usa padrão:  │
       │ salvo        │        │ pt-BR        │
       └──────────────┘        └──────────────┘
             │                           │
             └──────────────┬────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │ Renderiza    │
                    │ página com   │
                    │ idioma       │
                    └──────────────┘
                            │
                            ▼
                    ┌──────────────────┐
                    │ Menu no topo     │
                    │ direito com flag │
                    │ do idioma        │
                    └──────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │ USUÁRIO CLICA NO MENU DE IDIOMA       │
        └───────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │ DROPDOWN ABRE COM OPÇÕES:             │
        │ • Selecionar novo idioma              │
        │ • Abrir README em Português           │
        │ • Abrir README em English             │
        └───────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
         MUDOU          CLICOU             CLICOU
        IDIOMA          README PT          README EN
            │               │               │
            ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │Salva em  │    │ Abre     │    │ Abre     │
    │localStorage    │ GitHub   │    │ GitHub   │
    │ novo     │    │ README.md│    │ README   │
    │ idioma   │    │ nova aba │    │ .en.md   │
    └──────────┘    └──────────┘    └──────────┘
            │               │               │
            ▼               ▼               ▼
    ┌──────────────────────────────────────┐
    │ RELOAD AUTOMÁTICO (se idioma mudou)  │
    │ OU NOVA ABA (se README clicado)      │
    └──────────────────────────────────────┘
```

## 📱 Como Aparece na Tela

### Desktop

```
┌───────────────────────────────────────────────────┐
│                                    🇧🇷 Português ▼ │
│                                                    │
│                                                    │
│                   ☀️ Calculadora Off-Grid Solar    │
│                                                    │
│              [Formulário da Calculadora]           │
│                                                    │
│                                                    │
└───────────────────────────────────────────────────┘

(Ao passar mouse sobre o botão de idioma, aparece tooltip)
(Ao clicar, menu dropdown abre para cima)
```

### Mobile

```
┌─────────────────────────────────┐
│ 🇧🇷 PT ▼                         │ ← Responsivo
│                                  │
│  ☀️ Calculadora Off-Grid Solar   │
│                                  │
│  [Formulário adaptado]           │
│                                  │
└─────────────────────────────────┘
```

## 🔑 Chaves de Tradução Disponíveis

### Estrutura

```
translations
├── pt-BR
│   ├── menu
│   │   ├── readmeTitle
│   │   ├── readmeLabel
│   │   └── language
│   └── solar
│       ├── title
│       ├── monthlyConsumption
│       ├── batteryType
│       └── ... (mais 20+)
│
└── en-US
    ├── menu
    │   ├── readmeTitle
    │   ├── readmeLabel
    │   └── language
    └── solar
        ├── title
        ├── monthlyConsumption
        ├── batteryType
        └── ... (mais 20+)
```

## 💻 Exemplos de Código

### Usar em Componente

```typescript
import { translations, Language } from "@/lib/i18n";

export default function MeuComponente() {
  const lang: Language = "pt-BR";
  const t = translations[lang];

  return (
    <>
      <h1>{t.solar.title}</h1>
      <label>{t.solar.monthlyConsumption}</label>
    </>
  );
}
```

### Usar Função Auxiliar

```typescript
import { getTranslation } from "@/lib/i18n";

const titulo = getTranslation("pt-BR", "solar.title");
const titulo_en = getTranslation("en-US", "solar.title");

console.log(titulo); // "☀️ Calculadora Off-Grid Solar"
console.log(titulo_en); // "☀️ Off-Grid Solar Calculator"
```

## 📊 Matriz de Arquivos

| Arquivo                               | Tipo       | Status        | Descrição            |
| ------------------------------------- | ---------- | ------------- | -------------------- |
| `src/lib/i18n.ts`                     | TypeScript | ✅ Novo       | Sistema de traduções |
| `src/components/LanguageSwitcher.tsx` | React      | ✅ Novo       | Menu de idioma       |
| `src/app/layout.tsx`                  | Next.js    | ✅ Modificado | Adicionado menu      |
| `README.md`                           | Markdown   | ✅ Existente  | Documentação PT      |
| `README.en.md`                        | Markdown   | ✅ Novo       | Documentação EN      |
| `I18N.md`                             | Markdown   | ✅ Novo       | Guia técnico         |
| `SETUP_I18N.md`                       | Markdown   | ✅ Novo       | Resumo visual        |
| `IMPLEMENTATION_SUMMARY.md`           | Markdown   | ✅ Novo       | Este arquivo         |

## 🎨 Design do Menu

```
┌──────────────────────────────────────┐
│  BOTÃO PRINCIPAL (sempre visível)    │
│  ┌────────────────────────────────┐  │
│  │ 🇧🇷 Português        ▼         │  │
│  └────────────────────────────────┘  │
│                                      │
│  DROPDOWN (ao clicar)                │
│  ┌────────────────────────────────┐  │
│  │ IDIOMA                         │  │
│  │ ✓ 🇧🇷 Português                │  │
│  │   🇺🇸 English                  │  │
│  ├────────────────────────────────┤  │
│  │ DOCUMENTAÇÃO                   │  │
│  │ 📖 Ver README em Português     │  │
│  │ 📖 View README in English      │  │
│  ├────────────────────────────────┤  │
│  │ 🌐 Selecione seu idioma        │  │
│  └────────────────────────────────┘  │
│                                      │
│  Cores:                              │
│  • Botão principal: indigo-600       │
│  • Idioma ativo: indigo-100 (fundo) │
│  • Texto ativo: indigo-700           │
│  • Hover: cinza-100                  │
└──────────────────────────────────────┘
```

## 🔄 Ciclo de Vida

```
1. APP CARREGA
   └─→ LanguageSwitcher monta
       └─→ Lê localStorage
           └─→ Encontrou idioma salvo?
               ├─ SIM: Usa aquele
               └─ NÃO: Usa pt-BR

2. PÁGINA RENDERIZA
   └─→ Com idioma selecionado
       └─→ Menu fica no top-right
           └─→ Pronto para usar

3. USUÁRIO INTERAGE
   └─→ Clica no menu
       └─→ Dropdown abre
           └─→ Seleciona opção
               ├─ IDIOMA: localStorage + reload
               └─ README: window.open()

4. PÓS-AÇÃO
   └─→ Se mudou idioma:
       ├─→ Salva em localStorage
       └─→ Página recarrega com novo idioma

   └─→ Se abriu README:
       └─→ Nova aba no GitHub
```

## ✅ Teste Manual

### 1. Testar Seleção de Idioma

- [ ] Clique no menu
- [ ] Selecione English
- [ ] Página recarrega?
- [ ] Idioma mudou?
- [ ] localStorage foi atualizado?

### 2. Testar Persistência

- [ ] Mude para English
- [ ] Feche a página
- [ ] Reabra a página
- [ ] Continua em English?

### 3. Testar README

- [ ] Clique no menu
- [ ] Clique em "Ver README em Português"
- [ ] GitHub abre em nova aba?

### 4. Testar Responsividade

- [ ] Abra em device mobile
- [ ] Menu aparece corretamente?
- [ ] Botão é tocável?
- [ ] Dropdown funciona?

## 📈 Métricas

```
Linhas de código:
├── i18n.ts: ~100 linhas
├── LanguageSwitcher.tsx: ~165 linhas
└── Documentação: ~1000 linhas

Idiomas suportados: 2 (PT + EN)
Chaves de tradução: 30+
Tamanho do bundle: ~13KB
Sem dependências externas: ✅
TypeScript: ✅ Completo
```

## 🎯 Próximas Etapas (Opcional)

1. **Expandir idiomas** - Adicione ES, FR, DE
2. **Detectar automaticamente** - Use `navigator.language`
3. **Remover reload** - Implemente context API
4. **Melhorar UX** - Adicione animações ao menu
5. **Internacionalizar tudo** - Inclua mensagens da calculadora

## 📞 Dúvidas?

Consulte:

- `I18N.md` - Guia técnico completo
- `SETUP_I18N.md` - Resumo rápido
- `src/lib/i18n.ts` - Código da implementação
- `src/components/LanguageSwitcher.tsx` - Componente

---

🎉 **Sistema de i18n implementado com sucesso!**

Você agora tem uma aplicação multilíngue profissional.
