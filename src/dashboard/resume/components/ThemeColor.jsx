import React, { useContext } from 'react'
import * as Popover from '@/components/ui/popover';
import { LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';


function ThemeColor() {
    const colors=[
        "#ff6666",
   "#33FF57", // Vibrant Green
    "#3357FF", // Electric Blue
    "#FF33A1", // Hot Pink
    "#A133FF", // Deep Purple
    "#33FFF6", // Cyan/Aqua
    "#FFD700", // Gold
    "#FF8C00", // Dark Orange
    "#00CED1", // Dark Turquoise
    "#FF1493", // Deep Pink

    // Earthy/Muted Tones
    "#8B4513", // Saddle Brown
    "#6B8E23", // Olive Drab
    "#B0C4DE", // Light Steel Blue
    "#A0522D", // Sienna
    "#708090", // Slate Gray
    "#D2B48C", // Tan
    "#BC8F8F", // Rosy Brown
    "#4682B4", // Steel Blue
    "#8FBC8F", // Dark Sea Green
    "#CD853F", // Peruvian Gold

    // Pastel/Light Colors
    "#ADD8E6", // Light Blue
    "#F08080", // Light Coral
    "#98FB98", // Pale Green
    "#FFFFE0", // Light Yellow
    "#E6E6FA", // Lavender
    "#DDA0DD", // Plum
    "#AFEEEE", // Pale Turquoise
    "#F0F8FF", // Alice Blue
    "#FAEBD7", // Antique White
    "#E0FFFF", // Light Cyan
     
    ]

    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div>
        <Popover.Root>
      {/* Trigger button */}
      <Popover.Trigger asChild>
        <Button className='rounded-lg flex gap-2 border border-gray-300 p-2 ' variant="outline" size="sm">
                  <LayoutGrid/>Theme
                </Button>
      </Popover.Trigger>

      {/* Popover Content */}
      <Popover.Portal>
        <Popover.Content
          className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
          sideOffset={5} // distance from trigger
        >
          <p className="text-sm text-gray-800">Select theme color</p>
          <Popover.Close
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
    </div>
  )
}

export default ThemeColor
