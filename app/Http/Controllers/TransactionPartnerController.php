<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionPartnerResource;
use App\Models\TransactionPartner;
use Illuminate\Http\Request;

class TransactionPartnerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TransactionPartnerResource::collection(TransactionPartner::all());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TransactionPartner  $transactionPartner
     * @return \Illuminate\Http\Response
     */
    public function show(TransactionPartner $transactionPartner)
    {
        return new TransactionPartnerResource($transactionPartner);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TransactionPartner  $transactionPartner
     * @return \Illuminate\Http\Response
     */
    public function edit(TransactionPartner $transactionPartner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TransactionPartner  $transactionPartner
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TransactionPartner $transactionPartner)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TransactionPartner  $transactionPartner
     * @return \Illuminate\Http\Response
     */
    public function destroy(TransactionPartner $transactionPartner)
    {
        //
    }
}
