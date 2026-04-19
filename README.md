# FitApp

FitApp es una aplicación web progresiva (PWA) orientada a la gestión y seguimiento de rutinas de fitness. Está diseñada con una interfaz moderna de estilo brutalista y una experiencia de usuario (UX) fluida, adaptable tanto para navegadores de escritorio como para dispositivos móviles.

---

## Características Principales

* **Diseño Brutalista Moderno:** Interfaz de usuario con alto contraste, tipografía audaz, bordes gruesos y sombras sólidas que garantizan una navegación intuitiva y clara.
* **Progresive Web App (PWA):** Estructurada e indexada para poder instalarse directamente en el escritorio del teléfono móvil o PC como si se tratara de una aplicación nativa.
* **Onboarding Dinámico:** Flujo interactivo que configura la experiencia del usuario detectando su nivel, disponibilidad de equipo y objetivos personales.
* **Animaciones de Alto Nivel:** Transiciones suaves de vistas, interacciones de tarjetas, y _micro-interacciones_ integradas mediante herramientas profesionales de animación de estado.
* **Seguimiento y Dashboard:** Visualización integrada basada en componentes gráficos dinámicos para rastrear el progreso semanal y minutos dedicados al entrenamiento.
* **Gestor de Estado Persistente:** Los datos y preferencias del usuario (así como la sesión) se mantienen guardados localmente, de modo que al recargar la app se mantiene la experiencia ininterrumpida.

## Stack Tecnológico (Frontend)

* **[React 19](https://react.dev/)** + **[Vite](https://vitejs.dev/)**: Framework modular ultra-rápido para la creación de la interfaz.
* **[Tailwind CSS v4](https://tailwindcss.com/)**: Motor de estilos por utilidad para lograr los estilos brutalistas escalables y adaptables al dispositivo.
* **[React Router DOM](https://reactrouter.com/)**: Manejo y ruteo estructural de pantallas sin refrescos en navegador (Single Page Application - SPA).
* **[Zustand](https://zustand-demo.pmnd.rs/)**: Manejador de estados liviano e integrado para persistencia de la sesión y perfil local.
* **[Motion (Framer Motion)](https://motion.dev/)**: Librería para animaciones lógicas compartidas y gestión de frames 60FPS en interacciones complejas de UI.
* **[Recharts](https://recharts.org/)**: Motor de gráficas de alto rendimiento orientado a React para el componente historial y progresos.
* **[Lucide Icons](https://lucide.dev/)**: Conjunto iconográfico.

## Estructura del Proyecto

```text
/
├── public/                 # Archivos estáticos y manifest de la PWA
│   └── manifest.json       # Manifiesto para instalabilidad móvil
├── src/
│   ├── components/         # Componentes aislados (BottomNav, UI primitives)
│   │   └── ui/             # Elementos base de UI (Botones, Tarjetas, Inputs)
│   ├── layouts/            # Contenedores maestro de las pantallas (AppLayout)
│   ├── pages/              # Pantallas core (Dashboard, Login, Perfil, Onboarding...)
│   ├── lib/                # Funciones auxiliares (mixers de Tailwind classes)
│   ├── store.ts            # Store principal de variables con Zustand
│   ├── App.tsx             # Registrador de Vistas (React Router)
│   ├── main.tsx            # Punto de montaje principal de React
│   └── index.css           # Carga global de Tailwind
└── vite.config.ts          # Configuración del empaquetador del entorno
```

## Instalación y Configuración para Desarrollo

1. Clona este proyecto en tu entorno local.
2. Asegúrate de tener instalado **Node.js**:
   ```bash
   node -v
   ```
3. Instala todas las dependencias del proyecto ejecutando:
   ```bash
   npm install
   ```
4. Levanta el servidor de desarrollo en caliente:
   ```bash
   npm run dev
   ```
5. Abre el puerto expuesto en tu navegador (por defecto `http://localhost:3000` o `http://localhost:5173` dependiendo de la configuración de Vite).

## Compilación para Producción

Para compilar un paquete optimizado y comprimido listo para ser servido en la web:

```bash
npm run build
```

El código pasará por transpilación y minificación; el resultado final auto-contenido estará preparado y alojado en la nueva carpeta `./dist/`. Este directorio estará listo para subirse estáticamente a cualquier plataforma (Vercel, Firebase Hosting, Netlify, NGINX, etc.).
