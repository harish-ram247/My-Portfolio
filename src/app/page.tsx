import { AlsoOnFile } from "@/components/AlsoOnFile";
import { CaseFiles } from "@/components/CaseFiles";
import { Collaborate } from "@/components/Collaborate";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Evidence, Experience, Footer, LastThing, Toolkit } from "@/components/Sections";
import { Subject } from "@/components/Subject";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Subject />
        <CaseFiles />
        <AlsoOnFile />
        <Toolkit />
        <Experience />
        <Evidence />
        <LastThing />
        <Collaborate />
      </main>
      <Footer />
    </>
  );
}
