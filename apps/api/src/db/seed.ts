import dotenv from "dotenv";
import { db } from "./index.js";
import { categories, statusCodes } from "./schema.js";

dotenv.config();

const seedData = [
  {
    category: "Informational Responses",
    description:
      "Indicate that the request was received and is being processed",
    color: "info",
    codes: [
      {
        code: 100,
        name: "Continue",
        description:
          "The server has received the request headers and the client should proceed to send the request body.",
      },
      {
        code: 101,
        name: "Switching Protocols",
        description:
          "The requester has asked the server to switch protocols and the server has agreed to do so.",
      },
      {
        code: 102,
        name: "Processing",
        description:
          "The server has received and is processing the request, but no response is available yet.",
      },
      {
        code: 103,
        name: "Early Hints",
        description:
          "The server is sending some response headers before the final response.",
      },
    ],
  },
  {
    category: "Successful Responses",
    description:
      "The request was successfully received, understood, and processed.",
    color: "success",
    codes: [
      {
        code: 200,
        name: "OK",
        description:
          "The request has succeeded. The meaning depends on the HTTP method used.",
      },
      {
        code: 201,
        name: "Created",
        description:
          "The request succeeded, and a new resource was created as a result.",
      },
      {
        code: 202,
        name: "Accepted",
        description:
          "The request has been accepted for processing, but the processing is not complete.",
      },
      {
        code: 203,
        name: "Non-Authoritative Information",
        description:
          "The returned metadata may not be the definitive set from the origin server.",
      },
      {
        code: 204,
        name: "No Content",
        description:
          "The server successfully processed the request but is not returning any content.",
      },
      {
        code: 205,
        name: "Reset Content",
        description:
          "Tells the user agent to reset the document view that caused the request.",
      },
      {
        code: 206,
        name: "Partial Content",
        description:
          "The server is delivering only part of the resource due to a range header sent by the client.",
      },
    ],
  },
  {
    category: "Redirection Messages",
    description: "Further action needs to be taken to complete the request.",
    color: "info",
    codes: [
      {
        code: 300,
        name: "Multiple Choices",
        description:
          "The requested resource has multiple choices for representation.",
      },
      {
        code: 301,
        name: "Moved Permanently",
        description:
          "The requested resource has been permanently moved to a new URL.",
      },
      {
        code: 302,
        name: "Found",
        description:
          "The requested resource resides temporarily under a different URL.",
      },
      {
        code: 303,
        name: "See Other",
        description:
          "The server directs the client to retrieve the resource at another URI using GET.",
      },
      {
        code: 304,
        name: "Not Modified",
        description:
          "The resource has not been modified since the version specified by the request headers.",
      },
      {
        code: 307,
        name: "Temporary Redirect",
        description:
          "The requested resource resides temporarily under a different URI, preserving the method.",
      },
      {
        code: 308,
        name: "Permanent Redirect",
        description:
          "The requested resource has been permanently moved to a new URI, preserving the method.",
      },
    ],
  },
  {
    category: "Client Errors",
    description: "The request contains bad syntax or cannot be fulfilled.",
    color: "warning",
    codes: [
      {
        code: 400,
        name: "Bad Request",
        description:
          "The server cannot process the request due to a client error (e.g., malformed syntax).",
      },
      {
        code: 401,
        name: "Unauthorized",
        description: "Authentication is required to access the resource.",
      },
      {
        code: 402,
        name: "Payment Required",
        description:
          "Reserved for future use, initially intended for digital payment systems.",
      },
      {
        code: 403,
        name: "Forbidden",
        description:
          "The server understands the request but refuses to authorize it.",
      },
      {
        code: 404,
        name: "Not Found",
        description: "The requested resource could not be found.",
      },
      {
        code: 405,
        name: "Method Not Allowed",
        description:
          "The HTTP method is not allowed for the requested resource.",
      },
      {
        code: 406,
        name: "Not Acceptable",
        description:
          "The requested resource is not available in a format acceptable to the client.",
      },
      {
        code: 408,
        name: "Request Timeout",
        description: "The server timed out waiting for the request.",
      },
      {
        code: 409,
        name: "Conflict",
        description:
          "The request could not be completed due to a conflict with the current state of the resource.",
      },
      {
        code: 410,
        name: "Gone",
        description:
          "The requested resource is no longer available and will not be available again.",
      },
      {
        code: 429,
        name: "Too Many Requests",
        description:
          "The user has sent too many requests in a given amount of time.",
      },
    ],
  },
  {
    category: "Server Errors",
    description: "The server failed to fulfill a valid request.",
    color: "error",
    codes: [
      {
        code: 500,
        name: "Internal Server Error",
        description:
          "The server encountered an unexpected condition that prevented it from fulfilling the request.",
      },
      {
        code: 501,
        name: "Not Implemented",
        description:
          "The server does not support the functionality required to fulfill the request.",
      },
      {
        code: 502,
        name: "Bad Gateway",
        description:
          "The server received an invalid response from the upstream server.",
      },
      {
        code: 503,
        name: "Service Unavailable",
        description:
          "The server is currently unavailable, usually due to maintenance or overload.",
      },
      {
        code: 504,
        name: "Gateway Timeout",
        description:
          "The server acting as a gateway did not receive a timely response from the upstream server.",
      },
      {
        code: 505,
        name: "HTTP Version Not Supported",
        description:
          "The server does not support the HTTP protocol version used in the request.",
      },
    ],
  },
];

const seed = async () => {
  console.log("🌱 Seeding database...");

  try {
    // 🧹 Clean existing data
    console.log("🧨 Clearing existing data...");
    await db.delete(statusCodes);
    await db.delete(categories);

    // 🧩 Insert new data
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

    console.log("✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed");
    console.error(error);
    process.exit(1);
  }
};

seed();
