"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Mail, MessageSquare, Phone, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { eachMinuteOfInterval } from "date-fns"


export default function ContactForm() {
  const [formStep, setFormStep] = useState<"contact" | "booking">("contact")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  })



  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)



    try {

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Handle success
      } else {
        // Handle error
      }



      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
        service: "",
        date: "",
        time: "",
        notes: "",
      })

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Get in Touch
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Let's Discuss Your Project</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have a question or ready to start your next project? Reach out to our team.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-2">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <RadioGroup
                  value={formStep}
                  onValueChange={(value) => setFormStep(value as "contact" | "booking")}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="contact" id="contact" />
                    <Label htmlFor="contact" className="cursor-pointer">
                      Contact Us
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <RadioGroupItem value="booking" id="booking" />
                    <Label htmlFor="booking" className="cursor-pointer">
                      Book a Session
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <CardTitle>{formStep === "contact" ? "Contact Form" : "Book a Consultation"}</CardTitle>
              <CardDescription>
                {formStep === "contact"
                  ? "Fill out the form below and we'll get back to you as soon as possible."
                  : "Schedule a free consultation with our experts to discuss your project."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="John"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="john.doe@example.com"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                {formStep === "contact" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Project Inquiry"
                        required
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project or inquiry..."
                        className="min-h-[120px]"
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service</Label>
                      <Select
                        required
                        value={formData.service}
                        onValueChange={(value) => handleInputChange("service", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web Development</SelectItem>
                          <SelectItem value="mobile">Mobile Development</SelectItem>
                          <SelectItem value="design">UI/UX Design</SelectItem>
                          <SelectItem value="consulting">Digital Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select
                        required
                        value={formData.time}
                        onValueChange={(value) => handleInputChange("time", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (1PM - 5PM)</SelectItem>
                          <SelectItem value="evening">Evening (6PM - 8PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Tell us briefly about your project..."
                        className="min-h-[80px]"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                      />
                    </div>
                  </>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : formStep === "contact" ? (
                    "Send Message"
                  ) : (
                    "Book Session"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Email Us</h3>
                <p className="text-muted-foreground">Our friendly team is here to help.</p>
                <a href="mailto:angusdev.aeworks@gmail.com" className="mt-2 block font-medium text-primary hover:underline">
                  angusdev.aeworks@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Call Us</h3>
                <p className="text-muted-foreground">Mon-Fri from 8am to 6pm.</p>
                <a href="tel:+234810959313" className="mt-2 block font-medium text-primary hover:underline">
                  +234 810 995 9313
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Live Chat</h3>
                <p className="text-muted-foreground">Our friendly team is here to help.</p>
                <Button variant="link" className="mt-2 h-auto p-0 text-primary hover:underline" asChild>
                  <a href="https://calendly.com/angusdev-aeworks/30min" target="_blank" rel="noopener noreferrer">
                    Start a live chat
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Office Hours</h3>
                <p className="text-muted-foreground">Come visit us in our headquarters.</p>
                <p className="mt-2 text-sm">
                  Monday - Friday: 9am - 6pm
                  <br />
                  Saturday: 10am - 3pm
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
