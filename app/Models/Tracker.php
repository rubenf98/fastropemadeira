<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tracker extends Model
{
    use HasFactory;

    public static function add($tracker, $aValue)
    {
        $record = self::find($tracker);
        $record->value += $aValue;
        $record->save();

        // $typeRecord = self::where('name', $aType)->first();
        // $typeRecord->value += $aValue;
        // $typeRecord->save();
    }

    public static function updateValues($tracker, $oldValue, $newValue, $oldType, $newType)
    {
        $record = self::where('name', $tracker)->first();
        $record->value += ((float) $newValue - (float) $oldValue);
        $record->save();

        $oldTypeRecord = self::where('name', $oldType)->first();
        $oldTypeRecord->value -= $oldValue;
        $oldTypeRecord->save();

        $newTypeRecord = self::where('name', $newType)->first();
        $newTypeRecord->value += $newValue;
        $newTypeRecord->save();
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
