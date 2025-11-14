# ☀️ Off-Grid System Calculator# ☀️ Off-Grid System Calculator

<div align="center">**🌍 Escolha seu idioma | Select your language | Selecciona tu idioma:**

## 🌍 Select Your Language / Escolha seu Idioma / Selecciona tu Idioma[![PT-BR](https://img.shields.io/badge/Português-blue?style=for-the-badge&logo=readme)](./docs/README.pt-BR.md)

[![EN-US](https://img.shields.io/badge/English-green?style=for-the-badge&logo=readme)](./docs/README.en-US.md)

**👇 Click on the tabs below to read in your language 👇**[![ES](https://img.shields.io/badge/Español-red?style=for-the-badge&logo=readme)](./docs/README.es.md)

</div>---

---## Overview

<details open>**Off-Grid System Calculator** is a modern web application for **sizing off-grid photovoltaic systems**. It automatically calculates the number of solar panels, batteries, and other components needed for self-sufficient renewable energy systems.

<summary><strong>🇧🇷 Português (Brasil)</strong></summary>

The application integrates real climate data from the **NASA POWER API** to calculate the solar potential of any geographic location and automatically size the system components.

Uma aplicação web moderna para **dimensionamento de sistemas fotovoltaicos off-grid** (isolados da rede elétrica). Calcula automaticamente a quantidade de painéis solares, baterias e componentes necessários para sistemas de energia renovável autossuficientes.

### Key Features

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)

![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)✅ **NASA POWER API Integration** - Gets real climate data for solar irradiation

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)✅ **Intelligent Panel Calculation** - Sizes panels based on consumption and radiation

![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B6FF?style=flat-square&logo=tailwindcss)✅ **Battery Sizing** - Supports multiple types (LiFePO4, Lead-acid)

![i18next](https://img.shields.io/badge/i18next-23-26A69A?style=flat-square&logo=i18next)✅ **Autonomy Calculation** - Defines how many days the system runs without generation

✅ **Responsive Interface** - Modern design with Tailwind CSS and shadcn/ui

### 📋 Visão Geral✅ **Accurate Physics** - Application of degradation and real-world loss factors

✅ **Multilingual Support** - Portuguese, English, and Spanish with automatic detection

O **Off-Grid System Calculator** é uma ferramenta essencial para engenheiros, instaladores e entusiastas de energia renovável. Integra dados climáticos reais da **NASA POWER API** para calcular o potencial solar de qualquer localização e dimensiona automaticamente os componentes do sistema.

### Tech Stack

### ✨ Funcionalidades Principais

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)

✅ **NASA POWER API** - Dados climáticos reais de irradiação solar ![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)

✅ **Cálculo de Painéis** - Dimensiona baseado no consumo e radiação ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)

✅ **Baterias** - Suporta LiFePO4, Chumbo-ácido estacionária e automotiva ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B6FF?style=flat-square&logo=tailwindcss)

✅ **Autonomia** - Calcula dias de funcionamento sem geração ![i18next](https://img.shields.io/badge/i18next-23-26A69A?style=flat-square&logo=i18next)

✅ **Interface Responsiva** - Design moderno com Tailwind + shadcn/ui

✅ **Suporte Multilíngue** - PT/EN/ES com detecção automática ---

### 🚀 Como Começar## � Quick Start

**Pré-requisitos:**### Prerequisites

- Node.js 18+

- npm ou yarn- Node.js 18+

- npm or yarn

**Instalação:**

```````bash### Installation

git clone https://github.com/Jeferson5641/off-grid-system.git

cd off-grid-system```bash

npm installgit clone https://github.com/Jeferson5641/off-grid-system.git

```cd off-grid-system

npm install

**Desenvolvimento:**```

```bash

npm run dev### Development

# Abra http://localhost:3000

``````bash

npm run dev

**Produção:**```

```bash

npm run buildOpen [http://localhost:3000](http://localhost:3000)

npm start

```### Production Build



### 📐 Como Usar```bash

npm run build

1. **Insira a Localização** - Latitude e Longitudenpm start

2. **Defina o Consumo** - Consumo médio mensal em kWh```

3. **Busque a Radiação** - Clique para obter dados NASA POWER

4. **Configure Componentes** - Potência do painel, autonomia, tensão## 🚀 Como Começar

5. **Escolha Bateria** - LiFePO4 ou Chumbo-ácido

6. **Receba Resultados** - Quantidade de painéis, baterias e capacidade### Pré-requisitos



### 🛠 Tecnologias- Node.js 18+

- npm ou yarn

| Tecnologia | Versão | Uso |- Git

|-----------|--------|-----|

| Next.js | 16.0 | Framework React |### Instalação

| React | 19.2 | Biblioteca UI |

| TypeScript | 5 | Tipagem |```bash

| Tailwind CSS | 4.1 | Estilos |# Clone o repositório

| i18next | 23 | Tradução |git clone https://github.com/Jeferson5641/off-grid-system.git

cd off-grid-system

### 📚 Algoritmos de Cálculo

# Instale as dependências

**HSP Médio (Hora de Sol Pico):**npm install

```# ou

HSP Médio = Σ Irradiação Mensal / 12yarn install

```````

**Painéis Necessários:**### Execução em Desenvolvimento

````

Painéis = ⌈ Consumo com Perdas / (Potência × HSP × PR) ⌉```bash

```npm run dev

# ou

**Capacidade de Bateria:**yarn dev

````

Capacidade Ah = (Energia Necessária × 1000) / (Voltagem × DoD × Eficiência)

```````Abra [http://localhost:3000](http://localhost:3000) no seu navegador.



### 🔧 Estrutura do Projeto### Build para Produção



``````bash

off-grid-system/npm run build

├── src/npm start

│   ├── app/# ou

│   │   ├── layout.tsxyarn build

│   │   ├── page.tsxyarn start

│   │   └── globals.css```

│   ├── (page)/

│   │   ├── solarpage/## 📐 Como Usar

│   │   │   └── page.tsx

│   │   └── calc/### 1️⃣ Insira a Localização

│   │       └── calc.tsx

│   ├── components/- **Latitude e Longitude** - Use coordenadas do local do projeto

│   │   ├── LanguageSwitcher.tsx- Padrão: Brasília, DF (-15.7797, -47.9297)

│   │   ├── I18nProvider.tsx

│   │   └── ui/### 2️⃣ Defina o Consumo

│   ├── i18n/

│   │   ├── config.ts- **Consumo Médio Mensal (kWh)** - Calcule seu consumo total mensal

│   │   └── locales/

│   └── lib/### 3️⃣ Busque a Radiação Solar

├── public/

├── package.json- Clique em **"Buscar Radiação (NASA POWER)"** para obter dados reais do local

└── ...- A aplicação consultará dados climáticos de 40 anos da NASA

```````

### 4️⃣ Configure os Componentes

### 🌐 Suporte Multilíngue

- **Potência do Painel** - Capacidade em Watts (comum: 400-600W)

A aplicação detecta automaticamente o idioma do navegador e exibe a interface no idioma apropriado com opção de trocar manualmente usando o seletor de idiomas.- **Performance Ratio** - Fator de perdas (~0.75 ou 75%)

- **Dias de Autonomia** - Quantos dias sem sol o sistema aguenta

### 📞 Contato- **Tensão do Banco** - Escolha: 12V, 24V ou 48V

- **GitHub**: [@Jeferson5641](https://github.com/Jeferson5641)### 5️⃣ Escolha o Tipo de Bateria

- **Issues**: [Reportar Problema](https://github.com/Jeferson5641/off-grid-system/issues)

Opções disponíveis:

### 📝 Licença

- **LiFePO4** - Ciclos longos, alto desempenho (80% DoD, 95% eficiência)

MIT License - Use livremente!- **Chumbo-ácido Estacionária** - Custo-benefício (60% DoD, 85% eficiência)

- **Chumbo-ácido Automotiva** - Baixo custo, ciclos curtos (30% DoD, 80% eficiência)

</details>

### 6️⃣ Receba os Resultados

---

Obtenha:

<details>

<summary><strong>🇺🇸 English (USA)</strong></summary>- 📊 Quantidade de painéis necessários

- 🔋 Capacidade total da bateria em kWh e Ah

A modern web application for **sizing off-grid photovoltaic systems** (isolated from the electrical grid). Automatically calculates the number of solar panels, batteries, and components needed for self-sufficient renewable energy systems.- 📦 Quantidade de unidades de bateria

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)## 🔧 Estrutura do Projeto

![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)```

![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B6FF?style=flat-square&logo=tailwindcss)off-grid-system/

![i18next](https://img.shields.io/badge/i18next-23-26A69A?style=flat-square&logo=i18next)├── src/

│ ├── app/

### 📋 Overview│ │ ├── layout.tsx # Layout principal

│ │ ├── page.tsx # Página inicial

**Off-Grid System Calculator** is an essential tool for engineers, installers, and renewable energy enthusiasts. It integrates real climate data from the **NASA POWER API** to calculate the solar potential of any location and automatically size the system components.│ │ └── globals.css # Estilos globais

│ ├── (page)/

### ✨ Key Features│ │ ├── solarpage/

│ │ │ └── page.tsx # Componente principal da calculadora

✅ **NASA POWER API** - Real climate data for solar irradiation │ │ └── calc/

✅ **Panel Calculation** - Sizes based on consumption and radiation │ │ └── calc.tsx # Lógica de cálculos e integração com API

✅ **Batteries** - Supports LiFePO4, Stationary and Automotive Lead-acid │ ├── components/

✅ **Autonomy** - Calculates days of operation without generation │ │ └── ui/ # Componentes shadcn/ui

✅ **Responsive Interface** - Modern design with Tailwind + shadcn/ui │ │ ├── input.tsx

✅ **Multilingual Support** - PT/EN/ES with automatic detection │ │ ├── button.tsx

│ │ ├── select.tsx

### 🚀 Getting Started│ │ └── ...

│ └── lib/

**Requirements:**│ └── utils.ts # Utilitários gerais

- Node.js 18+├── public/ # Arquivos estáticos

- npm or yarn├── package.json

├── tsconfig.json

**Installation:**├── tailwind.config.js

````bash└── next.config.ts

git clone https://github.com/Jeferson5641/off-grid-system.git```

cd off-grid-system

npm install## 📚 Algoritmo de Cálculo

````

### 1. Irradiação Solar (HSP - Hora de Sol Pico)

**Development:**

```bash$$\text{HSP Médio} = \frac{\sum \text{Irradiação Mensal}}{12}$$

npm run dev

# Open http://localhost:3000### 2. Consumo Diário com Perdas

```

$$\text{Consumo Diário} = \frac{\text{Consumo Mensal}}{30}$$

**Production:**$$\text{Consumo com Perdas} = \text{Consumo Diário} \times 1.20$$

````bash

npm run build### 3. Dimensionamento de Painéis

npm start

```$$\text{Produção Painel} = \text{Potência} \times \text{HSP} \times \text{Performance Ratio}$$

$$\text{Painéis Necessários} = \lceil \frac{\text{Consumo com Perdas}}{\text{Produção Painel}} \rceil$$

### 📐 How to Use

### 4. Dimensionamento de Baterias

1. **Enter Location** - Latitude and Longitude

2. **Set Consumption** - Average monthly consumption in kWh$$\text{Energia Necessária} = \text{Consumo com Perdas} \times \text{Dias Autonomia}$$

3. **Fetch Radiation** - Click to get NASA POWER data$$\text{Capacidade Nominal} = \frac{\text{Energia Necessária}}{\text{DoD} \times \text{Eficiência}}$$

4. **Configure Components** - Panel power, autonomy, voltage$$\text{Capacidade Ah} = \frac{\text{Capacidade Nominal} \times 1000}{\text{Tensão do Banco}}$$

5. **Choose Battery** - LiFePO4 or Lead-acid$$\text{Unidades Necessárias} = \lceil \frac{\text{Capacidade Ah}}{\text{Capacidade Unitária}} \rceil$$

6. **Get Results** - Number of panels, batteries, and capacity

## 🛠 Tecnologias Utilizadas

### 🛠 Technologies

| Tecnologia      | Versão | Propósito                    |

| Technology | Version | Usage || --------------- | ------ | ---------------------------- |

|-----------|---------|-------|| Next.js         | 16.0   | Framework React fullstack    |

| Next.js | 16.0 | React Framework || React           | 19.2   | Biblioteca de UI             |

| React | 19.2 | UI Library || TypeScript      | 5      | Tipagem estática             |

| TypeScript | 5 | Typing || Tailwind CSS    | 4.1    | Estilização utilitária       |

| Tailwind CSS | 4.1 | Styling || shadcn/ui       | -      | Componentes acessíveis       |

| i18next | 23 | Translation || Radix UI        | -      | Primitivos de UI             |

| React Hook Form | 7.66   | Gerenciamento de formulários |

### 📚 Calculation Algorithms| Zod             | 4.1    | Validação de schemas         |



**Average PSH (Peak Sun Hours):**## 🔌 API Integrada

````

Average PSH = Σ Monthly Irradiation / 12### NASA POWER API

````

- **Endpoint**: `https://power.larc.nasa.gov/api/temporal/climatology`

**Panels Needed:**- **Dados**: Irradiação solar global horizontal (ALLSKY_SFC_SW_DWN)

```- **Histórico**: 40 anos de dados climáticos

Panels = ⌈ Consumption with Losses / (Power × PSH × PR) ⌉- **Precisão**: Resolução 0.5° x 0.5° de latitude/longitude

````

````typescript

**Battery Capacity:**// Exemplo de integração

```const monthlyData = await fetchIrradianceClimatology(-15.7797, -47.9297);

Capacity Ah = (Energy Needed × 1000) / (Voltage × DoD × Efficiency)// Retorna: [4.2, 4.1, 3.8, 3.5, ..., 4.3] kWh/m²/dia

````

### 🔧 Project Structure## 📊 Exemplos de Resultados

````### Cenário: Residência em Brasília

off-grid-system/

├── src/- **Consumo**: 300 kWh/mês

│   ├── app/- **Autonomia**: 3 dias

│   │   ├── layout.tsx- **Painel**: 550W

│   │   ├── page.tsx- **Bateria**: 48V LiFePO4

│   │   └── globals.css

│   ├── (page)/**Resultados**:

│   │   ├── solarpage/

│   │   │   └── page.tsx- 📊 **3-4 painéis** de 550W

│   │   └── calc/- 🔋 **12-15 kWh** de capacidade total

│   │       └── calc.tsx- 📦 **12-15 unidades** de 100Ah

│   ├── components/

│   │   ├── LanguageSwitcher.tsx## 🐛 Tratamento de Erros

│   │   ├── I18nProvider.tsx

│   │   └── ui/A aplicação fornece mensagens claras de erro:

│   ├── i18n/

│   │   ├── config.ts- ❌ "Por favor, busque a radiação solar primeiro" - Execute a API antes de calcular

│   │   └── locales/- ❌ "Falha ao obter dados de radiação" - Verifique conectividade com a NASA POWER API

│   └── lib/- ❌ "Erro durante o cálculo" - Verifique os valores inseridos

├── public/

├── package.json## 🌍 Ambientes Suportados

└── ...

```- ✅ Windows, macOS, Linux

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)

### 🌐 Multilingual Support- ✅ Dispositivos mobile (responsivo)



The application automatically detects the browser language and displays the interface in the appropriate language with the option to manually switch using the language selector.## 📝 Licença



### 📞 ContactEste projeto está sob licença **MIT**. Veja o arquivo LICENSE para detalhes.



- **GitHub**: [@Jeferson5641](https://github.com/Jeferson5641)## 🤝 Contribuindo

- **Issues**: [Report a Problem](https://github.com/Jeferson5641/off-grid-system/issues)

Contribuições são bem-vindas! Para contribuir:

### 📝 License

1. Faça um fork do repositório

MIT License - Feel free to use!2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)

3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)

</details>4. Push para a branch (`git push origin feature/MinhaFeature`)

5. Abra um Pull Request

---

## 📞 Contato e Suporte

<details>

<summary><strong>🇪🇸 Español</strong></summary>- **Desenvolvedor**: Jeferson

- **GitHub**: [@Jeferson5641](https://github.com/Jeferson5641)

Una aplicación web moderna para **dimensionar sistemas fotovoltaicos off-grid** (aislados de la red eléctrica). Calcula automáticamente la cantidad de paneles solares, baterías y componentes necesarios para sistemas de energía renovable autosuficientes.- **Issues**: [GitHub Issues](https://github.com/Jeferson5641/off-grid-system/issues)



![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)## 🚦 Status do Projeto

![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)- ✅ Cálculos básicos implementados

![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B6FF?style=flat-square&logo=tailwindcss)- ✅ Integração com NASA POWER API

![i18next](https://img.shields.io/badge/i18next-23-26A69A?style=flat-square&logo=i18next)- ✅ Interface responsiva

- 🔄 Em desenvolvimento e melhorias contínuas

### 📋 Descripción General

## 📦 Versão Atual

**Off-Grid System Calculator** es una herramienta esencial para ingenieros, instaladores y entusiastas de energía renovable. Integra datos climáticos reales de la **API NASA POWER** para calcular el potencial solar de cualquier ubicación y dimensiona automáticamente los componentes del sistema.

`v0.1.0` - Alpha (Versão em desenvolvimento)

### ✨ Características Principales

---

✅ **NASA POWER API** - Datos climáticos reales de irradiación solar

✅ **Cálculo de Paneles** - Dimensiona según consumo y radiación  Feito com ☀️ e ⚡ para sistemas solares off-grid

✅ **Baterías** - Soporta LiFePO4, Ácido-plomo estacionaria y automotriz
✅ **Autonomía** - Calcula días de funcionamiento sin generación
✅ **Interfaz Responsiva** - Diseño moderno con Tailwind + shadcn/ui
✅ **Soporte Multilingüe** - PT/EN/ES con detección automática

### 🚀 Empezar

**Requisitos:**
- Node.js 18+
- npm o yarn

**Instalación:**
```bash
git clone https://github.com/Jeferson5641/off-grid-system.git
cd off-grid-system
npm install
````

**Desarrollo:**

```bash
npm run dev
# Abre http://localhost:3000
```

**Producción:**

```bash
npm run build
npm start
```

### 📐 Cómo Usar

1. **Ingresa la Ubicación** - Latitud y Longitud
2. **Define el Consumo** - Consumo promedio mensual en kWh
3. **Obtén la Radiación** - Haz clic para obtener datos NASA POWER
4. **Configura Componentes** - Potencia del panel, autonomía, voltaje
5. **Elige Batería** - LiFePO4 o Ácido-plomo
6. **Obtén Resultados** - Cantidad de paneles, baterías y capacidad

### 🛠 Tecnologías

| Tecnología   | Versión | Uso             |
| ------------ | ------- | --------------- |
| Next.js      | 16.0    | Framework React |
| React        | 19.2    | Librería UI     |
| TypeScript   | 5       | Tipado          |
| Tailwind CSS | 4.1     | Estilos         |
| i18next      | 23      | Traducción      |

### 📚 Algoritmos de Cálculo

**HSP Promedio (Horas de Sol Pico):**

```
HSP Promedio = Σ Irradiación Mensual / 12
```

**Paneles Necesarios:**

```
Paneles = ⌈ Consumo con Pérdidas / (Potencia × HSP × PR) ⌉
```

**Capacidad de Batería:**

```
Capacidad Ah = (Energía Necesaria × 1000) / (Voltaje × DoD × Eficiencia)
```

### 🔧 Estructura del Proyecto

```
off-grid-system/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── (page)/
│   │   ├── solarpage/
│   │   │   └── page.tsx
│   │   └── calc/
│   │       └── calc.tsx
│   ├── components/
│   │   ├── LanguageSwitcher.tsx
│   │   ├── I18nProvider.tsx
│   │   └── ui/
│   ├── i18n/
│   │   ├── config.ts
│   │   └── locales/
│   └── lib/
├── public/
├── package.json
└── ...
```

### 🌐 Soporte Multilingüe

La aplicación detecta automáticamente el idioma del navegador y muestra la interfaz en el idioma apropiado con la opción de cambiar manualmente usando el selector de idiomas.

### 📞 Contacto

- **GitHub**: [@Jeferson5641](https://github.com/Jeferson5641)
- **Issues**: [Reportar un Problema](https://github.com/Jeferson5641/off-grid-system/issues)

### 📝 Licencia

Licencia MIT - ¡Úsalo libremente!

</details>

---

<div align="center">

## 📊 Project Status / Status do Projeto / Estado del Proyecto

✅ Basic calculations implemented  
✅ NASA POWER API integration  
✅ Responsive interface  
✅ Multilingual support (PT/EN/ES)  
🔄 Under development with continuous improvements

### Made with ☀️ and ⚡ for off-grid solar systems

Feito com ☀️ e ⚡ para sistemas solares off-grid

Hecho con ☀️ y ⚡ para sistemas solares off-grid

</div>
