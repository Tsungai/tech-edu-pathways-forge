import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateUserRequest {
  email: string;
  fullName: string;
  role: "teacher" | "student" | "student_admin";
  phone?: string;
  prospectiveUserId?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Get the authenticated user (admin or student_admin)
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user: requestingUser } } = await supabaseClient.auth.getUser(token);

    if (!requestingUser) {
      throw new Error("Unauthorized");
    }

    // Check if user has permission
    const { data: userRole } = await supabaseClient
      .from("user_roles")
      .select("role")
      .eq("user_id", requestingUser.id)
      .single();

    const { email, fullName, role, phone, prospectiveUserId }: CreateUserRequest = await req.json();

    // Validate permissions
    if (role === "teacher" || role === "student_admin") {
      if (userRole?.role !== "admin") {
        throw new Error("Only admins can create teacher and student_admin accounts");
      }
    } else if (role === "student") {
      if (userRole?.role !== "admin" && userRole?.role !== "student_admin") {
        throw new Error("Only admins and student_admins can create student accounts");
      }
    }

    // Generate temporary password
    const tempPassword = crypto.randomUUID().substring(0, 12);

    // Create the user account
    const { data: newUser, error: createError } = await supabaseClient.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

    if (createError) throw createError;

    // Create profile
    await supabaseClient.from("profiles").insert({
      id: newUser.user.id,
      email,
      full_name: fullName,
      phone: phone || null,
      first_login_completed: false,
    });

    // Assign role
    await supabaseClient.from("user_roles").insert({
      user_id: newUser.user.id,
      role,
    });

    // Update prospective user if provided
    if (prospectiveUserId) {
      await supabaseClient
        .from("prospective_users")
        .update({
          status: "converted",
          converted_to_user_id: newUser.user.id,
          converted_at: new Date().toISOString(),
        })
        .eq("id", prospectiveUserId);
    }

    // Send email notification based on role
    let emailSubject = "";
    let emailHtml = "";

    if (role === "teacher" || role === "student_admin") {
      emailSubject = `Welcome to TechEdu Academy - Your ${role === "teacher" ? "Teacher" : "Student Administrator"} Account`;
      emailHtml = `
        <h1>Welcome to TechEdu Academy!</h1>
        <p>Hello ${fullName},</p>
        <p>Your ${role === "teacher" ? "teacher" : "student administrator"} account has been created.</p>
        <h2>Login Credentials:</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Temporary Password:</strong> ${tempPassword}</p>
        <p><strong>Login URL:</strong> <a href="https://techedu.academy/auth">Login Here</a></p>
        <p><strong>Important:</strong> Please change your password after your first login.</p>
        <p>Best regards,<br>TechEdu Academy Team</p>
      `;
    } else {
      emailSubject = "Welcome to TechEdu Academy - Confirm Your Details";
      emailHtml = `
        <h1>Welcome to TechEdu Academy!</h1>
        <p>Hello ${fullName},</p>
        <p>Your student account has been created. Please log in and confirm your details to get started.</p>
        <h2>Login Credentials:</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Temporary Password:</strong> ${tempPassword}</p>
        <p><strong>Login URL:</strong> <a href="https://techedu.academy/auth">Login Here</a></p>
        <p><strong>Important:</strong> You'll need to confirm your details and change your password on first login.</p>
        <p>Best regards,<br>TechEdu Academy Team</p>
      `;
    }

    await resend.emails.send({
      from: "TechEdu Academy <admissions@techedu.academy>",
      to: [email],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log(`User account created successfully for ${email} with role ${role}`);

    return new Response(
      JSON.stringify({
        success: true,
        userId: newUser.user.id,
        email,
        role,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in create-user-account function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});