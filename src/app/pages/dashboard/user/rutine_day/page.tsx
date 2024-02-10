interface props {
  searchParams: { id: string }
}

export default async function RutineDay({
  searchParams: { id },
}: props) {

  return (
    <div className="flex flex-col items-center h-full">
      {id}
    </div>
  );
}
