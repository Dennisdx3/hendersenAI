import Image from "next/image";
import Link from "next/link";
import Foot from "../components/Foot";

export default function Home() {
  return (
    <div className="ml-4 mr-0 w-auto sm:mx-20">
      <div className="flex justify-center">
        <section className="mt-10 mr-10 border-0 bg-white md:grid grid-cols-2 sm:w-4/5 shadow-none">
          <div container="mb-10">
            <div className="text-4xl font-bold mb-10">FAQ</div>
            <p className="font-bold mt-12">Q: Why should I register?</p>
            <p>
              A: Signing up allows you to personalize your experience by
              creating a personal profile where you can access exclusive content
              and services on the site. Secondly, registering on the website
              provides an opportunity for you to stay updated with important
              news or information related to your interests through newsletters
              and notifications. Registration is FREE.
            </p>
            <p className="font-bold mt-12">Q: What is your privacy policy?</p>
            <p>
              A: Your personal data including any chat messages will be strictly
              protected from unauthorized access. Your personal data shall not
              be shared with any third parties. You can clear your chat history
              any time you want and doing so such information will be completely
              deleted from the server.
            </p>
            <p className="font-bold mt-12">Q: What is the technology behind?</p>
            <p>
              A: Our AI is build on various LLMs. We are exploring various
              models such like Openai, Gimini and open source models like LLAMA
              2. Meanwhile, we use fine-tuning and embedding to provide back-end
              adjustment and knowledge base support for different AI characters.
            </p>
            <p className="font-bold mt-12">
              Q: The AI does not provide the answer I need...
            </p>{" "}
            <p>
              A: While the development of LLMs is at light speed, the
              application of AI in specific areas is still a blue ocean. The key
              is continuous fine-tuning. Please share us with your feedback and
              we will factor in the necessary adjustments.
            </p>
            <Link href="mailto:ai@hendersen.com">
              <p className="hover:font-bold">
                Please contact us @:ai@hendersen.com.
              </p>
            </Link>
            <p className="font-bold mt-12">
              Q: I would like to develop my own AI...
            </p>
            <p>
              A: We provide AI integration services to our clients. We help you
              to understand your business needs and how to apply AI into your
              business processes, design and tailor-made your own AI projects,
              as well as deploy/host your projects.
            </p>
            <Link href="mailto:ai@hendersen.com">
              <p className="hover:font-bold">
                Please contact us @:ai@hendersen.com.
              </p>
            </Link>
          </div>
          <div>
            <Image
              src="/FAQ.jpg"
              alt="background"
              className="rounded-lg shadow-lg ml-5 shadow-slate-500 object-cover hidden sm:block"
              width={2048}
              height={2048}
            />
          </div>
        </section>
      </div>
      {/* <div className="flex justify-center ">
        <section className="border-0 sm:w-4/5 bg-white shadow-none grid md:grid-cols-3 justify-center">
          <Cards className="flex justify-center" />
        </section>
      </div> */}
      <div className="flex justfy-center">
        <Foot />
      </div>
    </div>
  );
}
