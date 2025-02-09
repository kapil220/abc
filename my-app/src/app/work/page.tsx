import Image from "next/image";
import Link from "next/link";
import { workPortfolio } from "@/lib/constant";

export default function WorkPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Work</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workPortfolio.map((work) => (
            <Link key={work.slug} href={`/work/${work.slug}`} className="group relative overflow-hidden rounded-lg block">
              <div className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-xl font-semibold text-white">{work.title}</h3>
                  <p className="text-white/80">{work.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
