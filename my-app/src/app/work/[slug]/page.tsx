import { notFound } from "next/navigation";
import Image from "next/image";
import { socialMediaWork, digitalStrategyWork, contentCreationWork, photographyWork, brandingWork } from "@/lib/constant";

const allWork = [
  ...socialMediaWork,
  ...digitalStrategyWork,
  ...contentCreationWork,
  ...photographyWork,
  ...brandingWork
];

export type WorkDetailProps = {
  params: { slug: string };
};

export default function WorkDetail({ params }: WorkDetailProps) {
  const workItem = allWork.find((work) => work.slug === params.slug);

  if (!workItem) return notFound();

  return (
    <div className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">{workItem.title}</h1>
        <div className="relative w-full h-96 mb-6">
          <Image
            src={workItem.image}
            alt={workItem.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <p className="text-lg text-gray-700">{workItem.description}</p>
      </div>
    </div>
  );
}
