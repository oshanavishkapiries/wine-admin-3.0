'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import Promocode from './promocode';
import CategoryDiscount from './category';
import { useState } from 'react';
import ProductModel from './productmodel';

export default function AddDropDown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          + Add Discount
          <ChevronDown
            className="-me-1 ms-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width]">
        <Promocode mode="add">
          <div onMouseDown={(e) => e.preventDefault()}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Promo Code
            </DropdownMenuItem>
          </div>
        </Promocode>

        <CategoryDiscount mode="add">
          <div onMouseDown={(e) => e.preventDefault()}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Category
            </DropdownMenuItem>
          </div>
        </CategoryDiscount>

        <ProductModel mode="add">
          <div onMouseDown={(e) => e.preventDefault()}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Product
            </DropdownMenuItem>
          </div>
        </ProductModel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
