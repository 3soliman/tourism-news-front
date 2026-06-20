import { adminRequest } from "@/lib/api/admin-request";
import { toApiMutationError } from "@/lib/api/mutation-error";
import type { AdminNewsPayload } from "@/types";

export type ComplianceLevel = "pass" | "warn" | "error";

export type ComplianceMatch = {
  id: number;
  title: string;
  slug: string;
  status: string;
  similarity: number;
  matched_on: string;
  url: string;
};

export type ComplianceCheck = {
  key: string;
  level: ComplianceLevel;
  message: string;
  matches: ComplianceMatch[];
};

export type ArticleComplianceReport = {
  score: number;
  can_publish: boolean;
  google_news_ready: boolean;
  word_count: number;
  summary: string;
  checks: ComplianceCheck[];
  similar_articles: ComplianceMatch[];
  errors: Record<string, string[]>;
};

export type ValidateArticleComplianceInput = Partial<AdminNewsPayload> & {
  exclude_article_id?: number;
};

export async function validateArticleCompliance(
  payload: ValidateArticleComplianceInput,
): Promise<ArticleComplianceReport> {
  const json = await adminRequest<ArticleComplianceReport>("/admin/news/validate", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return json.data;
}

export async function validateArticleComplianceSafe(
  payload: ValidateArticleComplianceInput,
): Promise<
  | { ok: true; data: ArticleComplianceReport }
  | { ok: false; message: string; offline?: boolean }
> {
  try {
    const data = await validateArticleCompliance(payload);

    return { ok: true, data };
  } catch (error) {
    const failure = toApiMutationError(error);

    return {
      ok: false,
      message: failure.message,
      offline: failure.offline,
    };
  }
}
