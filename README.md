Proyecto enseñanza react SysCafe

# React + TypeScript + Vite
npm create vite@latest pokeParty --template react-ts

npm install -D tailwindcss@3
npx tailwindcss init


# tailwind.config.js

 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js}"],
   theme: {
     extend: {},
   },
   plugins: [],
}

# index.css / app.css

@tailwind base;
@tailwind components;
@tailwind utilities;


# Heroui
npm install @heroui/react framer-motion



//En el archivo tailwind.config.js
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};




//En el root
import * as React from "react";

import {HeroUIProvider} from "@heroui/react";

function App() {
  // 2. Wrap HeroUIProvider at the root of your app
  return (
    <HeroUIProvider>
      <YourApplication />
    </HeroUIProvider>
  );
}
