import { adminRequest } from "@/lib/api/admin-request";
import { toApiMutationError } from "@/lib/api/mutation-error";

export type NewsletterStats = {
  subscribers_total: number;
  subscribers_active: number;
  campaigns_total: number;
  sent_today: number;
  open_rate?: number;
};

export type NewsletterSubscriber = {
  id: number;
  email: string;
  name?: string | null;
  status: "active" | "unsubscribed" | "bounced" | string;
  source?: string | null;
  subscribed_at?: string | null;
  last_sent_at?: string | null;
};

export type NewsletterCampaign = {
  id: number;
  subject: string;
  status: "draft" | "queued" | "sent" | "failed" | string;
  article_title?: string | null;
  recipients_count?: number;
  sent_count?: number;
  failed_count?: number;
  created_at?: string | null;
  sent_at?: string | null;
};

export type NewsletterSettings = {
  provider: string;
  from_email: string;
  from_name: string;
  is_enabled: boolean;
};

export type AdminNewsletterOverview = {
  stats: NewsletterStats;
  subscribers: NewsletterSubscriber[];
  campaigns: NewsletterCampaign[];
  settings: NewsletterSettings;
};

export type NewsletterCampaignInput = {
  article_id?: number;
  subject: string;
  preheader?: string;
  body?: string;
  send_now: boolean;
};

export type NewsletterMutationResult<T = NewsletterCampaign> =
  | { ok: true; data: T }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

function emptyOverview(): AdminNewsletterOverview {
  return {
    stats: {
      subscribers_total: 0,
      subscribers_active: 0,
      campaigns_total: 0,
      sent_today: 0,
    },
    subscribers: [],
    campaigns: [],
    settings: {
      provider: "Brevo",
      from_email: "",
      from_name: "",
      is_enabled: false,
    },
  };
}

export async function fetchAdminNewsletterOverview() {
  try {
    const json = await adminRequest<AdminNewsletterOverview>("/admin/newsletter");
    return json.data;
  } catch {
    return emptyOverview();
  }
}

export async function sendNewsletterCampaign(
  payload: NewsletterCampaignInput,
): Promise<NewsletterMutationResult> {
  try {
    const json = await adminRequest<NewsletterCampaign>(
      "/admin/newsletter/campaigns",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    );

    return { ok: true, data: json.data };
  } catch (error) {
    return toApiMutationError(error) as NewsletterMutationResult;
  }
}
