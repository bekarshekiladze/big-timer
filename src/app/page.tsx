import CountdownContainer from "@/components/CountdownContainer";
import Header from "@/components/Header";

function page() {
  return (
    <main className="relative items-center grid bg-black min-w-screen min-h-screen text-bigtimer-white">
      <Header />
      <CountdownContainer />
    </main>
  );
}
export default page;
