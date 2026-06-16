export type NewsArticle = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  countrySlug: string;
  countryName?: string;
  countryFlag?: string;
  destination?: string;
  authorSlug: string;
  authorName?: string;
  image: string;
  publishedAt: string;
  publishedAtISO: string;
  updatedAtISO: string;
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  content: string[];
  viewsCount: number;
};

export type Category = {
  id?: number;
  slug: string;
  label: string;
  description: string;
  sortOrder?: number;
  isActive?: boolean;
  articlesCount?: number;
  seoTitle?: string;
  seoDescription?: string;
};

export type Author = {
  id?: number;
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  isActive?: boolean;
  articlesCount?: number;
};

export type Country = {
  id?: number;
  slug: string;
  name: string;
  flag: string;
  region: string;
  code?: string;
  isActive?: boolean;
  image?: string;
  articlesCount?: number;
  destinationsCount?: number;
};

export type Destination = {
  id: number;
  name: string;
  slug: string;
  country: string;
  description: string;
  image: string;
  articlesCount: number;
  bestTime: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  logo: string;
  defaultImage: string;
  backgroundImages: string[];
  author: string;
};

export type PaginationMeta = {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
};

export type ApiAdminSeo = {
  title?: string;
  description?: string;
  focus_keyword?: string;
  keywords?: string[];
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  robots_index?: boolean;
  robots_follow?: boolean;
  schema_status?: string;
  google_news_enabled?: boolean;
  google_news_status?: string;
};

export type ApiAdminNewsArticle = ApiNewsArticle & {
  category_id?: number;
  author_id?: number;
  country_id?: number | null;
  status?: string;
  seo?: ApiAdminSeo;
  google_news?: {
    enabled?: boolean;
    status?: string;
  };
  analytics?: {
    views_count?: number;
    views_today?: number;
    last_viewed_at?: string | null;
  };
};

export type AdminNewsFormInput = {
  title: string;
  slug: string;
  excerpt: string;
  content_paragraphs: string[];
  category_id: number;
  author_id: number;
  country_id: number | null;
  image: string;
  destination: string;
  status: string;
  published_at: string;
  reading_time: string;
  seo_title: string;
  seo_description: string;
  focus_keyword: string;
  keywords: string[];
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  robots_index: boolean;
  robots_follow: boolean;
  schema_status: string;
  is_google_news_enabled: boolean;
  google_news_status: string;
};

export type AdminNewsPayload = Omit<AdminNewsFormInput, "published_at"> & {
  published_at: string | null;
};

export type AdminNewsCreatePayload = Omit<AdminNewsPayload, "author_id">;

export type ApiNewsArticle = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  content_paragraphs?: string[];
  category?: string;
  category_slug?: string;
  country?: string;
  country_slug?: string;
  country_flag?: string;
  author?: string;
  author_slug?: string;
  image: string;
  destination?: string;
  reading_time?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  published_at_iso?: string;
  updated_at_iso?: string;
  views_count?: number;
  related?: ApiNewsArticle[];
};

export type ApiCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
  articles_count?: number;
  seo?: {
    title?: string;
    description?: string;
  };
};

export type AdminCategoryFormInput = {
  name: string;
  slug: string;
  description: string;
  sort_order: number;
  is_active: boolean;
  seo_title: string;
  seo_description: string;
};

export type ApiAuthor = {
  id: number;
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  image?: string;
  is_active?: boolean;
  articles_count?: number;
};

export type AdminAuthorFormInput = {
  name: string;
  slug: string;
  role: string;
  bio: string;
  image: string;
  is_active: boolean;
};

export type AdminUser = {
  id: number;
  name: string;
  public_name?: string | null;
  display_name?: string;
  email: string;
  status: string;
  slug?: string | null;
  author_title?: string | null;
  roles: {
    id: number;
    name: string;
    slug: string;
  }[];
  permissions: string[];
  is_super_admin: boolean;
};

export type ApiCountry = {
  id: number;
  name: string;
  slug: string;
  flag?: string;
  region?: string;
  code?: string;
  image?: string;
  is_active?: boolean;
  articles_count?: number;
  destinations_count?: number;
};

export type AdminCountryFormInput = {
  name: string;
  slug: string;
  code: string;
  flag: string;
  image: string;
  region: string;
  is_active: boolean;
};

export type UploadedMedia = {
  id: number;
  url: string;
  path: string;
  filename: string;
  mime_type?: string;
  size?: number;
  alt_text?: string;
};

export type ApiDestination = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  best_time?: string;
  country?: string;
};

export type ApiSiteSettings = {
  grouped?: Record<string, Record<string, string>>;
  flat?: Record<string, string>;
};

export type ApiPage = {
  id: number;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  is_published?: boolean;
  seo?: {
    title?: string;
    description?: string;
  };
  links?: {
    website?: string;
  };
};

export type TrustPage = {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
  websiteUrl?: string;
};

export type AdminPageFormInput = {
  title: string;
  description: string;
  content: string;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
};
