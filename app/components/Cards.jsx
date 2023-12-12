import Link from "next/link";
import Image from "next/image";
const url = "http://127.0.0.1:3000/api/handleJSON";
const fs = require("fs");

async function Cards() {
  const response = await fetch(url, {
    next: {
      revalidate: 30,
    },
  });
  const cards = await response.json();

  cards.reverse();

  return (
    <>
      {cards.map((card) => (
        <div key={card.id} className="">
          <Link href={`${card.page_link}`}>
            <div>
              <h3 className="text-sm mx-3 mb-5 mt-5 text-gray-700 hover:text-black">
                {card.date}
              </h3>
            </div>
            <div className="mx-3">
              <Image
                src={`/images/${card.image_link}`}
                width={1024}
                height={1024}
                alt={card.title}
                className="w-full  object-cover shadow-lg shadow-slate-500 hover:shadow-slate-700 rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-sm mx-3 mt-8 underline text-gray-700 hover:text-black">
                {card.title}
              </h3>
            </div>
            <h3 className="text-sm mx-3 mt-5 text-gray-700 hover:text-black">
              {card.description}
            </h3>
          </Link>
        </div>
      ))}
    </>
  );
}
export default Cards;
