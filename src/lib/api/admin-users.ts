import { ApiError } from "@/lib/api/client";
import { adminRequest, type ApiEnvelope } from "@/lib/api/admin-request";
import { toApiMutationError } from "@/lib/api/mutation-error";
import { toStoredMediaPath } from "@/lib/media-url";

export type ApiManagedUser = {
  id: number;
  name: string;
  public_name: string | null;
  email: string;
  status: string;
  slug: string | null;
  author_title: string | null;
  bio: string | null;
  image: string | null;
  last_seen_at: string | null;
  roles: { id: number; name: string; slug: string }[];
  permissions: string[];
  is_super_admin: boolean;
};

export type ManagedUserRecord = {
  id: number;
  name: string;
  publicName: string;
  email: string;
  status: string;
  slug: string;
  authorTitle: string;
  bio: string;
  image: string;
  lastSeenAt: string | null;
  roles: { id: number; name: string; slug: string }[];
  isSuperAdmin: boolean;
};

export type ManagedUserFormInput = {
  name: string;
  public_name: string;
  email: string;
  password: string;
  status: "active" | "inactive";
  slug: string;
  author_title: string;
  bio: string;
  image: string;
  role_ids: number[];
};

export type AdminMutationResult<T = ManagedUserRecord> =
  | { ok: true; data: T }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

function mapManagedUser(raw: ApiManagedUser): ManagedUserRecord {
  return {
    id: raw.id,
    name: raw.name,
    publicName: raw.public_name ?? "",
    email: raw.email,
    status: raw.status,
    slug: raw.slug ?? "",
    authorTitle: raw.author_title ?? "",
    bio: raw.bio ?? "",
    image: raw.image ?? "",
    lastSeenAt: raw.last_seen_at,
    roles: raw.roles ?? [],
    isSuperAdmin: raw.is_super_admin ?? false,
  };
}

function toMutationError(error: unknown): AdminMutationResult {
  return toApiMutationError(error);
}

export async function fetchAdminUsersList(): Promise<ManagedUserRecord[]> {
  const json = await adminRequest<ApiManagedUser[]>("/admin/users");
  return json.data.map(mapManagedUser);
}

export async function fetchAdminUserById(
  id: number,
): Promise<ManagedUserRecord | null> {
  try {
    const json = await adminRequest<ApiManagedUser>(`/admin/users/${id}`);
    return mapManagedUser(json.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createAdminUser(
  payload: ManagedUserFormInput,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiManagedUser>("/admin/users", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapManagedUser(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function updateAdminUser(
  id: number,
  payload: Partial<ManagedUserFormInput>,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiManagedUser>(`/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapManagedUser(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function deleteAdminUser(
  id: number,
): Promise<AdminMutationResult<void>> {
  try {
    await adminRequest<null>(`/admin/users/${id}`, { method: "DELETE" });
    return { ok: true, data: undefined as void };
  } catch (error) {
    return toMutationError(error) as AdminMutationResult<void>;
  }
}

export function toManagedUserFormInput(
  user: ManagedUserRecord,
): ManagedUserFormInput {
  return {
    name: user.name,
    public_name: user.publicName,
    email: user.email,
    password: "",
    status: user.status === "inactive" ? "inactive" : "active",
    slug: user.slug,
    author_title: user.authorTitle,
    bio: user.bio,
    image: toStoredMediaPath(user.image),
    role_ids: user.roles.map((role) => role.id),
  };
}
