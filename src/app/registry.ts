import { Cpu, Layers, CircuitBoard, FileBox, Terminal } from 'lucide-react';
import React from 'react';

export const SYSTEM_CONFIG = {
  name: "Probal.",
  tagline: "EE Student @ BCREC // Engineering physical systems with digital precision.",
  currentFocus: "Exploring 3D Modeling & PCB Designing",
  // Once you have your photo, change this to "/your-photo.jpg"
  profileImage: "https://wallpapers.com/images/hd/default-pfp-face-izpao33go55ztvn9.jpg",
  email: "probalkhanra2006@email.com",
  github: "https://github.com/Probal-Khanra",
  linkedin: "https://www.linkedin.com/in/probal-khanra"
};

export const PROJECTS = [
  { 
    title: "Autonomous Mesh Node", 
    tech: "ESP32 / PCB Design",
    repo: "https://github.com/probal-khanra/mesh-node",
    manifest: ["ESP32-S3", "SX1276 LoRa", "BME280"]
  },
  { 
    title: "Robotic Gripper", 
    tech: "3D Modeling / Python",
    repo: "https://github.com/probal-khanra/gripper",
    manifest: ["MG996R Servos", "PCA9685", "Python SDK"]
  },
  { 
    title: "Lab Power Monitor", 
    tech: "Next.js / IoT",
    repo: "https://github.com/probal-khanra/power-monitor",
    manifest: ["ACS712 Sensor", "ESP32", "MQTT Broker"]
  }
];

export const CORE_SKILLS = [
  { name: "ESP32 Ecosystem", icon: React.createElement(Cpu, { size: 14 }) },
  { name: "3D Printing", icon: React.createElement(Layers, { size: 14 }) },
  { name: "PCB Design", icon: React.createElement(CircuitBoard, { size: 14 }) },
  { name: "3D Modeling", icon: React.createElement(FileBox, { size: 14 }) },
  { name: "Python", icon: React.createElement(Terminal, { size: 14 }) }
];