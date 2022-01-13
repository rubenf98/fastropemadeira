<?php

namespace App\Jobs;

use App\Mail\NotifyFeedback as MailNotifyFeedback;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class NotifyFeedback implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $record;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($aRecord)
    {
        $this->record = $aRecord;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to("info@fastropemadeira.com")->queue(new MailNotifyFeedback($this->record));
    }
}
