# ☀️ Calculadora de Sistemas Solares Off-Grid

**🌍 Elige tu idioma:**

[![PT-BR](https://img.shields.io/badge/Português-blue?style=for-the-badge)](./README.pt-BR.md)
[![EN-US](https://img.shields.io/badge/English-green?style=for-the-badge)](./README.en-US.md)
[![ES](https://img.shields.io/badge/Español-red?style=for-the-badge)](./README.es.md)

---

Una aplicación web moderna para **dimensionar sistemas fotovoltaicos off-grid** (aislados de la red eléctrica). Calcula automáticamente la cantidad de paneles solares, baterías y otros componentes necesarios para sistemas de energía renovable autosuficientes.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B6FF?style=flat-square&logo=tailwindcss)
![i18next](https://img.shields.io/badge/i18next-23-26A69A?style=flat-square&logo=i18next)

## 📋 Descripción General

**Off-Grid System Calculator** es una herramienta esencial para ingenieros, instaladores y entusiastas de energía renovable. La aplicación integra datos climáticos reales de la **API NASA POWER** para calcular el potencial solar de cualquier ubicación geográfica y dimensionar automáticamente los componentes del sistema.

### Características Principales

✅ **Integración con API NASA POWER** - Obtiene datos climáticos reales de irradiación solar  
✅ **Cálculo Inteligente de Paneles** - Dimensiona paneles según consumo y radiación  
✅ **Dimensionamiento de Baterías** - Soporta múltiples tipos (LiFePO4, Ácido-plomo)  
✅ **Cálculo de Autonomía** - Define cuántos días funciona el sistema sin generación  
✅ **Interfaz Responsiva** - Diseño moderno con Tailwind CSS y shadcn/ui  
✅ **Física Precisa** - Aplicación de factores de degradación y pérdidas reales  
✅ **Soporte Multilingüe** - Portugués, Inglés y Español con detección automática

## 🚀 Empezar

### Requisitos Previos

- Node.js 18+
- npm o yarn
- Git

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Jeferson5641/off-grid-system.git
cd off-grid-system

# Instalar dependencias
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción

```bash
npm run build
npm start
```

## 📐 Cómo Usar

### 1️⃣ Ingresa la Ubicación

- **Latitud y Longitud** - Usa coordenadas de la ubicación del proyecto
- Por defecto: Brasília, DF (-15.7797, -47.9297)

### 2️⃣ Define el Consumo

- **Consumo Promedio Mensual (kWh)** - Calcula tu consumo mensual total

### 3️⃣ Obtén la Radiación Solar

- Haz clic en **"Obtener Radiación (NASA POWER)"** para obtener datos reales
- La aplicación consultará datos climáticos de 40 años de la NASA

### 4️⃣ Configura los Componentes

- **Potencia del Panel** - Capacidad en Vatios (típico: 400-600W)
- **Relación de Rendimiento** - Factor de pérdidas (~0.75 o 75%)
- **Días de Autonomía** - Cuántos días sin sol puede funcionar el sistema
- **Voltaje del Banco** - Elige: 12V, 24V o 48V

### 5️⃣ Elige el Tipo de Batería

Opciones disponibles:

- **LiFePO4** - Ciclos largos, alto rendimiento (80% DoD, 95% eficiencia)
- **Ácido-plomo (Estacionaria)** - Relación costo-beneficio (60% DoD, 85% eficiencia)
- **Ácido-plomo (Automotriz)** - Bajo costo, ciclos cortos (30% DoD, 80% eficiencia)

### 6️⃣ Obtén los Resultados

Consigue:

- 📊 Cantidad de paneles necesarios
- 🔋 Capacidad total de batería en kWh y Ah
- 📦 Cantidad de unidades de batería

## 🔧 Estructura del Proyecto

```
off-grid-system/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Diseño principal
│   │   ├── page.tsx            # Página de inicio
│   │   └── globals.css         # Estilos globales
│   ├── (page)/
│   │   ├── solarpage/
│   │   │   └── page.tsx        # Componente principal de la calculadora
│   │   └── calc/
│   │       └── calc.tsx        # Lógica de cálculos e integración de API
│   ├── components/
│   │   ├── LanguageSwitcher.tsx   # Selector de idioma
│   │   ├── I18nProvider.tsx       # Proveedor de internacionalización
│   │   └── ui/                    # Componentes shadcn/ui
│   ├── i18n/
│   │   ├── config.ts              # Configuración de i18next
│   │   └── locales/               # Archivos de traducción
│   │       ├── pt.json
│   │       ├── en.json
│   │       └── es.json
│   └── lib/
│       └── utils.ts            # Utilidades generales
├── public/                     # Archivos estáticos
├── docs/                       # Documentación en múltiples idiomas
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts
```

## 📚 Algoritmo de Cálculo

### 1. Irradiación Solar (HSP - Horas de Sol Pico)

$$\text{HSP Promedio} = \frac{\sum \text{Irradiación Mensual}}{12}$$

### 2. Consumo Diario con Pérdidas

$$\text{Consumo Diario} = \frac{\text{Consumo Mensual}}{30}$$
$$\text{Consumo con Pérdidas} = \text{Consumo Diario} \times 1.20$$

### 3. Dimensionamiento de Paneles

$$\text{Producción del Panel} = \text{Potencia} \times \text{HSP} \times \text{Relación de Rendimiento}$$
$$\text{Paneles Necesarios} = \lceil \frac{\text{Consumo con Pérdidas}}{\text{Producción del Panel}} \rceil$$

### 4. Dimensionamiento de Baterías

$$\text{Energía Necesaria} = \text{Consumo con Pérdidas} \times \text{Días de Autonomía}$$
$$\text{Capacidad Nominal} = \frac{\text{Energía Necesaria}}{\text{DoD} \times \text{Eficiencia}}$$
$$\text{Capacidad Ah} = \frac{\text{Capacidad Nominal} \times 1000}{\text{Voltaje del Banco}}$$
$$\text{Unidades Necesarias} = \lceil \frac{\text{Capacidad Ah}}{\text{Capacidad Unitaria}} \rceil$$

## 🛠 Tecnologías Utilizadas

| Tecnología      | Versión | Propósito                     |
| --------------- | ------- | ----------------------------- |
| Next.js         | 16.0    | Framework React fullstack     |
| React           | 19.2    | Biblioteca de UI              |
| TypeScript      | 5       | Tipado estático               |
| Tailwind CSS    | 4.1     | Estilización utilitaria       |
| shadcn/ui       | -       | Componentes accesibles        |
| i18next         | 23      | Internacionalización          |
| react-i18next   | 14      | Integración React con i18next |
| React Hook Form | 7.66    | Gestión de formularios        |
| Zod             | 4.1     | Validación de esquemas        |

## 🔌 API Integrada

### API NASA POWER

- **Endpoint**: `https://power.larc.nasa.gov/api/temporal/climatology`
- **Datos**: Irradiación solar horizontal global (ALLSKY_SFC_SW_DWN)
- **Historial**: 40 años de datos climáticos
- **Precisión**: Resolución de 0.5° x 0.5° de latitud/longitud

```typescript
// Ejemplo de integración
const monthlyData = await fetchIrradianceClimatology(-15.7797, -47.9297);
// Devuelve: [4.2, 4.1, 3.8, 3.5, ..., 4.3] kWh/m²/día
```

## 🌐 Soporte Multilingüe

La aplicación detecta automáticamente el idioma del navegador y muestra la interfaz en el idioma apropiado:

- **🇧🇷 Portugués** - Brasil y Portugal
- **🇺🇸 Inglés** - USA y UK
- **🇪🇸 Español** - España y América Latina

Puedes cambiar el idioma manualmente usando el selector en la esquina superior derecha con banderas de países.

### Traducción Dinámica

Todas las cadenas de interfaz se han traducido usando **i18next** con detección automática de idioma:

- Localización automática basada en `navigator.language`
- Cambio de idioma en tiempo real sin recargar la página
- Soporte para 30+ claves de traducción
- Organización clara de claves por sección

## 📊 Ejemplos de Resultados

### Escenario: Residencia en Brasília

- **Consumo**: 300 kWh/mes
- **Autonomía**: 3 días
- **Panel**: 550W
- **Batería**: 48V LiFePO4

**Resultados**:

- 📊 **3-4 paneles** de 550W
- 🔋 **12-15 kWh** de capacidad total
- 📦 **12-15 unidades** de 100Ah

## 🐛 Manejo de Errores

La aplicación proporciona mensajes de error claros:

- ❌ "Por favor, obtén la radiación solar primero" - Ejecuta la API antes de calcular
- ❌ "Error al obtener datos de radiación" - Verifica la conectividad con la API de NASA POWER
- ❌ "Error en el cálculo" - Verifica los valores ingresados

## 🌍 Entornos Soportados

- ✅ Windows, macOS, Linux
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles (responsivo)

## 📝 Licencia

Este proyecto está bajo licencia **MIT**. Ver el archivo LICENSE para detalles.

## 🤝 Contribuyendo

¡Las contribuciones son bienvenidas! Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/MiCaracterística`)
3. Commit tus cambios (`git commit -m 'Agrega MiCaracterística'`)
4. Push a la rama (`git push origin feature/MiCaracterística`)
5. Abre un Pull Request

## 📞 Contacto y Soporte

- **Desarrollador**: Jeferson
- **GitHub**: [@Jeferson5641](https://github.com/Jeferson5641)
- **Issues**: [GitHub Issues](https://github.com/Jeferson5641/off-grid-system/issues)

## 🚦 Estado del Proyecto

- ✅ Cálculos básicos implementados
- ✅ Integración con API NASA POWER
- ✅ Interfaz responsiva
- ✅ Soporte multilingüe (PT/EN/ES)
- 🔄 En desarrollo con mejoras continuas

## 📦 Versión Actual

`v0.2.0` - Beta (Soporte multilingüe agregado)

---

Hecho con ☀️ y ⚡ para sistemas solares off-grid
