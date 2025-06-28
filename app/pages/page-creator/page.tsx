"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Globe, Layout, Layers, Type, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function PageCreatorLanding() {
  const router = useRouter()
  const [domainName, setDomainName] = useState("")
  const [checking, setChecking] = useState(false)
  const [showComingSoonModal, setShowComingSoonModal] = useState(false)
  const [notificationForm, setNotificationForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submittingNotification, setSubmittingNotification] = useState(false)

  const [domainStatus, setDomainStatus] = useState<{
    available?: boolean
    error?: string
    suggestions?: string[]
    sanitizedDomain?: string
  }>({})

  const checkDomainAvailability = async () => {
    setShowComingSoonModal(true)
  }

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!notificationForm.name.trim() || !notificationForm.email.trim()) {
      toast({
        title: "Error",
        description: "Please fill in your name and email",
        variant: "destructive",
      })
      return
    }

    setSubmittingNotification(true)

    try {
      // Submit to Google Forms
      const formData = new FormData()
      formData.append("name", notificationForm.name) // Replace with actual entry ID
      formData.append("email", notificationForm.email) // Replace with actual entry ID
      formData.append("message", notificationForm.message || "Interested in domain availability feature") // Replace with actual entry ID
      
      var keyValuePairs = [];
      for (var pair of formData.entries()) {
        keyValuePairs.push(pair[0] + "=" + pair[1]);
      }

      const formDataString = keyValuePairs.join("&");
      console.log(formDataString)


      // Replace with your actual Google Form URL
      await fetch(process.env.NEXT_PUBLIC_FORM_URL as string, {
        method: "POST",
        body: formDataString,
        mode: "no-cors",
      })

      toast({
        title: "Thank you!",
        description: "We'll notify you when the domain availability feature is ready.",
      })

      setShowComingSoonModal(false)
      setNotificationForm({ name: "", email: "", message: "" })
    } catch (error) {
      toast({
        title: "Success!",
        description: "We'll notify you when the domain availability feature is ready.",
      })
      setShowComingSoonModal(false)
      setNotificationForm({ name: "", email: "", message: "" })
    } finally {
      setSubmittingNotification(false)
    }
  }

  const proceedToCreator = (selectedDomain?: string) => {
    const finalDomain = selectedDomain || domainStatus.sanitizedDomain || domainName
    router.push(`/page-creator/create?domain=${encodeURIComponent(finalDomain)}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkDomainAvailability()
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create Your Business Landing Page in Minutes
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    No coding required. Our intuitive page creator lets you build professional landing pages for your
                    business in just a few clicks.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="group" onClick={() => document.getElementById("domain-input")?.focus()}>
                    Start Creating
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#examples">View Examples</Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="inline-block h-8 w-8 overflow-hidden rounded-full border-2 border-background"
                      >
                        <Image
                          src={`/placeholder.svg?height=32&width=32&text=${i}`}
                          width={32}
                          height={32}
                          alt="Avatar"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-muted-foreground">
                    Trusted by <span className="font-medium text-foreground">2,000+</span> businesses
                  </div>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="w-full max-w-md space-y-4">
                  <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl">Create Your Landing Page</CardTitle>
                      <CardDescription>Enter a unique name for your landing page</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">buildifylabs.com/</span>
                          <Input
                            id="domain-input"
                            placeholder="your-business-name"
                            className="flex-1"
                            value={domainName}
                            onChange={(e) => setDomainName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={checking}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          This will be the URL of your landing page: buildifylabs.com/{domainName || "your-business-name"}
                        </p>
                      </div>

                      {/* Domain Status */}
                      {domainStatus.available !== undefined && (
                        <div className="space-y-2">
                          {domainStatus.available ? (
                            <Alert>
                              <Check className="h-4 w-4" />
                              <AlertDescription>
                                <strong>{domainStatus.sanitizedDomain}</strong> is available!
                              </AlertDescription>
                            </Alert>
                          ) : (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>
                                {domainStatus.error || `${domainName} is already taken`}
                              </AlertDescription>
                            </Alert>
                          )}

                          {/* Suggestions */}
                          {domainStatus.suggestions && domainStatus.suggestions.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Try these alternatives:</p>
                              <div className="flex flex-wrap gap-1">
                                {domainStatus.suggestions.map((suggestion) => (
                                  <Button
                                    key={suggestion}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => proceedToCreator(suggestion)}
                                    className="text-xs"
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                      <Button
                        className="w-full"
                        onClick={checkDomainAvailability}
                        disabled={checking || !domainName.trim()}
                      >
                        {checking ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Checking...
                          </>
                        ) : (
                          "Check Availability"
                        )}
                      </Button>

                      {domainStatus.available && (
                        <Button className="w-full" variant="default" onClick={() => proceedToCreator()}>
                          Continue with {domainStatus.sanitizedDomain}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </CardFooter>
                  </Card>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or view examples</span>
                    </div>
                  </div>

                  <div id="examples" className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-lg border cursor-pointer hover:border-primary transition-colors"
                      >
                        <Image
                          src={`/placeholder.svg?height=120&width=160&text=Example+${i}`}
                          width={160}
                          height={120}
                          alt={`Example ${i}`}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Feature Coming Soon Modal */}
            <Dialog open={showComingSoonModal} onOpenChange={setShowComingSoonModal}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                    </div>
                    Feature Coming Soon!
                  </DialogTitle>
                  <DialogDescription>
                    We're working hard to bring you the domain availability checker. Leave your details below and we'll
                    notify you as soon as it's ready!
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleNotificationSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notification-name">Name *</Label>
                    <Input
                      id="notification-name"
                      placeholder="Your full name"
                      value={notificationForm.name}
                      onChange={(e) => setNotificationForm((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-email">Email *</Label>
                    <Input
                      id="notification-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={notificationForm.email}
                      onChange={(e) => setNotificationForm((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-message">Message (Optional)</Label>
                    <Textarea
                      id="notification-message"
                      placeholder="Any specific requirements or questions?"
                      value={notificationForm.message}
                      onChange={(e) => setNotificationForm((prev) => ({ ...prev, message: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowComingSoonModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submittingNotification} className="flex-1" >
                      {submittingNotification ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Notify Me"
                      )}
                    </Button>
                  </div>
                </form>

                <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                  We respect your privacy. Your information will only be used to notify you about this feature.
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Rest of the page content remains the same */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create your professional landing page in three simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3 lg:gap-12">
              {[
                {
                  icon: <Globe className="h-10 w-10 text-primary" />,
                  title: "Choose Your Domain",
                  description: "Select a unique name for your landing page that reflects your business.",
                },
                {
                  icon: <Layout className="h-10 w-10 text-primary" />,
                  title: "Select a Template",
                  description: "Choose from our professionally designed templates for your industry.",
                },
                {
                  icon: <Type className="h-10 w-10 text-primary" />,
                  title: "Customize Content",
                  description: "Add your own content, images, and branding to make it yours.",
                },
              ].map((step, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      {step.icon}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Choose Your Plan</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Select the plan that best fits your business needs
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "Basic",
                  price: "$9.99",
                  description: "Perfect for small businesses just getting started",
                  features: [
                    "1 landing page",
                    "Basic templates",
                    "Custom domain",
                    "Mobile responsive",
                    "Basic analytics",
                  ],
                  cta: "Get Started",
                  popular: false,
                },
                {
                  title: "Professional",
                  price: "$19.99",
                  description: "Ideal for growing businesses with more needs",
                  features: [
                    "5 landing pages",
                    "Premium templates",
                    "Custom domain",
                    "Mobile responsive",
                    "Advanced analytics",
                    "Lead capture forms",
                    "Email integration",
                  ],
                  cta: "Get Started",
                  popular: true,
                },
                {
                  title: "Enterprise",
                  price: "$49.99",
                  description: "For established businesses with advanced requirements",
                  features: [
                    "Unlimited landing pages",
                    "All templates",
                    "Custom domain",
                    "Mobile responsive",
                    "Advanced analytics",
                    "Lead capture forms",
                    "Email integration",
                    "A/B testing",
                    "Priority support",
                  ],
                  cta: "Contact Sales",
                  popular: false,
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-lg relative ${plan.popular ? "ring-2 ring-primary" : ""}`}
                >
                  {plan.popular && (
                    <Badge className="absolute right-4 top-4 bg-primary text-primary-foreground">Most Popular</Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.title}</CardTitle>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      asChild={plan.cta === "Contact Sales"}
                    >
                      {plan.cta === "Contact Sales" ? (
                        <a href="https://calendly.com/angusdev-aeworks/30min" target="_blank" rel="noopener noreferrer">
                          {plan.cta}
                        </a>
                      ) : (
                        <span onClick={() => document.getElementById("domain-input")?.focus()}>{plan.cta}</span>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

      
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our page creator
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:gap-12">
              {[
                {
                  question: "Do I need technical knowledge to use the page creator?",
                  answer:
                    "No, our page creator is designed to be user-friendly and requires no coding knowledge. You can create a professional landing page using our intuitive drag-and-drop interface.",
                },
                {
                  question: "Can I use my own domain name?",
                  answer:
                    "Yes, you can use your own domain name with our Professional and Enterprise plans. We also offer a free subdomain (yourbusiness.buildifylabs.com) with all plans.",
                },
                {
                  question: "How many pages can I create?",
                  answer:
                    "The number of pages you can create depends on your plan. Basic allows 1 page, Professional allows 5 pages, and Enterprise offers unlimited pages.",
                },
                {
                  question: "Can I change my template after creating my page?",
                  answer:
                    "Yes, you can change your template at any time without losing your content. All your content will automatically adapt to the new template.",
                },
                {
                  question: "Is there a free trial available?",
                  answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to get started.",
                },
                {
                  question: "How do I cancel my subscription?",
                  answer:
                    "You can cancel your subscription at any time from your account dashboard. If you cancel within 30 days of purchase, you're eligible for a full refund.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
