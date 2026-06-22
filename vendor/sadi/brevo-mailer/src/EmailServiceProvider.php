<?php

namespace Sadi\BrevoMailer;

use Illuminate\Support\ServiceProvider;

class EmailServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(SendMailService::class, function () {
            return new SendMailService();
        });
    }

    public function boot() {}
}
