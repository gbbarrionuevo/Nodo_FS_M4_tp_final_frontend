# PokémonCard's – Frontend

## 1. Descripción

PokémonCard's es una aplicación web interactiva desarrollada con **React**, **Vite** y **Tailwind CSS v4** que permite a los usuarios explorar, coleccionar y gestionar cartas Pokémon consumiendo una API propia.

Incluye diseño modo claro/oscuro, responsive, animaciones suaves y una experiencia visual inspirada en Pokémon.

---

## 2. Demo en vivo

**URL del proyecto desplegado:**  
[https://pokemoncards-frontend.netlify.app/](https://pokemoncards-frontend.netlify.app/)

---

## 3. Tecnologías

* React
* Vite
* Tailwind CSS v4
* React Router DOM
* Axios
* SweetAlert2
* React Toastify

---

## 4. Características principales

1. Autenticación y registro de usuarios.
2. Control de acceso por **roles y permisos**.
3. Gestión de cartas, carrito, compras e inventario.
4. Panel de administración para usuarios, roles y permisos.
5. Consumo de API privada protegida con JWT.
6. Estado global manejado con Context API.
7. Componentes reutilizables y UI reactiva.
8. Alertas modales modernas y personalizadas con SweetAlert2.
9. Notificaciones con Toastify.
10. Diseño responsive con Tailwind CSS V4.
11. Animaciones inspiradas en las Pokéballs y transiciones suaves entre vistas.

---

## 5. Instalación y ejecución local

### Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```
VITE_API_URL=http://localhost:3000/api
VITE_STATIC_URL=http://localhost:3000
```

### Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/gbbarrionuevo/Nodo_FS_M4_tp_final_frontend.git pokemonCard/frontend
cd pokemonCards/frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Abrir en el navegador:

```
http://localhost:5173/login
```

---

## 6. Consideraciones

* El frontend depende del backend para autenticación y datos.
* Asegurarse de que la API esté corriendo antes de iniciar la app.
