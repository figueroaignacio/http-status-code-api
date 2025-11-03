interface CodeStatusCardProps {
  name: string;
  code: number;
  description: string;
}

export function CodeStatusCard({
  name,
  code,
  description,
}: CodeStatusCardProps) {
  return (
    <div className="border p-4 h-full rounded-xl">
      <h2>{code}</h2>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}
