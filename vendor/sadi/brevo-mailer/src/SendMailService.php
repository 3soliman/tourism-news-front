<?php

namespace Sadi\BrevoMailer;

use Illuminate\Support\Facades\Http;

class SendMailService
{
    public function sendMail($api, $senderName = "", $senderMail, $toMails, $subject, $htmlBodyContent)
    {
        $apiKey = $api;
        $response = Http::withHeaders([
            'api-key' => $apiKey,
            'Content-Type' => 'application/json'
        ])->post('https://api.brevo.com/v3/smtp/email', [
            'sender' => [
                'name' => $senderName,
                'email' => $senderMail,
            ],
            'to' => $toMails,
            'subject' => $subject,
            'htmlContent' => $htmlBodyContent
        ]);

        if ($response->successful()) {
            return response()->json([
                "message" => "Email Sent",
                "status" => 200,
                "response" => $response->json()
            ]);
        } else {
            return response()->json([
                "message" => "Failed to send email",
                "status" => 400,
                "response" => $response->json()
            ]);
        }
    }
}
