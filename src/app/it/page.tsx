import GFGTestUploadSection from "../components/GFGTestUploadSection";
import GFGUploadSection from "../components/GFGUploadSection";
import HitbullseyeUploadSection from "../components/HitbullseyeUploadSection";

export default function ITPage() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white p-6">
      <GFGUploadSection department="IT" />
      <hr className="my-10 border-gray-400 dark:border-gray-700" />
      <GFGTestUploadSection />
      <hr className="my-10 border-gray-400 dark:border-gray-700" />
      <HitbullseyeUploadSection department="IT" />
    </main>
  );
}
