import dotenv from "dotenv";
import { db } from "./index.js";
import { categories, statusCodes } from "./schema.js";

dotenv.config();

const seedData = [
  {
    category: "Respuestas Informativas",
    description: "Indican que la solicitud fue recibida y se está procesando",
    color: "info",
    codes: [
      {
        code: 100,
        name: "Continue",
        description:
          "El servidor ha recibido los encabezados de la solicitud y el cliente puede continuar enviando el cuerpo",
      },
      {
        code: 101,
        name: "Switching Protocols",
        description:
          "El servidor acepta cambiar el protocolo según lo solicitado por el cliente",
      },
      {
        code: 102,
        name: "Processing",
        description:
          "El servidor ha recibido y está procesando la solicitud, pero aún no hay respuesta disponible",
      },
    ],
  },
  {
    category: "Respuestas Exitosas",
    description:
      "La solicitud fue recibida, entendida y procesada correctamente",
    color: "success",
    codes: [
      {
        code: 200,
        name: "OK",
        description:
          "La solicitud ha tenido éxito. El significado depende del método HTTP utilizado",
      },
      {
        code: 201,
        name: "Created",
        description:
          "La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado",
      },
      {
        code: 202,
        name: "Accepted",
        description:
          "La solicitud ha sido aceptada para procesamiento, pero no se ha completado",
      },
      {
        code: 204,
        name: "No Content",
        description:
          "La solicitud se procesó correctamente pero no hay contenido para devolver",
      },
    ],
  },
  {
    category: "Redirecciones",
    description: "Se requiere una acción adicional para completar la solicitud",
    color: "info",
    codes: [
      {
        code: 301,
        name: "Moved Permanently",
        description:
          "El recurso solicitado ha sido movido permanentemente a una nueva URL",
      },
      {
        code: 302,
        name: "Found",
        description:
          "El recurso solicitado reside temporalmente en una URL diferente",
      },
      {
        code: 304,
        name: "Not Modified",
        description:
          "El recurso no ha sido modificado desde la última solicitud",
      },
      {
        code: 307,
        name: "Temporary Redirect",
        description:
          "El recurso reside temporalmente en otra URL, manteniendo el método HTTP",
      },
      {
        code: 308,
        name: "Permanent Redirect",
        description:
          "El recurso ha sido movido permanentemente, manteniendo el método HTTP",
      },
    ],
  },
  {
    category: "Errores del Cliente",
    description:
      "La solicitud contiene sintaxis incorrecta o no puede ser procesada",
    color: "warning",
    codes: [
      {
        code: 400,
        name: "Bad Request",
        description:
          "El servidor no puede procesar la solicitud debido a un error del cliente",
      },
      {
        code: 401,
        name: "Unauthorized",
        description: "Se requiere autenticación para acceder al recurso",
      },
      {
        code: 403,
        name: "Forbidden",
        description:
          "El servidor entiende la solicitud pero se niega a autorizarla",
      },
      {
        code: 404,
        name: "Not Found",
        description: "El servidor no puede encontrar el recurso solicitado",
      },
      {
        code: 405,
        name: "Method Not Allowed",
        description:
          "El método HTTP utilizado no está permitido para este recurso",
      },
      {
        code: 408,
        name: "Request Timeout",
        description: "El servidor agotó el tiempo de espera para la solicitud",
      },
      {
        code: 429,
        name: "Too Many Requests",
        description:
          "El usuario ha enviado demasiadas solicitudes en un período de tiempo",
      },
    ],
  },
  {
    category: "Errores del Servidor",
    description: "El servidor falló al intentar procesar una solicitud válida",
    color: "error",
    codes: [
      {
        code: 500,
        name: "Internal Server Error",
        description:
          "El servidor encontró una situación inesperada que le impidió completar la solicitud",
      },
      {
        code: 501,
        name: "Not Implemented",
        description:
          "El servidor no reconoce el método de solicitud o no puede cumplirlo",
      },
      {
        code: 502,
        name: "Bad Gateway",
        description:
          "El servidor actuando como gateway recibió una respuesta inválida del servidor upstream",
      },
      {
        code: 503,
        name: "Service Unavailable",
        description:
          "El servidor no está disponible temporalmente, generalmente por mantenimiento",
      },
      {
        code: 504,
        name: "Gateway Timeout",
        description:
          "El servidor actuando como gateway no recibió respuesta a tiempo del servidor upstream",
      },
    ],
  },
];

const seed = async () => {
  console.log("🌱 Seeding database...");

  try {
    for (const item of seedData) {
      const [category] = await db
        .insert(categories)
        .values({
          name: item.category,
          description: item.description,
          color: item.color,
        })
        .returning();

      console.log(`✅ Created category: ${category.name}`);

      for (const code of item.codes) {
        await db.insert(statusCodes).values({
          code: code.code,
          name: code.name,
          description: code.description,
          categoryId: category.id,
        });
      }

      console.log(`   ✅ Created ${item.codes.length} status codes`);
    }

    console.log("✅ Seeding completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed");
    console.error(error);
    process.exit(1);
  }
};

seed();
