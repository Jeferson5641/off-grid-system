# ☀️ Calculadora Off-Grid Solar

**🌍 Escolha seu idioma:**

[![PT-BR](https://img.shields.io/badge/Português-blue?style=for-the-badge)](./README.pt-BR.md)
[![EN-US](https://img.shields.io/badge/English-green?style=for-the-badge)](./README.en-US.md)
[![ES](https://img.shields.io/badge/Español-red?style=for-the-badge)](./README.es.md)

---

Uma aplicação web moderna para **dimensionamento de sistemas fotovoltaicos off-grid** (isolados da rede elétrica). Calcula automaticamente a quantidade de painéis solares, baterias e componentes necessários para sistemas de energia renovável autossuficientes.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B6FF?style=flat-square&logo=tailwindcss)
![i18next](https://img.shields.io/badge/i18next-23-26A69A?style=flat-square&logo=i18next)

## 📋 Visão Geral

O **Off-Grid System Calculator** é uma ferramenta essencial para engenheiros, instaladores e entusiastas de energia renovável. A aplicação integra dados climáticos reais da **NASA POWER API** para calcular o potencial solar de qualquer localização geográfica e dimensionar automaticamente os componentes do sistema.

### Funcionalidades Principais

✅ **Integração com NASA POWER API** - Obtém dados climáticos reais de irradiação solar  
✅ **Cálculo Inteligente de Painéis** - Dimensiona a quantidade de painéis baseado no consumo e radiação  
✅ **Dimensionamento de Baterias** - Suporta múltiplos tipos (LiFePO4, Chumbo-ácido)  
✅ **Cálculo de Autonomia** - Define quantos dias o sistema funciona sem geração  
✅ **Interface Responsiva** - Design moderno com Tailwind CSS e shadcn/ui  
✅ **Cálculos Físicos Precisos** - Aplicação de fatores de degradação e perdas reais  
✅ **Suporte Multilíngue** - Português, Inglês e Espanhol com detecção automática

## 🚀 Como Começar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Jeferson5641/off-grid-system.git
cd off-grid-system

# Instale as dependências
npm install
```

### Execução em Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
npm run build
npm start
```

## 📐 Como Usar

### 1️⃣ Insira a Localização

- **Latitude e Longitude** - Use coordenadas do local do projeto
- Padrão: Brasília, DF (-15.7797, -47.9297)

### 2️⃣ Defina o Consumo

- **Consumo Médio Mensal (kWh)** - Calcule seu consumo total mensal

### 3️⃣ Busque a Radiação Solar

- Clique em **"Buscar Radiação (NASA POWER)"** para obter dados reais do local
- A aplicação consultará dados climáticos de 40 anos da NASA

### 4️⃣ Configure os Componentes

- **Potência do Painel** - Capacidade em Watts (comum: 400-600W)
- **Performance Ratio** - Fator de perdas (~0.75 ou 75%)
- **Dias de Autonomia** - Quantos dias sem sol o sistema aguenta
- **Tensão do Banco** - Escolha: 12V, 24V ou 48V

### 5️⃣ Escolha o Tipo de Bateria

Opções disponíveis:

- **LiFePO4** - Ciclos longos, alto desempenho (80% DoD, 95% eficiência)
- **Chumbo-ácido Estacionária** - Custo-benefício (60% DoD, 85% eficiência)
- **Chumbo-ácido Automotiva** - Baixo custo, ciclos curtos (30% DoD, 80% eficiência)

### 6️⃣ Receba os Resultados

Obtenha:

- 📊 Quantidade de painéis necessários
- 🔋 Capacidade total da bateria em kWh e Ah
- 📦 Quantidade de unidades de bateria

## 🔧 Estrutura do Projeto

```
off-grid-system/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página inicial
│   │   └── globals.css         # Estilos globais
│   ├── (page)/
│   │   ├── solarpage/
│   │   │   └── page.tsx        # Componente principal da calculadora
│   │   └── calc/
│   │       └── calc.tsx        # Lógica de cálculos e integração com API
│   ├── components/
│   │   ├── LanguageSwitcher.tsx   # Seletor de idiomas
│   │   ├── I18nProvider.tsx       # Provider de internacionalização
│   │   └── ui/                    # Componentes shadcn/ui
│   ├── i18n/
│   │   ├── config.ts              # Configuração do i18next
│   │   └── locales/               # Arquivos de tradução
│   │       ├── pt.json
│   │       ├── en.json
│   │       └── es.json
│   └── lib/
│       └── utils.ts            # Utilitários gerais
├── public/                     # Arquivos estáticos
├── docs/                       # Documentação em múltiplos idiomas
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts
```

## 📚 Algoritmo de Cálculo

### 1. Irradiação Solar (HSP - Hora de Sol Pico)

$$\text{HSP Médio} = \frac{\sum \text{Irradiação Mensal}}{12}$$

### 2. Consumo Diário com Perdas

$$\text{Consumo Diário} = \frac{\text{Consumo Mensal}}{30}$$
$$\text{Consumo com Perdas} = \text{Consumo Diário} \times 1.20$$

### 3. Dimensionamento de Painéis

$$\text{Produção Painel} = \text{Potência} \times \text{HSP} \times \text{Performance Ratio}$$
$$\text{Painéis Necessários} = \lceil \frac{\text{Consumo com Perdas}}{\text{Produção Painel}} \rceil$$

### 4. Dimensionamento de Baterias

$$\text{Energia Necessária} = \text{Consumo com Perdas} \times \text{Dias Autonomia}$$
$$\text{Capacidade Nominal} = \frac{\text{Energia Necessária}}{\text{DoD} \times \text{Eficiência}}$$
$$\text{Capacidade Ah} = \frac{\text{Capacidade Nominal} \times 1000}{\text{Tensão do Banco}}$$
$$\text{Unidades Necessárias} = \lceil \frac{\text{Capacidade Ah}}{\text{Capacidade Unitária}} \rceil$$

## 🛠 Tecnologias Utilizadas

| Tecnologia      | Versão | Propósito                    |
| --------------- | ------ | ---------------------------- |
| Next.js         | 16.0   | Framework React fullstack    |
| React           | 19.2   | Biblioteca de UI             |
| TypeScript      | 5      | Tipagem estática             |
| Tailwind CSS    | 4.1    | Estilização utilitária       |
| shadcn/ui       | -      | Componentes acessíveis       |
| i18next         | 23     | Internacionalização          |
| react-i18next   | 14     | Integração React com i18next |
| React Hook Form | 7.66   | Gerenciamento de formulários |
| Zod             | 4.1    | Validação de schemas         |

## 🔌 API Integrada

### NASA POWER API

- **Endpoint**: `https://power.larc.nasa.gov/api/temporal/climatology`
- **Dados**: Irradiação solar global horizontal (ALLSKY_SFC_SW_DWN)
- **Histórico**: 40 anos de dados climáticos
- **Precisão**: Resolução 0.5° x 0.5° de latitude/longitude

```typescript
// Exemplo de integração
const monthlyData = await fetchIrradianceClimatology(-15.7797, -47.9297);
// Retorna: [4.2, 4.1, 3.8, 3.5, ..., 4.3] kWh/m²/dia
```

## 🌐 Suporte Multilíngue

A aplicação detecta automaticamente o idioma do navegador e exibe a interface no idioma apropriado:

- **🇧🇷 Português** - Brasil e Portugal
- **🇺🇸 Inglês** - USA e UK
- **🇪🇸 Espanhol** - Espanha e América Latina

Você pode trocar o idioma manualmente usando o seletor no canto superior direito com as bandeiras dos países.

### Tradução Dinâmica

Todas as strings da interface foram traduzidas usando **i18next** com detecção automática de idioma:

- Localização automática baseada em `navigator.language`
- Troca de idioma em tempo real sem recarregar a página
- Suporte para 30+ chaves de tradução
- Organização clara de chaves por seção

## 📊 Exemplos de Resultados

### Cenário: Residência em Brasília

- **Consumo**: 300 kWh/mês
- **Autonomia**: 3 dias
- **Painel**: 550W
- **Bateria**: 48V LiFePO4

**Resultados**:

- 📊 **3-4 painéis** de 550W
- 🔋 **12-15 kWh** de capacidade total
- 📦 **12-15 unidades** de 100Ah

## 🐛 Tratamento de Erros

A aplicação fornece mensagens claras de erro:

- ❌ "Por favor, busque a radiação solar primeiro" - Execute a API antes de calcular
- ❌ "Falha ao obter dados de radiação" - Verifique conectividade com a NASA POWER API
- ❌ "Erro durante o cálculo" - Verifique os valores inseridos

## 🌍 Ambientes Suportados

- ✅ Windows, macOS, Linux
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos mobile (responsivo)

## 📝 Licença

Este projeto está sob licença **MIT**. Veja o arquivo LICENSE para detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📞 Contato e Suporte

- **Desenvolvedor**: Jeferson
- **GitHub**: [@Jeferson5641](https://github.com/Jeferson5641)
- **Issues**: [GitHub Issues](https://github.com/Jeferson5641/off-grid-system/issues)

## 🚦 Status do Projeto

- ✅ Cálculos básicos implementados
- ✅ Integração com NASA POWER API
- ✅ Interface responsiva
- ✅ Suporte multilíngue (PT/EN/ES)
- 🔄 Em desenvolvimento e melhorias contínuas

## 📦 Versão Atual

`v0.2.0` - Beta (Suporte multilíngue adicionado)

---

Feito com ☀️ e ⚡ para sistemas solares off-grid
