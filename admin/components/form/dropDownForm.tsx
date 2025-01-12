"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface DropDownFormProps {
  className?: string;
  title?: string;
  options?: string[];
  defaultSelectedOption?: string;
  required?: boolean;
  onChange?: (value: string) => void; 
}

export default function DropDownForm({
  className,
  title = "Select an option", 
  options = [], 
  defaultSelectedOption, 
  required = false,
  onChange,
}: DropDownFormProps) {
  const [selectedOption, setSelectedOption] = useState(defaultSelectedOption || title);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option); 
    if (onChange) {
      onChange(option); 
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          {selectedOption} {required && <span className="text-red-500">*</span>}
          <ChevronDown
            className="-me-1 ms-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width]">
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleOptionClick(option)}
            className={option === selectedOption ? "bg-accent" : ""} 
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}