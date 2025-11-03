import { CodeStatusCard } from "@/components/code-status-card";

type StatusCode = {
  code: number;
  name: string;
  description: string;
  categoryId: number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

async function getStatusCodes() {
  const res = await fetch("http://localhost:3001/api/status-codes");
  const codes = await res.json();
  return codes.data;
}

export default async function Home() {
  const codes: StatusCode[] = await getStatusCodes();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-10">HTTP status codes hub</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {codes.map((code) => (
          <CodeStatusCard
            key={code.id}
            name={code.name}
            code={code.code}
            description={code.description}
          />
        ))}
      </ul>
    </section>
  );
}
