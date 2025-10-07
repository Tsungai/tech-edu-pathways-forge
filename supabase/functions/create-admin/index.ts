import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const adminEmail = "tsungaikatsuro@yahoo.com";
    const adminPassword = "TechEdu2025!Admin"; // Strong default password

    // Check if admin already exists
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("email", adminEmail)
      .single();

    if (existingProfile) {
      return new Response(
        JSON.stringify({ message: "Admin account already exists" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Create admin user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: "System Administrator",
      },
    });

    if (authError) throw authError;

    // Assign admin role
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({
        user_id: authData.user.id,
        role: "admin",
      });

    if (roleError) throw roleError;

    console.log("Admin account created successfully:", adminEmail);

    return new Response(
      JSON.stringify({
        message: "Admin account created successfully",
        email: adminEmail,
        password: adminPassword,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error creating admin:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});