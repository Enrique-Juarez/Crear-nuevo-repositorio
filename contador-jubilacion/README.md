# Contador de Jubilación - Electron App

## 📋 Descripción del Proyecto

Aplicación de escritorio desarrollada en Electron que muestra un contador en tiempo real hacia la fecha de jubilación. La aplicación permanece siempre visible en la esquina superior derecha del escritorio, sin interferir con el trabajo diario del usuario.

## 🎯 Funcionalidad Principal

### Características Core
- ⏰ **Contador en vivo**: Muestra días, horas, minutos y segundos restantes hasta la jubilación
- 📍 **Posición fija**: Siempre visible en esquina superior derecha del escritorio
- 👻 **Discreto**: No aparece en barra de tareas ni en Alt+Tab
- 🪟 **Ventana especializada**: Sin bordes, transparente, no redimensionable
- 🖥️ **Multi-monitor**: Se reposiciona automáticamente ante cambios de resolución/monitor

### Comportamiento Técnico
- **Ventana de escritorio**: Visible sobre el fondo pero DEBAJO de otras aplicaciones
- **No intrusivo**: Otras ventanas pueden superponerse sin problemas
- **Transparencia de fondo**: Integración visual con el escritorio
- **Actualización en tiempo real**: Cada segundo del contador
- **Persistencia**: Ante cambios de configuración de pantalla

## 🏗️ Arquitectura del Proyecto

### Principios de Diseño
1. **Separación clara de responsabilidades** entre Main y Renderer process
2. **Comunicación segura** mediante contextBridge e IPC
3. **Código modular** con funciones específicas y reutilizables
4. **Comentarios educativos** para guiar a programadores junior
5. **Clean Code** con nombres descriptivos y estructura clara

### Estructura de Directorios
```
contador-jubilacion/
├── main/                    # Proceso principal de Electron
│   ├── index.ts            # Punto de entrada y configuración de ventana
│   ├── window-manager.ts   # Gestión de posicionamiento y eventos de pantalla
│   └── preload.ts          # Script de precarga para comunicación segura
├── renderer/               # Proceso de renderizado (interfaz React + TypeScript)
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   │   └── Counter.tsx # Componente principal del contador
│   │   ├── hooks/          # Custom hooks
│   │   │   └── useCountdown.ts # Hook para lógica del contador
│   │   ├── types/          # Definiciones de tipos TypeScript
│   │   │   └── index.ts    # Tipos globales
│   │   ├── App.tsx         # Componente raíz de React
│   │   └── index.tsx       # Punto de entrada del renderer
│   ├── public/
│   │   └── index.html      # Template HTML base
│   └── styles/
│       └── global.css      # Estilos globales
├── assets/                 # Recursos estáticos
│   └── icon.png           # Icono de la aplicación
├── build/                  # Configuración de construcción
│   └── electron-builder.json
├── webpack.config.js       # Configuración de Webpack para TypeScript/React
├── tsconfig.json           # Configuración de TypeScript
├── package.json            # Configuración del proyecto y dependencias
├── package-lock.json       # Lock file de dependencias
└── README.md              # Este archivo
```

## 📋 Plan de Desarrollo - Lista de Tareas

### ✅ Tarea 1: Configuración inicial del proyecto
- [x] Crear estructura de directorios completa
- [x] Inicializar package.json con metadata del proyecto
- [x] Instalar dependencias (electron, react, typescript, webpack, etc.)
- [x] Configurar TypeScript (tsconfig.json)
- [x] Configurar Webpack para React + TypeScript
- [x] Configurar scripts de desarrollo (start, dev, build)
- [x] Crear archivo .gitignore apropiado

**Criterios de Completado**: 
- Estructura de carpetas creada
- TypeScript compilando correctamente
- React funcionando en el renderer process
- `npm start` ejecuta la aplicación
- Todas las dependencias instaladas sin errores

### 📋 Tarea 2: Arquitectura del proceso principal (Main Process)
- [x] Crear main/index.ts con configuración básica de Electron
- [x] Implementar configuración de ventana (sin bordes, transparente, nivel de escritorio)
- [x] Configurar posicionamiento automático en esquina superior derecha
- [x] Implementar main/window-manager.ts para gestión de pantallas
- [x] Manejar eventos de cambio de resolución y monitor
- [x] Crear main/preload.ts para comunicación segura con tipos
- [ ] Añadir canal IPC para futura configuración dinámica (futuro)

**Criterios de Completado**:
- Ventana aparece en esquina superior derecha
- No aparece en barra de tareas ni Alt+Tab
- **IMPORTANTE**: Otras ventanas pueden superponerse (NO alwaysOnTop)
- Se reposiciona correctamente ante cambios de pantalla

### 📋 Tarea 3: Interfaz de usuario (React + TypeScript)
- [x] Configurar React en el renderer process
- [x] Crear componente Counter.tsx con tipos TypeScript
- [x] Implementar custom hook useCountdown.ts para lógica del contador
- [x] Desarrollar estilos CSS para diseño moderno y transparente
- [x] Configurar fecha objetivo de jubilación (tipada)
- [x] Implementar actualización en tiempo real cada segundo
- [ ] Internacionalización / distintos formatos (futuro)

**Criterios de Completado**:
- Contador muestra formato: "X días, Y horas, Z minutos, W segundos"
- Componentes React funcionando correctamente
- TypeScript sin errores de tipos
- Diseño visual atractivo y legible
- Actualización fluida sin parpadeos

### 📋 Tarea 4: Comunicación entre procesos
- [ ] Configurar contextBridge en preload.js
- [ ] Implementar IPC para comunicación Main ↔ Renderer
- [ ] Manejar eventos de reposicionamiento desde Main process
- [ ] Gestionar configuración de fecha objetivo
- [ ] Implementar sistema de logs para debugging

**Criterios de Completado**:
- Comunicación segura entre procesos
- No uso directo de Node.js APIs en renderer
- Manejo correcto de eventos de ventana

### 📋 Tarea 5: Empaquetado y distribución
- [ ] Configurar electron-builder.json
- [ ] Crear script de construcción para Windows (.exe)
- [ ] Configurar iconos y metadata del instalador
- [ ] Generar instalador ejecutable
- [ ] Probar instalación y desinstalación

**Criterios de Completado**:
- Genera correctamente archivo .exe
- Instalador funciona sin errores
- Aplicación inicia correctamente post-instalación

### 📋 Tarea 6: Documentación y mejores prácticas
- [ ] Completar README con instrucciones de uso
- [ ] Documentar comandos de desarrollo y construcción
- [ ] Añadir comentarios explicativos en todo el código
- [ ] Crear sección de "Evolución Futura"
- [ ] Documentar mejores prácticas aplicadas

**Criterios de Completado**:
- README completo con instrucciones claras
- Código completamente comentado
- Sugerencias de mejoras futuras documentadas

## 🚀 Comandos Principales

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Construir para producción
npm run build

# Generar instalador Windows
npm run dist
```

## 🎯 Requisitos Técnicos Específicos

### Ventana de Electron
- **Tamaño**: Mínimo necesario para mostrar el contador
- **Posición**: Esquina superior derecha con margen de seguridad
- **Propiedades**: `frame: false`, `transparent: true`, `alwaysOnTop: false`
- **Behavior**: `skipTaskbar: true`, `focusable: false`
- **Nivel**: Nivel de escritorio (visible sobre fondo, debajo de aplicaciones)

### Contador Visual
- **Formato**: "123 días, 45 horas, 67 minutos, 89 segundos"
- **Actualización**: Cada 1000ms
- **Estilos**: Fondo semi-transparente, texto legible, esquinas redondeadas

### Fecha Objetivo
- **Configuración**: Hardcoded inicialmente (configurable en futuras versiones)
- **Formato**: Date object de JavaScript
- **Validación**: Debe ser fecha futura

## 🛠️ Stack Tecnológico Elegido

### ¿Por qué React + TypeScript?

**TypeScript sobre JavaScript**:
- ✅ **Seguridad de tipos**: Prevención de errores en tiempo de compilación
- ✅ **Mejor IntelliSense**: Autocompletado y navegación de código superior
- ✅ **Refactoring seguro**: Cambios con confianza en toda la aplicación
- ✅ **Documentación viva**: Los tipos sirven como documentación del código
- ✅ **Escalabilidad**: Mejor mantenimiento conforme crece el proyecto

**React para UI**:
- ✅ **Componentización**: Código reutilizable y mantenible
- ✅ **Estado reactivo**: Actualizaciones automáticas del contador
- ✅ **Hooks personalizados**: Lógica reutilizable (useCountdown)
- ✅ **Ecosistema maduro**: Gran cantidad de herramientas y documentación
- ✅ **Rendimiento**: Virtual DOM para actualizaciones eficientes

**Beneficios para este proyecto específico**:
- Separación clara entre lógica (hooks) y presentación (componentes)
- Tipado fuerte para fechas y cálculos de tiempo
- Facilita futuras extensiones (configuraciones, temas, etc.)
- Código más profesional y mantenible

## 🔄 Evolución Futura Planificada

### Versión 2.0 - Configuración
- Ventana de configuración para cambiar fecha objetivo
- Selección de temas visuales (colores, fuentes)
- Configuración de posición personalizable

### Versión 3.0 - Características Avanzadas
- Múltiples contadores (vacaciones, eventos importantes)
- Notificaciones en hitos importantes
- Sincronización con calendario

### Versión 4.0 - Personalización
- Widgets personalizables
- Integración con APIs externas
- Sistema de plugins

## 📝 Mejores Prácticas Aplicadas

1. **Seguridad**: Uso de contextBridge, sin nodeIntegration
2. **Rendimiento**: Mínimo uso de recursos, actualizaciones eficientes
3. **Mantenibilidad**: Código modular, comentarios claros
4. **Escalabilidad**: Arquitectura preparada para futuras características
5. **UX**: Comportamiento no intrusivo, visualmente integrado

## 🔜 Siguientes Pasos Inmediatos

1. Añadir validación y posible lectura futura de configuración desde archivo JSON (persistencia)
2. Añadir test unitario simple para `calculateCountdown` (extra de calidad)
3. Añadir ESLint config explícita y script `lint`
4. Parametrizar fecha mediante variable de entorno o archivo de ajustes
5. (Opcional) Animaciones suaves en cambios de valores

## � Persistencia y Auto-Inicio

- La fecha de jubilación se guarda en: (macOS) `~/Library/Application Support/Contador Jubilación/retirement-config.json` (en Windows: `%APPDATA%/Contador Jubilación/retirement-config.json`).
- Primera vez que el usuario guarda una fecha se habilita auto-inicio del sistema (login item / registro de inicio según plataforma soportada: macOS y Windows actualmente).
- Si se borra el archivo de configuración, al reiniciar la app volverá a pedir la fecha y reconfigurará el auto-inicio.
- Claves guardadas actualmente:
	- `retirementTimestamp`: Epoch ms de la fecha objetivo
	- `autoLaunch`: booleano (si se debe iniciar con el sistema)

Para desactivar manualmente el auto-inicio (temporal workaround) el usuario puede:
1. En macOS: Preferencias del Sistema > Usuarios y grupos > Ítems de inicio (eliminar la app)  
2. En Windows: Administrador de tareas > Inicio (deshabilitar la app)  
Futuro: añadir un toggle visual en la UI de configuración.

## �🧪 Comando de Desarrollo Actual

La app ya se ejecuta en modo desarrollo con recarga de compilación:

```bash
npm start
```

Si ves un error de preload no encontrado, asegúrate de haber reconstruido después del cambio de `webpack.main.config.js`:

```bash
npm run build:main
```

Luego reinicia `npm start`.

---

**Nota**: Este README se mantendrá actualizado conforme avance el desarrollo de cada tarea.
