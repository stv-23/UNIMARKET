# 🛒 Unimarket

**Unimarket** es una plataforma de mercado universitario moderna y segura, diseñada para facilitar la compra y venta de productos entre estudiantes.

![Unimarket App Icon](/public/icons/icon-192x192.png)

## 🚀 Características Principales

- **📱 PWA (Progressive Web App)**: Instalable en dispositivos móviles como una app nativa.
- **🛍️ Mercado Completo**: Publicación de productos con imágenes, categorías y precios.
- **💬 Chat en Tiempo Real**: Comunicación directa entre compradores y vendedores.
- **🔍 Búsqueda y Filtros**: Encuentra lo que necesitas rápidamente con filtros por categoría, precio y ordenamiento.
- **👤 Perfiles de Usuario**: Gestión de productos publicados y vendidos.
- **🔐 Autenticación Segura**: Sistema de login y registro protegido.
- **🌙 Modo Oscuro**: Interfaz elegante y amigable con la vista.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), React, TypeScript.
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/).
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/) (alojada en [Neon](https://neon.tech/)).
- **ORM**: [Prisma](https://www.prisma.io/).
- **Imágenes**: [Cloudinary](https://cloudinary.com/).
- **Autenticación**: JWT (JSON Web Tokens).

## 📦 Instalación y Configuración

1.  **Clonar el repositorio**:

    ```bash
    git clone https://github.com/tu-usuario/unimarket.git
    cd unimarket
    ```

2.  **Instalar dependencias**:

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env` en la raíz del proyecto y añade tus credenciales (ver `.env.example`).

4.  **Inicializar la base de datos**:

    ```bash
    npx prisma generate
    npx prisma migrate deploy
    ```

5.  **Correr el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

## 🌐 Despliegue

Este proyecto está optimizado para ser desplegado en **Vercel**.

1.  Sube tu código a GitHub.
2.  Importa el proyecto en Vercel.
3.  Configura las variables de entorno en el panel de Vercel.
4.  ¡Listo!

---

## 📄 Licencia

Este proyecto está bajo la licencia **Proprietaria**.
Todos los derechos reservados. No se permite la distribución ni modificación de este código sin autorización previa.

Desarrollado con ❤️ para la comunidad universitaria.
