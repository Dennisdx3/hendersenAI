import Cards from "./components/Cards";
import Image from "next/image";
import Link from "next/link";
import Foot from "./components/Foot";

export default function Home() {
  return (
    <div className="ml-4 mr-0 w-auto sm:mx-20">
      <div className="flex justify-center">
        <section className="mt-10 mr-10 border-0 bg-white md:grid grid-cols-2 sm:w-4/5 shadow-none">
          <div container="mb-10">
            <div className="text-4xl font-bold mb-10">
              Welcome to
              <br /> Hendersen AI!
            </div>

            <p>
              2023 is the year of the AI. The use of artificial intelligence
              (AI) is increasingly becoming prevalent in various industries.
              Professional services such as accounting, finance, legal and tax
              are no exception to this trend. With advancements in machine
              learning algorithms and natural language processing capabilities,
              AI has the potential to revolutionize these fields by automating
              repetitive tasks and enabling professionals to focus on higher
              value-added work.
            </p>
            <p>
              We are developing a series of AI products by combining our
              professional expertise and the cutting edge AI technology. You
              need to sign-up in order to try with your various bots.
              Registration is totally FREE. Enjoy!
            </p>
            <p>
              <Link href="#" className="hover:font-bold">
                Any questions, please visit out FAQ page.
              </Link>
            </p>
          </div>
          <div>
            <Image
              src="/64014.png"
              alt="background"
              className="rounded-lg shadow-lg ml-5 shadow-slate-500 object-cover"
              width={2048}
              height={2048}
            />
          </div>
        </section>
      </div>
      <div className="flex justify-center ">
        <section className="border-0 sm:w-4/5 bg-white shadow-none grid md:grid-cols-3 justify-center">
          <Cards className="flex justify-center" />
        </section>
      </div>
      <div className="flex justfy-center">
        <Foot />
      </div>
    </div>
  );
}
