const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8070/api";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      name?: string;
      source?: string;
    };
    const email = body.email?.trim().toLowerCase() ?? "";

    if (!isValidEmail(email)) {
      return Response.json(
        { success: false, message: "أدخل بريدًا إلكترونيًا صحيحًا." },
        { status: 422 },
      );
    }

    const response = await fetch(`${API_URL}/newsletter/subscribers`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name: body.name?.trim() || null,
        source: body.source?.trim() || "website",
      }),
    });

    const json = await response.json().catch(() => ({
      success: response.ok,
      message: response.ok
        ? "تم الاشتراك بنجاح."
        : "تعذر تسجيل الاشتراك.",
    }));

    return Response.json(json, { status: response.status });
  } catch {
    return Response.json(
      {
        success: false,
        message: "تعذر الاتصال بخدمة النشرة البريدية.",
      },
      { status: 503 },
    );
  }
}
