'use client'

export default function BoxToFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 mx-10">
      <div className="border-gray-300 border-1 shadow-lg rounded-lg !rounded-tl-xl p-6 max-w-sm w-full relative">
        {children}
      </div>
    </div>
  );
}


