import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-contact-form function invoked");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    console.log("RESEND_API_KEY exists:", !!apiKey);
    
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    
    const resend = new Resend(apiKey);
    
    const { firstName, lastName, email, phone, course, message }: ContactFormRequest = await req.json();
    console.log("Received form data:", { firstName, lastName, email, phone, course });

    // Send to admissions team
    const emailResponse = await resend.emails.send({
      from: "TechEdu Academy <onboarding@resend.dev>",
      to: ["tsungaikatsuro@gmail.com"],
      replyTo: email,
      subject: `New Application - ${firstName} ${lastName}`,
      html: `
        <h2>New Application Received</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Course Interest:</strong> ${course}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Contact form email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-form function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
