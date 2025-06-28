import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Lightbulb, Heart, Zap, Globe, CheckCircle, ArrowRight, Layers, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { number: "500+", label: "Projects Completed", icon: CheckCircle },
    { number: "150+", label: "Happy Clients", icon: Users },
    { number: "50+", label: "Team Members", icon: Heart },
    { number: "5+", label: "Years Experience", icon: Award },
  ]

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We constantly push boundaries and embrace cutting-edge technologies to deliver exceptional solutions.",
    },
    {
      icon: Heart,
      title: "Client-Centric",
      description:
        "Your success is our priority. We build lasting relationships through trust, transparency, and results.",
    },
    {
      icon: Zap,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from code quality to customer service.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Our solutions help businesses worldwide scale and succeed in the digital landscape.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/images/team/1.jpg",
      bio: "10+ years in tech leadership, passionate about empowering businesses through technology.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/images/team/2.jpg",
      bio: "Full-stack architect with expertise in scalable systems and emerging technologies.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image:"/images/team/3.jpg",
      bio: "Award-winning designer focused on creating intuitive and beautiful user experiences.",
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      image: "/images/team/4.jpg",
      bio: "Senior developer specializing in modern web technologies and performance optimization.",
    },
  ]

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Started with a vision to democratize web development for businesses of all sizes.",
    },
    {
      year: "2020",
      title: "First 100 Clients",
      description: "Reached our first major milestone and established our reputation for quality.",
    },
    {
      year: "2021",
      title: "Platform Launch",
      description: "Launched our revolutionary page builder platform, changing how businesses create websites.",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded operations internationally, serving clients across 25+ countries.",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Integrated AI-powered features, making web development even more accessible.",
    },
    {
      year: "2024",
      title: "500+ Projects",
      description: "Celebrated completing over 500 successful projects with 98% client satisfaction.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">
            About Buidifylabs
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering Businesses Through <span className="text-primary">Innovation</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're a passionate team of developers, designers, and strategists dedicated to helping businesses thrive in
            the digital world through cutting-edge technology solutions.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To democratize web development by providing powerful, intuitive tools that enable businesses of all
                sizes to create stunning, professional websites without technical barriers.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe every business deserves a strong digital presence, and we're here to make that vision a
                reality through innovative technology and exceptional service.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/themes/theme2.png"
                alt="Our Mission"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape how we work with our clients and each other.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of experts brings together years of experience in technology, design, and business
              strategy.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              From a small startup to a leading technology company, here's how we've grown.
            </p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{milestone.title}</h3>
                    <Badge variant="outline">{milestone.year}</Badge>
                  </div>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss how we can help transform your business with our innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/pages/contact">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://calendly.com/angusdev-aeworks/30min" target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  )
}
