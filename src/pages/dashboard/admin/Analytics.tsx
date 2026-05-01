import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Users, UserPlus, MailQuestion, GraduationCap, TrendingUp, Info } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const DAYS = 30;

type DailyPoint = { date: string; signups: number; leads: number; enrollments: number };
type SourceSlice = { name: string; value: number };

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--muted-foreground))",
  "hsl(var(--secondary))",
  "hsl(var(--destructive))",
];

function startOfRange(): Date {
  const d = new Date();
  d.setDate(d.getDate() - (DAYS - 1));
  d.setHours(0, 0, 0, 0);
  return d;
}

function dateKey(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}

function buildEmptySeries(): DailyPoint[] {
  const start = startOfRange();
  const out: DailyPoint[] = [];
  for (let i = 0; i < DAYS; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    out.push({ date: dateKey(d), signups: 0, leads: 0, enrollments: 0 });
  }
  return out;
}

function inferSource(message: string | null): string {
  if (!message) return "Direct";
  const m = message.toLowerCase();
  if (m.includes("google") || m.includes("search")) return "Google";
  if (m.includes("facebook") || m.includes("fb")) return "Facebook";
  if (m.includes("instagram") || m.includes("ig")) return "Instagram";
  if (m.includes("linkedin")) return "LinkedIn";
  if (m.includes("whatsapp")) return "WhatsApp";
  if (m.includes("friend") || m.includes("referral") || m.includes("word")) return "Referral";
  return "Direct";
}

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState<DailyPoint[]>(buildEmptySeries());
  const [totals, setTotals] = useState({ signups: 0, leads: 0, enrollments: 0, conversion: 0 });
  const [sources, setSources] = useState<SourceSlice[]>([]);
  const [courseInterest, setCourseInterest] = useState<SourceSlice[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const since = startOfRange().toISOString();

      const [profilesRes, leadsRes, enrollmentsRes] = await Promise.all([
        supabase.from("profiles").select("created_at").gte("created_at", since),
        supabase
          .from("prospective_users")
          .select("created_at, message, course_interest")
          .gte("created_at", since),
        supabase.from("enrollments").select("enrolled_at").gte("enrolled_at", since),
      ]);

      const base = buildEmptySeries();
      const idx = new Map(base.map((p, i) => [p.date, i]));

      profilesRes.data?.forEach((r: any) => {
        const i = idx.get(dateKey(r.created_at));
        if (i !== undefined) base[i].signups += 1;
      });
      leadsRes.data?.forEach((r: any) => {
        const i = idx.get(dateKey(r.created_at));
        if (i !== undefined) base[i].leads += 1;
      });
      enrollmentsRes.data?.forEach((r: any) => {
        const i = idx.get(dateKey(r.enrolled_at));
        if (i !== undefined) base[i].enrollments += 1;
      });

      const sourceMap = new Map<string, number>();
      const interestMap = new Map<string, number>();
      leadsRes.data?.forEach((r: any) => {
        const s = inferSource(r.message);
        sourceMap.set(s, (sourceMap.get(s) ?? 0) + 1);
        const c = r.course_interest || "Unspecified";
        interestMap.set(c, (interestMap.get(c) ?? 0) + 1);
      });

      const totalSignups = profilesRes.data?.length ?? 0;
      const totalLeads = leadsRes.data?.length ?? 0;
      const totalEnrollments = enrollmentsRes.data?.length ?? 0;
      const conv = totalLeads > 0 ? Math.round((totalSignups / totalLeads) * 100) : 0;

      setSeries(base);
      setTotals({
        signups: totalSignups,
        leads: totalLeads,
        enrollments: totalEnrollments,
        conversion: conv,
      });
      setSources(
        Array.from(sourceMap.entries())
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
      );
      setCourseInterest(
        Array.from(interestMap.entries())
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 8)
      );
      setLoading(false);
    })();
  }, []);

  const formatTick = (v: string) => v.slice(5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Analytics</h2>
          <p className="text-muted-foreground">Last {DAYS} days · app conversions and lead sources</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={<MailQuestion className="h-4 w-4 text-muted-foreground" />}
            title="Leads (Contact form)"
            value={totals.leads}
            hint="Prospective submissions"
            loading={loading}
          />
          <MetricCard
            icon={<UserPlus className="h-4 w-4 text-muted-foreground" />}
            title="Signups"
            value={totals.signups}
            hint="New profiles created"
            loading={loading}
          />
          <MetricCard
            icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
            title="Enrollments"
            value={totals.enrollments}
            hint="Students enrolled"
            loading={loading}
          />
          <MetricCard
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            title="Lead → Signup"
            value={`${totals.conversion}%`}
            hint="Conversion rate"
            loading={loading}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity over time</CardTitle>
            <CardDescription>Daily leads, signups, and enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tickFormatter={formatTick} stroke="hsl(var(--muted-foreground))" />
                  <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="leads" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="signups" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="enrollments" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Traffic sources (inferred)</CardTitle>
              <CardDescription>Based on lead message content</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-[260px] w-full" />
              ) : sources.length === 0 ? (
                <EmptyHint text="No leads yet in this range." />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={sources} dataKey="value" nameKey="name" outerRadius={90} label>
                      {sources.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top course interest</CardTitle>
              <CardDescription>From lead submissions</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-[260px] w-full" />
              ) : courseInterest.length === 0 ? (
                <EmptyHint text="No course interest data yet." />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={courseInterest} layout="vertical" margin={{ left: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" allowDecimals={false} stroke="hsl(var(--muted-foreground))" />
                    <YAxis type="category" dataKey="name" width={120} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-start gap-3 space-y-0">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <CardTitle className="text-base">About these metrics</CardTitle>
              <CardDescription className="mt-1">
                Site visit and pageview metrics live in Lovable's production analytics and aren't available to the
                browser. The numbers above come from your own database: leads from the contact form, signups from new
                profiles, and enrollments from the enrollments table. Traffic sources are inferred from message content
                — for precise attribution, add a "How did you hear about us?" field to the contact form.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </AdminLayout>
  );
}

function MetricCard({
  icon,
  title,
  value,
  hint,
  loading,
}: {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  hint: string;
  loading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        <p className="text-xs text-muted-foreground mt-1">{hint}</p>
      </CardContent>
    </Card>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div className="h-[260px] flex items-center justify-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}
