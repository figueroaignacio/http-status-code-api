import { CodeStatusCard } from "./code-status-card";

async function getCategoriesWithCodes() {
  const res = await fetch("http://localhost:3001/api/categories/with-codes");
  const data = await res.json();
  return data.data;
}

type StatusCode = {
  code: number;
  name: string;
  description: string;
  id: number;
};

type Category = {
  id: number;
  name: string;
  description: string;
  color: "info" | "success" | "warning" | "error";
  codes: StatusCode[];
};

export async function AllCodes() {

  const categories: Category[] = await getCategoriesWithCodes();

  return (
     <div className="space-y-20">
          {categories.map((category) => (
            <section key={category.id} className="space-y-8 scroll-mt-24">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                    {category.name}
                  </h2>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.codes.map((code) => (
                  <li key={code.id}>
                    <CodeStatusCard
                      name={code.name}
                      code={code.code}
                      description={code.description}
                      color={category.color}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
  )
}