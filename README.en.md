# ☀️ Off-Grid System Calculator

A modern web application for **sizing off-grid photovoltaic systems** (isolated from the electrical grid). Automatically calculates the quantity of solar panels, batteries, and components needed for self-sufficient renewable energy systems.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B6FF?style=flat-square&logo=tailwindcss)

## 📋 Overview

The **Off-Grid System Calculator** is an essential tool for engineers, installers, and renewable energy enthusiasts. The application integrates real climate data from the **NASA POWER API** to calculate the solar potential of any geographic location and automatically size the system components.

### Main Features

✅ **NASA POWER API Integration** - Gets real climate data on solar irradiance  
✅ **Smart Panel Calculation** - Sizes the number of panels based on consumption and radiation  
✅ **Battery Sizing** - Supports multiple types (LiFePO4, Lead-acid)  
✅ **Autonomy Calculation** - Defines how many days the system operates without generation  
✅ **Responsive Interface** - Modern design with Tailwind CSS and shadcn/ui  
✅ **Precise Physical Calculations** - Application of real degradation and loss factors

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Jeferson5641/off-grid-system.git
cd off-grid-system

# Install dependencies
npm install
# or
yarn install
```

### Running in Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📐 How to Use

### 1️⃣ Enter the Location

- **Latitude and Longitude** - Use coordinates of the project location
- Default: Brasília, DF (-15.7797, -47.9297)

### 2️⃣ Define Consumption

- **Average Monthly Consumption (kWh)** - Calculate your total monthly consumption

### 3️⃣ Fetch Solar Radiation

- Click **"Fetch Radiation (NASA POWER)"** to get real data from the location
- The application will consult 40 years of climate data from NASA

### 4️⃣ Configure Components

- **Panel Power** - Capacity in Watts (common: 400-600W)
- **Performance Ratio** - Loss factor (~0.75 or 75%)
- **Autonomy Days** - How many days without sun the system can handle
- **Bank Voltage** - Choose: 12V, 24V or 48V

### 5️⃣ Choose Battery Type

Available options:

- **LiFePO4** - Long cycles, high performance (80% DoD, 95% efficiency)
- **Lead-acid Stationary** - Cost-benefit (60% DoD, 85% efficiency)
- **Lead-acid Automotive** - Low cost, short cycles (30% DoD, 80% efficiency)

### 6️⃣ Get Results

Obtain:

- 📊 Number of panels needed
- 🔋 Total battery capacity in kWh and Ah
- 📦 Number of battery units

## 🔧 Project Structure

```
off-grid-system/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Main layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── (page)/
│   │   ├── solarpage/
│   │   │   └── page.tsx        # Main calculator component
│   │   └── calc/
│   │       └── calc.tsx        # Calculation logic and API integration
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   │       ├── input.tsx
│   │       ├── button.tsx
│   │       ├── select.tsx
│   │       └── ...
│   └── lib/
│       └── utils.ts            # General utilities
├── public/                     # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts
```

## 📚 Calculation Algorithm

### 1. Solar Irradiance (PSH - Peak Sun Hours)

$$\text{Average PSH} = \frac{\sum \text{Monthly Irradiance}}{12}$$

### 2. Daily Consumption with Losses

$$\text{Daily Consumption} = \frac{\text{Monthly Consumption}}{30}$$
$$\text{Consumption with Losses} = \text{Daily Consumption} \times 1.20$$

### 3. Panel Sizing

$$\text{Panel Production} = \text{Power} \times \text{PSH} \times \text{Performance Ratio}$$
$$\text{Panels Needed} = \lceil \frac{\text{Consumption with Losses}}{\text{Panel Production}} \rceil$$

### 4. Battery Sizing

$$\text{Energy Needed} = \text{Consumption with Losses} \times \text{Autonomy Days}$$
$$\text{Nominal Capacity} = \frac{\text{Energy Needed}}{\text{DoD} \times \text{Efficiency}}$$
$$\text{Capacity Ah} = \frac{\text{Nominal Capacity} \times 1000}{\text{Bank Voltage}}$$
$$\text{Units Needed} = \lceil \frac{\text{Capacity Ah}}{\text{Unit Capacity}} \rceil$$

## 🛠 Technologies Used

| Technology      | Version | Purpose                   |
| --------------- | ------- | ------------------------- |
| Next.js         | 16.0    | Fullstack React framework |
| React           | 19.2    | UI library                |
| TypeScript      | 5       | Static typing             |
| Tailwind CSS    | 4.1     | Utility-first styling     |
| shadcn/ui       | -       | Accessible components     |
| Radix UI        | -       | UI primitives             |
| React Hook Form | 7.66    | Form state management     |
| Zod             | 4.1     | Schema validation         |

## 🔌 Integrated API

### NASA POWER API

- **Endpoint**: `https://power.larc.nasa.gov/api/temporal/climatology`
- **Data**: Global horizontal solar irradiance (ALLSKY_SFC_SW_DWN)
- **History**: 40 years of climate data
- **Precision**: 0.5° x 0.5° latitude/longitude resolution

```typescript
// Integration example
const monthlyData = await fetchIrradianceClimatology(-15.7797, -47.9297);
// Returns: [4.2, 4.1, 3.8, 3.5, ..., 4.3] kWh/m²/day
```

## 📊 Result Examples

### Scenario: Residence in Brasília

- **Consumption**: 300 kWh/month
- **Autonomy**: 3 days
- **Panel**: 550W
- **Battery**: 48V LiFePO4

**Results**:

- 📊 **3-4 panels** of 550W
- 🔋 **12-15 kWh** total capacity
- 📦 **12-15 units** of 100Ah

## 🐛 Error Handling

The application provides clear error messages:

- ❌ "Please fetch solar radiation first" - Execute the API before calculating
- ❌ "Error fetching radiation data" - Check connectivity with NASA POWER API
- ❌ "Error during calculation" - Check the entered values

## 🌍 Supported Environments

- ✅ Windows, macOS, Linux
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile devices (responsive)

## 📝 License

This project is licensed under the **MIT License**. See the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/MyFeature`)
3. Commit your changes (`git commit -m 'Add MyFeature'`)
4. Push to the branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

## 📞 Contact and Support

- **Developer**: Jeferson
- **GitHub**: [@Jeferson5641](https://github.com/Jeferson5641)
- **Issues**: [GitHub Issues](https://github.com/Jeferson5641/off-grid-system/issues)

## 🚦 Project Status

- ✅ Basic calculations implemented
- ✅ NASA POWER API integration
- ✅ Responsive interface
- 🔄 Ongoing development and improvements

## 📦 Current Version

`v0.1.0` - Alpha (Development version)

---

**Made with ☀️ and ⚡ for off-grid solar systems**
