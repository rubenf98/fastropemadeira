<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tracker extends Model
{
    use HasFactory;

    public static function add($aValue, $aType)
    {
        $record = self::where('name', "total_balance")->first();
        $record->value += $aValue;
        $record->save();

        $typeRecord = self::where('name', $aType)->first();
        $typeRecord->value += $aValue;
        $typeRecord->save();
    }

    public static function updateValues($oldValue, $newValue, $oldType, $newType)
    {
        $record = self::where('name', "total_balance")->first();
        $record->value += ((float)$newValue - (float)$oldValue);
        $record->save();

        $oldTypeRecord = self::where('name', $oldType)->first();
        $oldTypeRecord->value -= $oldValue;
        $oldTypeRecord->save();

        $newTypeRecord = self::where('name', $newType)->first();
        $newTypeRecord->value += $newValue;
        $newTypeRecord->save();
    }
}
