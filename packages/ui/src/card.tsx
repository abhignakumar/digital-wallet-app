export const Card = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="border rounded-md p-4">
      <div className="text-xl border-b pb-2">{title}</div>
      <div>{children}</div>
    </div>
  );
};
