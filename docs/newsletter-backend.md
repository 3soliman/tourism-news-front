# Newsletter Backend Contract

The frontend is wired to these Laravel API endpoints.

## Public

`POST /api/newsletter/subscribers`

Request:

```json
{
  "email": "reader@example.com",
  "name": null,
  "source": "footer"
}
```

Response:

```json
{
  "success": true,
  "message": "تم الاشتراك بنجاح.",
  "data": {
    "id": 1,
    "email": "reader@example.com"
  }
}
```

## Admin

All admin routes use the existing Bearer token.

`GET /api/admin/newsletter`

Expected response data:

```json
{
  "stats": {
    "subscribers_total": 0,
    "subscribers_active": 0,
    "campaigns_total": 0,
    "sent_today": 0,
    "open_rate": 0
  },
  "subscribers": [],
  "campaigns": [],
  "settings": {
    "provider": "Brevo",
    "from_email": "name@example.com",
    "from_name": "Site Name",
    "is_enabled": true
  }
}
```

`POST /api/admin/newsletter/campaigns`

For a manual newsletter:

```json
{
  "subject": "عنوان الرسالة",
  "preheader": "نص تمهيدي",
  "body": "محتوى الرسالة",
  "send_now": true
}
```

For a news article notification:

```json
{
  "article_id": 12,
  "subject": "عنوان الإشعار",
  "preheader": "ملخص الخبر",
  "send_now": true
}
```

## Brevo Environment

Keep these values in Laravel `.env`, not in frontend code:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
MAIL_USERNAME=your-brevo-smtp-user
MAIL_PASSWORD=your-brevo-smtp-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-from-email
MAIL_FROM_NAME="SKN System"
```

Do not commit real SMTP passwords to Git.
