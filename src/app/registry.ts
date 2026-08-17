export const SYSTEM_CONFIG = {
  name: "Probal",
  location: "Durgapur, WB",
  tagline: "Electrical Engineering student at BCREC. Designing embedded systems, custom PCBs, and 3D hardware.",
  currentFocus: "3D CAD Modeling & PCB Design",
  profileImage: "/profile.png",
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
  manifest: string[];
  description: string;
  architecture: string;
  bom: { component: string; spec: string; qty: number; reason: string }[];
  pinouts: { pin: string; target: string; bus: string }[];
  status: string;
}

export const PROJECTS: ProjectItem[] = [
  { 
    id: "mesh-node",
    title: "Autonomous Mesh Node", 
    tech: "ESP32 / PCB Design",
    repo: "https://github.com/probal-khanra/mesh-node",
    manifest: ["ESP32-S3", "SX1276 LoRa", "BME280"],
    status: "Prototype Stage",
    description: "Low-power decentralized Mesh node capable of multi-hop telemetry transmission across remote field environments without cellular coverage.",
    architecture: "Dual-core Xtensa LX7 MCU driving a SPI-interfaced LoRa RF transceiver operating at 915MHz with adaptive data rate (ADR) and AES-128 payload encryption.",
    bom: [
      { component: "ESP32-S3 Microcontroller", spec: "ESP32-S3-WROOM-1 (N8R8)", qty: 1, reason: "Handles mesh node routing logic and encryption processing." },
      { component: "SX1276 LoRa Module (915MHz)", spec: "SX1276 LoRa Transceiver", qty: 1, reason: "Enables long-range low-power RF telemetry up to 10+ km." },
      { component: "BME280 Sensor", spec: "Temperature/Humidity/Barometric", qty: 1, reason: "Samples environmental climate parameters for telemetry data." },
      { component: "TP4056 + DW01A PMIC", spec: "LiPo Charger & Overdischarge Shield", qty: 1, reason: "Manages solar battery charging and voltage protection." }
    ],
    pinouts: [
      { pin: "GPIO 10", target: "SX1276 NSS", bus: "SPI" },
      { pin: "GPIO 11", target: "SX1276 MOSI", bus: "SPI" },
      { pin: "GPIO 12", target: "SX1276 MISO", bus: "SPI" },
      { pin: "GPIO 13", target: "SX1276 SCK", bus: "SPI" },
      { pin: "GPIO 41", target: "BME280 SDA", bus: "I2C" },
      { pin: "GPIO 42", target: "BME280 SCL", bus: "I2C" }
    ]
  },
  { 
    id: "robotic-gripper",
    title: "Robotic Gripper", 
    tech: "3D Modeling / Python",
    repo: "https://github.com/probal-khanra/gripper",
    manifest: ["MG996R Servos", "PCA9685", "Python SDK"],
    status: "Fabricated",
    description: "Parametric 3-DOF robotic manipulator featuring compliance control, custom CAD-modeled linkages, and serial servo control via Python.",
    architecture: "Custom Fusion 360 parametric CAD assembly optimized for 3D printing. Driven via I2C-controlled 16-channel PCA9685 PWM controller coupled with high-torque servos.",
    bom: [
      { component: "TowerPro MG996R Servos", spec: "High-Torque Metal Gear Servo", qty: 3, reason: "Provides metallic gear force for heavy end-effector actuation." },
      { component: "PCA9685 PWM Driver", spec: "16-Channel 12-bit I2C Controller", qty: 1, reason: "Offloads precise servo PWM timing signal orchestration from MCU." },
      { component: "PETG 3D Printed Frame", spec: "Fusion 360 Parametric Assembly", qty: 1, reason: "Custom lightweight heat-resistant structural linkages." },
      { component: "5V 5A DC-DC Buck Converter", spec: "Step-Down Regulator", qty: 1, reason: "Delivers stable high-current DC power to prevent brownouts." }
    ],
    pinouts: [
      { pin: "SDA (GPIO 21)", target: "PCA9685 SDA", bus: "I2C" },
      { pin: "SCL (GPIO 22)", target: "PCA9685 SCL", bus: "I2C" },
      { pin: "PWM 0", target: "Base Rotation Servo", bus: "PWM" },
      { pin: "PWM 1", target: "Arm Elevation Servo", bus: "PWM" },
      { pin: "PWM 2", target: "Gripper Actuator Servo", bus: "PWM" }
    ]
  },
  { 
    id: "power-monitor",
    title: "Lab Power Monitor", 
    tech: "Next.js / IoT",
    repo: "https://github.com/probal-khanra/power-monitor",
    manifest: ["ACS712 Sensor", "ESP32", "MQTT"],
    status: "Completed",
    description: "Real-time electrical power telemetry system tracking AC current consumption, active power, RMS voltage drift, and harmonic disturbance in workshop setups.",
    architecture: "Hall-effect ACS712 current sensing coupled with precision OP-AMP signal conditioning, sampled via ESP32 ADC, calibrated with RMS algorithms, and streamed over MQTT.",
    bom: [
      { component: "ACS712 Current Sensor", spec: "20A Hall-Effect Module", qty: 1, reason: "Measures non-invasive AC load current via magnetic field." },
      { component: "ZMPT101B Voltage Transformer", spec: "AC Active Phase Transformer", qty: 1, reason: "Steps down high AC voltage safely for MCU ADC sampling." },
      { component: "ESP32-WROOM MCU", spec: "Dual-Core Xtensa 240MHz", qty: 1, reason: "Calculates real-time RMS calculations and streams over MQTT." },
      { component: "OLED SSD1306 Display", spec: "0.96 inch I2C Display", qty: 1, reason: "Renders live voltage and wattage figures on physical box." }
    ],
    pinouts: [
      { pin: "GPIO 34 (ADC1_CH6)", target: "ACS712 VOUT", bus: "Analog In" },
      { pin: "GPIO 35 (ADC1_CH7)", target: "ZMPT101B VOUT", bus: "Analog In" },
      { pin: "GPIO 21", target: "OLED SSD1306 SDA", bus: "I2C" },
      { pin: "GPIO 22", target: "OLED SSD1306 SCL", bus: "I2C" }
    ]
  }
];

export const CORE_SKILLS = [
  { name: "ESP32 & Embedded C++", category: "Microcontrollers" },
  { name: "KiCad & EasyEDA", category: "PCB Design" },
  { name: "Fusion 360", category: "3D CAD Modeling" },
  { name: "3D Printing & Enclosures", category: "Rapid Prototyping" },
  { name: "Python & IoT Protocols", category: "Firmware & Cloud" }
];

export const EDUCATION_TIMELINE = [
  {
    id: "bcrec",
    degree: "B.Tech — Electrical Engineering",
    institution: "BCREC (Dr. B.C. Roy Engineering College)",
    year: "2024 — 2028",
    status: "3rd Year (Ongoing)",
    highlights: [
      "Embedded Systems & Microcontrollers",
      "Circuit Analysis & Network Theory",
      "Power Electronics & Machines",
      "Digital Signal Processing"
    ]
  },
  {
    id: "self-taught",
    degree: "Self-Taught — Hardware & Embedded",
    institution: "Online / Project-Based Learning",
    year: "2022 — Present",
    status: "Active",
    highlights: [
      "ESP32 & STM32 Firmware Development",
      "Custom PCB Design (KiCad & EasyEDA)",
      "3D CAD Modeling (Fusion 360)",
      "IoT Protocol Stack (MQTT, LoRa, BLE)"
    ]
  }
];

export const WORKBENCH_TOOLS = [
  { name: "Soldering Iron", desc: "Through-hole & SMD rework" },
  { name: "Digital Multimeter", desc: "Voltage, current & continuity testing" },
  { name: "Lab Power Supply", desc: "Regulated DC bench power" },
  { name: "Breadboards & Jumpers", desc: "Rapid circuit prototyping" },
  { name: "Wire Strippers", desc: "Precision wire prep & cutting" },
  { name: "Hot Glue Gun", desc: "Enclosure assembly & component securing" }
];

export const SOFTWARE_STACK = [
  { name: "Vercel", category: "Cloud Hosting", desc: "Next.js & Frontend CD/CI deployments" },
  { name: "Netlify", category: "Cloud Hosting", desc: "Static site hosting & serverless functions" },
  { name: "Firebase", category: "Backend / Database", desc: "Firestore, Realtime DB & Auth services" },
  { name: "Affinity Suite", category: "Design & Vector", desc: "Affinity Designer & Photo for visual design" },
  { name: "Canva", category: "Graphics", desc: "Rapid UI mockups & graphic asset creation" }
];

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  skills: string[];
  linkedinUrl: string;
}

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-pcb-aict",
    title: "Workshop on PCB & Circuit Design",
    issuer: "AICT Pvt. Ltd.",
    issued: "Feb 2026",
    credentialId: "061",
    skills: ["PCB Design", "EasyEDA", "Schematics"],
    linkedinUrl: "https://www.linkedin.com/in/probal-khanra/details/certifications/"
  },
  {
    id: "cert-cdac-3d",
    title: "3D Printing & Additive Manufacturing Technology",
    issuer: "C-DAC (Centre for Development of Advanced Computing)",
    issued: "Mar 2026",
    credentialId: "C-DAC(K)/2026/TRG/160H/OF/WB(05)/3DAM/0150",
    skills: ["3D Printing", "Additive Manufacturing", "Prototyping"],
    linkedinUrl: "https://www.linkedin.com/in/probal-khanra/details/certifications/"
  },
  {
    id: "cert-udemy-esp32",
    title: "MicroPython with the ESP32",
    issuer: "Udemy",
    issued: "Dec 2025",
    credentialId: "UC-a55dee90-c359-4572-a33e-d609c809cc4c",
    skills: ["ESP32 Microcontrollers", "MicroPython"],
    linkedinUrl: "https://www.linkedin.com/in/probal-khanra/details/certifications/"
  }
];