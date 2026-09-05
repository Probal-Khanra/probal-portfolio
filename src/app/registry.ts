export const SYSTEM_CONFIG = {
  name: "Probal Khanra",
  shortName: "Probal",
  location: "Durgapur, West Bengal",
  college: "Dr. B. C. Roy Engineering College",
  tagline: "Electrical Engineering student designing embedded systems, custom PCBs, and functional 3D hardware.",
  bio: "I'm a 3rd-year Electrical Engineering student at BCREC. I enjoy working at the intersection of circuits and code: routing custom PCBs in KiCad, writing firmware for ESP32 and microcontrollers, and 3D printing functional enclosures to turn ideas into tangible hardware.",
  currentFocus: "3D CAD Modeling & PCB Design",
  profileImage: "/profile.jpg",
  resumeUrl: "/resume.pdf",
  email: "probalkhanra2006@email.com",
  github: "https://github.com/Probal-Khanra",
  linkedin: "https://www.linkedin.com/in/probal-khanra"
};

export interface ProjectItem {
  id: string;
  title: string;
  tech: string;
  repo: string;
  liveUrl?: string;
  manifest: string[];
  description: string;
  highlights?: string[];
  role?: string;
  icon?: string;
  architecture: string;
  bom: { component: string; spec: string; qty: number; reason: string }[];
  pinouts: { pin: string; target: string; bus: string }[];
  status: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "diyledsign-sparkcontrol",
    title: "Diy Led Sign Spark Control",
    tech: "ESP-NOW · FastLED · FreeRTOS · CIE 1931 · C/C++",
    repo: "https://github.com/Probal-Khanra/diyledsign-sparkcontrol",
    manifest: ["2x ESP32 Dev Modules", "8-LED WS2812B NeoPixel Ring", "0.91\" I2C SSD1306 OLED", "6x Tactile Buttons", "8x12cm Perfboard", "ESP-NOW", "FastLED", "FreeRTOS"],
    status: "Completed",
    icon: "zap",
    description: "Sub-5ms wireless LED signage and custom handheld remote system built with dual ESP32s over connectionless ESP-NOW, featuring non-linear CIE 1931 lightness dimming and an SSD1306 OLED telemetry display.",
    highlights: [
      "Zero-Lag ESP-NOW: Sub-5ms wireless communication using a 6-byte packed state struct for router-free remote control.",
      "Perceptual CIE 1931 Dimming: Non-linear lightness curve matching human vision, cutting power draw by 78.5%.",
      "Thermal & RF Tuning: Downclocked ESP32 to 80 MHz and capped RF power at 8.5 dBm to eliminate heat in enclosed chassis.",
      "Point-to-Point Soldered Remote: Hand-soldered perfboard prototype with 6 tactile buttons and an SSD1306 OLED telemetry display."
    ],
    architecture: "Distributed wireless architecture utilizing connectionless ESP-NOW protocol for sub-5ms peer-to-peer RF communication between the handheld remote transmitter and signage receiver. The transmitter samples a debounced 6-button matrix, renders system status and lighting modes on an SSD1306 OLED via I2C, and broadcasts a 6-byte packed state struct. The receiver listens continuously, maps brightness through cubic CIE 1931 lightness transfer functions to match human visual perception, and drives the WS2812B RGB NeoPixel ring via FastLED without Wi-Fi router dependency.",
    bom: [
      { component: "ESP32 Dev Module (Transmitter)", spec: "Handheld Remote MCU (ESP-NOW Broadcast, 80MHz CPU)", qty: 1, reason: "Handles 6-button debouncing, I2C OLED display rendering, and power-optimized RF packet transmission." },
      { component: "ESP32 Dev Module (Receiver)", spec: "LED Controller Node (ESP-NOW Listen, FastLED Pipeline)", qty: 1, reason: "Decodes 6-byte packed state payloads and runs non-blocking lighting animation loops." },
      { component: "WS2812B NeoPixel Ring", spec: "8-LED Addressable RGB Ring (5V Logic)", qty: 1, reason: "Delivers 9 dynamic lighting effects including candle flicker, breathing pulse, strobe, and rainbow." },
      { component: "0.91\" I2C OLED Display", spec: "128x32 Monochrome SSD1306 (I2C Bus)", qty: 1, reason: "Provides handheld real-time telemetry, mode indicator, and brightness feedback." },
      { component: "Tactile Button Matrix", spec: "6x Momentary Push Buttons (Hardware Pull-Ups)", qty: 6, reason: "Dedicated physical inputs for mode cycling, brightness stepping, and toggle controls." },
      { component: "High-Density Perfboard", spec: "8x12cm Double-Sided Prototyping Board", qty: 1, reason: "Point-to-point soldered durable chassis layout with mechanical strain relief." }
    ],
    pinouts: [
      { pin: "GPIO 21 (SDA)", target: "0.91\" SSD1306 OLED SDA", bus: "I2C" },
      { pin: "GPIO 22 (SCL)", target: "0.91\" SSD1306 OLED SCL", bus: "I2C" },
      { pin: "GPIO 18 (Data Out)", target: "WS2812B NeoPixel DIN", bus: "Single-Wire FastLED" },
      { pin: "GPIO 25, 26, 27, 32, 33, 34", target: "6x Tactile Push Buttons", bus: "Digital Input (Pull-Up)" },
      { pin: "2.4GHz RF (Channel 1)", target: "ESP-NOW Peer MAC Broadcast", bus: "Connectionless RF" }
    ]
  },
  {
    id: "smart-air-quality",
    title: "Smart Air Quality Monitoring Unit",
    tech: "ESP32 · React & TypeScript · KiCad · IoT",
    repo: "https://github.com/Probal-Khanra/SmartAirQualityMonitoringUnit",
    liveUrl: "https://aerosenseaqm.netlify.app/",
    manifest: ["ESP32", "PMS5003", "MQ-2", "MQ-7", "AHT20B", "IP5306", "Firebase", "Google Sheets"],
    status: "Completed",
    description: "A portable, battery-powered ambient air monitor built with an ESP32. It measures airborne particulates (PM1.0, PM2.5, PM10), carbon monoxide, combustible gases, and climate conditions, streaming live readings to a real-time web dashboard.",
    highlights: [
      "Multi-Sensor Acquisition: Samples laser particulate matter (PM1.0/2.5/10) via UART and gas levels (MQ-2/MQ-7) via calibrated ADC.",
      "Cloud & Local Telemetry: Streams real-time JSON packets to Firebase every 30s and logs datasets to Google Sheets.",
      "Dual Visualization: Renders environmental metrics on an on-device I2C 16x2 LCD and a responsive React web dashboard.",
      "Portable Power: Integrated IP5306 power SoC with 18650 Li-ion cell management for standalone field deployment."
    ],
    architecture: "The ESP32 runs non-blocking firmware sampling the PMS5003 laser sensor over UART, gas sensors via calibrated analog ADC channels, and climate metrics over I2C. Telemetry is transmitted over Wi-Fi to Firebase Realtime DB every 30 seconds, and a serverless Google Apps Script logs 5-minute historical records to Google Sheets. The unit operates portably via an internal 18650 Li-ion cell managed by an IP5306 power SoC.",
    bom: [
      { component: "ESP32 Microcontroller", spec: "32-bit Dual-Core MCU (Wi-Fi, Hardware UART, I2C, ADC)", qty: 1, reason: "Handles multi-tasking sensor polling, 16x2 LCD rendering, and Wi-Fi JSON telemetry transmission." },
      { component: "PMS5003 Dust Sensor", spec: "Laser Scattering Particle Counter (UART Serial)", qty: 1, reason: "Measures PM1.0, PM2.5, and PM10 airborne particulate concentration." },
      { component: "MQ-2 Gas Sensor", spec: "Metal-Oxide Semiconductor (Analog ADC)", qty: 1, reason: "Detects LPG, propane, and combustible smoke levels." },
      { component: "MQ-7 Gas Sensor", spec: "Electrochemical MOS Sensor (Analog ADC)", qty: 1, reason: "Dedicated precision monitoring for Carbon Monoxide (CO) concentration." },
      { component: "AHT20B Climate Sensor", spec: "Digital Temp & Humidity (I2C Bus)", qty: 1, reason: "High-precision ambient temperature (°C) and relative humidity (%RH) measurements." },
      { component: "16x2 Character LCD", spec: "HD44780 Display (I2C Interface)", qty: 1, reason: "Provides on-device real-time visual parameter rendering." },
      { component: "IP5306 Power SoC", spec: "5V/2A Boost & Li-ion Battery Management", qty: 1, reason: "Integrates 18650 cell charging and 5V boost conversion on a single IC, eliminating external MT3608 modules and enabling pass-through USB power." },
      { component: "18650 Li-Ion Cell", spec: "3.7V Rechargeable Battery", qty: 1, reason: "Provides high-capacity portable power for field deployment." }
    ],
    pinouts: [
      { pin: "UART RX/TX (GPIO 16/17)", target: "PMS5003 Serial Data", bus: "UART" },
      { pin: "GPIO 34 (ADC1_CH6)", target: "MQ-2 Gas Sensor VOUT", bus: "Analog In" },
      { pin: "GPIO 35 (ADC1_CH7)", target: "MQ-7 CO Sensor VOUT", bus: "Analog In" },
      { pin: "GPIO 21 (SDA)", target: "AHT20B & LCD SDA", bus: "I2C" },
      { pin: "GPIO 22 (SCL)", target: "AHT20B & LCD SCL", bus: "I2C" }
    ]
  },
];

export const CORE_SKILLS = [
  { skill: "PCB Design", software: "KiCad & EasyEDA", name: "PCB Design", category: "KiCad & EasyEDA", icon: "layers" },
  { skill: "3D CAD Modeling", software: "Fusion 360", name: "3D CAD Modeling", category: "Fusion 360", icon: "box" },
  { skill: "Embedded Systems", software: "ESP32 & Embedded C++", name: "Embedded Systems", category: "ESP32 & C++", icon: "cpu" },
  { skill: "Rapid Prototyping", software: "3D Printing & Enclosures", name: "Rapid Prototyping", category: "3D Printing", icon: "printer" },
  { skill: "IoT & Telemetry", software: "Python & IoT Protocols", name: "IoT & Telemetry", category: "Python & MQTT", icon: "terminal" }
];

export const EDUCATION_TIMELINE = [
  {
    id: "bcrec",
    degree: "B.Tech — Electrical Engineering",
    institution: "BCREC (Dr. B.C. Roy Engineering College), Durgapur",
    year: "2024 — 2028",
    status: "Ongoing",
    highlights: [
      "Embedded Systems & Microcontrollers",
      "Circuit Analysis & Network Theory",
      "Power Electronics & Machines",
      "Sensor Interfacing & Digital Logic"
    ]
  },
  {
    id: "hs-automobile",
    degree: "Higher Secondary (10+2) — Vocational Stream (Automobile)",
    institution: "Anandanagar A. C. Roy High School, Singur, Hooghly, WB",
    year: "2022 — 2024",
    status: "Completed",
    highlights: [
      "Automobile Systems & Mechanics",
      "Applied Engineering & Workshop Technology",
      "Vehicle Electricals & Diagnostics",
      "Technical Drawing & CAD"
    ]
  },
  {
    id: "secondary",
    degree: "Secondary Education (10th Standard)",
    institution: "Anandanagar A. C. Roy High School, Singur, Hooghly, WB",
    year: "2020 — 2022",
    status: "Completed",
    highlights: [
      "Physical Science & Mechanics",
      "Mathematics & Geometry",
      "General Science & Engineering Fundamentals"
    ]
  }
];

export const WORKBENCH_TOOLS = [
  { name: "Soldering Iron", desc: "Precision soldering station & SMD rework", icon: "flame" },
  { name: "Digital Multimeter", desc: "Voltage, current & continuity testing", icon: "activity" },
  { name: "DIY Power Supply", desc: "Regulated variable DC bench power", icon: "zap" }
];

export const SOFTWARE_STACK = [
  { name: "Vercel", category: "Cloud Hosting", desc: "Next.js & Frontend CD/CI deployments", icon: "cloud" },
  { name: "Firebase", category: "Backend / Database", desc: "Firestore, Realtime DB & Auth services", icon: "database" },
  { name: "Affinity Suite", category: "Design & Vector", desc: "Affinity Designer & Photo for visual design", icon: "palette" }
];

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  skills: string[];
  linkedinUrl: string;
  pdfUrl?: string;
  imageUrl?: string;
  gradeOrType?: string;
  verificationUrl?: string;
}

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-pcb-aict",
    title: "Workshop on PCB & Circuit Design",
    issuer: "AICT Pvt. Ltd.",
    issued: "Feb 2024",
    credentialId: "061",
    skills: ["PCB Design", "EasyEDA", "Schematics", "Circuit Prototyping"],
    linkedinUrl: "https://www.linkedin.com/in/probal-khanra/details/certifications/",
    gradeOrType: "Industrial Workshop Certificate",
    pdfUrl: "/certificates/pcb-design-aict.pdf",
    imageUrl: "/certificates/pcb-design-aict.jpg"
  },
  {
    id: "cert-cdac-3d",
    title: "3D Printing & Additive Manufacturing Technology",
    issuer: "C-DAC (Centre for Development of Advanced Computing)",
    issued: "Mar 2026",
    credentialId: "C-DAC(K)/2026/TRG/160H/OF/WB(05)/3DAM/0150",
    skills: ["3D Printing", "Additive Manufacturing", "Prototyping", "CAD"],
    linkedinUrl: "https://www.linkedin.com/in/probal-khanra/details/certifications/",
    gradeOrType: "Advanced Government Training (160 Hours)",
    pdfUrl: "/certificates/cdac-3d-printing.pdf",
    imageUrl: "/certificates/cdac-3d-printing.jpg"
  },
  {
    id: "cert-udemy-esp32",
    title: "MicroPython with the ESP32",
    issuer: "Udemy",
    issued: "Dec 2025",
    credentialId: "UC-a55dee90-c359-4572-a33e-d609c809cc4c",
    skills: ["ESP32 Microcontrollers", "MicroPython", "Embedded Systems", "IoT"],
    linkedinUrl: "https://www.linkedin.com/in/probal-khanra/details/certifications/",
    gradeOrType: "Technical Specialization Certificate (11 Hours)",
    pdfUrl: "/certificates/udemy-micropython-esp32.pdf",
    imageUrl: "/certificates/udemy-micropython-esp32.jpg",
    verificationUrl: "https://ude.my/UC-a55dee90-c359-4572-a33e-d609c809cc4c"
  }
];