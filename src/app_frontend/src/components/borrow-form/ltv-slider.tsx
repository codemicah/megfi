"use client";

import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

interface LTVSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function LTVSlider({ value, onChange }: LTVSliderProps) {
  const getZoneColor = (currentValue: number) => {
    if (currentValue < 30) return 'bg-green-500';
    if (currentValue < 50) return 'bg-yellow-500';
    if (currentValue < 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="relative pt-6 pb-8">
      <div className="absolute w-full flex justify-between text-xs text-gray-400 -top-1">
        <span>Conservative</span>
        <span>Moderate</span>
        <span>Aggressive</span>
        <span>Liquidation</span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        max={100}
        step={0.01}
      >
        <Slider.Track className="bg-white/10 relative grow rounded-full h-2">
          <Slider.Range className={cn(
            "absolute h-full rounded-full",
            getZoneColor(value)
          )} />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Slider.Root>
      <div className="absolute w-full flex justify-between mt-2 text-xs text-gray-400">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
  );
}