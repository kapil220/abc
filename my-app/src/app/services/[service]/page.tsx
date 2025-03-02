import { services } from "@/lib/constant";
import { notFound } from "next/navigation";
import ServiceContent from "./ServiceContent";

// Remove type annotations for params
export async function generateMetadata({ params }) {
  const { service } = params;

  const serviceData = services.find((s) => s.slug === service);

  if (!serviceData) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found",
    };
  }

  return {
    title: serviceData.name,
    description: serviceData.shortDescription || "Service description not available",
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug,
  }));
}

export default function Page({ params }) {
  const { service } = params;

  const serviceData = services.find((s) => s.slug === service);

  if (!serviceData) {
    notFound();
  }

  return <ServiceContent service={serviceData} />;
}