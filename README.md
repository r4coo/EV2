# Innovatech Chile - Plataforma de Despliegue Automatizado (Etapa 2)

Este repositorio contiene el código fuente y la configuración de infraestructura como código para el componente del sistema desarrollado para Innovatech Chile. El objetivo de esta etapa es lograr la contenedorización completa de la solución y la automatización de su ciclo de vida mediante un pipeline de CI/CD.

## 🚀 Arquitectura y Decisiones Técnicas

### 1. Contenedorización (Dockerfile Multi-Stage)
Para cumplir con los estándares de rendimiento y seguridad solicitados, el entorno se diseñó utilizando **Multi-stage builds**:
* **Etapa de Compilación/Build:** Utiliza una imagen base robusta para instalar dependencias y compilar el proyecto, asegurando una limpieza completa de capas redundantes.
* **Etapa de Producción/Runtime:** Utiliza una imagen ligera (minimalista) donde solo se exportan los artefactos compilados necesarios.
* **Seguridad (Mínimo Privilegio):** El contenedor no se ejecuta como usuario `root`. Se configuró un usuario con privilegios limitados para mitigar riesgos de seguridad en la instancia de AWS EC2.

### 2. Orquestación Local (Docker Compose)
El stack completo puede ser levantado de forma conjunta o independiente utilizando el archivo `docker-compose.yml` principal en la raíz de la solución, el cual coordina:
* Redes internas aisladas (`bridge`) para la comunicación segura entre componentes.
* Variables de entorno unificadas.
* Políticas de reinicio y dependencias de orden de encendido (`depends_on`).

### 3. Persistencia de Datos (Volúmenes)
Se implementaron **Named Volumes (Volúmenes Nombrados)** de Docker en lugar de *Bind Mounts* para la gestión de datos críticos. 
* **Justificación:** Los volúmenes nombrados son completamente gestionados por el motor de Docker, lo que garantiza una abstracción del sistema operativo del host (AWS EC2), mayor rendimiento de lectura/escritura en disco, y aislamiento seguro. Esto asegura la continuidad operativa del sistema ante reinicios o recreaciones de los contenedores.

---

## 🛠️ Requisitos Previos

Antes de ejecutar el proyecto de forma local o configurar el despliegue, asegúrate de tener instalado:
* **Docker Desktop** (v20.10 o superior)
* **Docker Compose** (v2.0 o superior)
* **Git**
* **AWS CLI** (para configuraciones de infraestructura)

---

## 💻 Ejecución en Entorno Local

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>