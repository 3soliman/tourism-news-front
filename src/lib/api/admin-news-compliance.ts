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

const DUPLICATE_ERROR_KEYS = new Set(["unique_title", "similar_content"]);

export function getBlockingComplianceIssue(
  report: ArticleComplianceReport,
  publishing: boolean,
  excludeArticleId?: number,
): string | null {
  const duplicateError = report.checks.find((check) => {
    if (check.level !== "error" || !DUPLICATE_ERROR_KEYS.has(check.key)) {
      return false;
    }

    if (!excludeArticleId) {
      return true;
    }

    if (check.matches.length === 0) {
      return false;
    }

    return check.matches.some((match) => match.id !== excludeArticleId);
  });

  if (duplicateError) {
    return duplicateError.message;
  }

  if (publishing && !report.can_publish) {
    return report.summary;
  }

  return null;
}

export async function validateArticleCompliance(
  payload: ValidateArticleComplianceInput,
  excludeArticleId?: number,
): Promise<ArticleComplianceReport> {
  const json = await adminRequest<ArticleComplianceReport>("/admin/news/validate", {
    method: "POST",
    body: JSON.stringify(
      excludeArticleId
        ? { ...payload, exclude_article_id: excludeArticleId }
        : payload,
    ),
  });

  return json.data;
}

export async function validateArticleComplianceSafe(
  payload: ValidateArticleComplianceInput,
  excludeArticleId?: number,
): Promise<
  | { ok: true; data: ArticleComplianceReport }
  | { ok: false; message: string; offline?: boolean }
> {
  try {
    const data = await validateArticleCompliance(payload, excludeArticleId);

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
