import { services } from "@/lib/constant";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ServiceContent from "./ServiceContent";

type Props = {
  params: Promise<{ service: string }> | { service: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { service } = await props.params;
  
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

export default async function Page(props: Props) {
  const { service } = await props.params;
  
  const serviceData = services.find((s) => s.slug === service);

  if (!serviceData) {
    notFound();
  }

  return <ServiceContent service={serviceData} />;
}