import { Code, Globe, Smartphone, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesSection() {
  const services = [
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Web Development",
      description:
        "Custom websites and web applications built with the latest technologies for optimal performance and user experience.",
    },
    {
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "UI/UX Design",
      description:
        "User-centered design that combines aesthetics with functionality to create intuitive and engaging interfaces.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Digital Transformation",
      description:
        "Strategic consulting and implementation to help businesses leverage technology for growth and efficiency.",
    },
  ]

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Our Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Comprehensive Development Solutions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a full range of services to help you build, launch, and grow your digital products.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:gap-12">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardHeader>
                <div className="mb-2">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
