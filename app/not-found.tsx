// app/not-found.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function not() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-white dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">
        400
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
        Pagekan ma jiro
      </p>
      <Link href="/">
        <Button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
