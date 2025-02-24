"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { logoDesignWork, realEstateWork, foodRestaurantWork, commercialsWork, postWork } from "@/lib/constant";

const allWork = [
  ...logoDesignWork,
  ...realEstateWork,
  ...foodRestaurantWork,
  ...commercialsWork,
  ...postWork
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
