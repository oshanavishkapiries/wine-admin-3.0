import { Order, Product } from "@/types/order";

interface OrderType {
    order: Order;
}

const tax = 10; // Example tax percentage
const memberDiscountPercentage = 0;
const item6DiscountPercentage = 10;
const item12DiscountPercentage = 15;

export const getOrderData = async ({ order }: OrderType) => {
    const subtotal: number = await getSubtotal({ order });
    const totalItemQuantity: number = await getTotalItemQuantity({ order });
    const specialDiscount: number = await getSpecialDiscount({ order });
    const bottleDiscount: number = specialDiscount > 0 ? 0 : await getBottleDiscount({ totalItemQuantity, subtotal });
    const memberDiscount: number = await getMemberDiscount({ subtotal, specialDiscount, bottleDiscount });
    const totalDiscount: number = await getTotalDiscount({ specialDiscount, bottleDiscount, memberDiscount });
    const taxPrice: number = await getTax({ subtotal });
    const total: number = await getTotal({ subtotal, totalDiscount, taxPrice });

    return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        totalItemQuantity,
        specialDiscount: parseFloat(specialDiscount.toFixed(2)),
        bottleDiscount: parseFloat(bottleDiscount.toFixed(2)),
        memberDiscount: { price: parseFloat(memberDiscount.toFixed(2)), percentage: memberDiscountPercentage },
        totalDiscount: parseFloat(totalDiscount.toFixed(2)),
        tax: { tax: parseFloat(taxPrice.toFixed(2)), percentage: tax },
        total: parseFloat(total.toFixed(2))
    };
};

const getSubtotal = async ({ order }: OrderType) => {
    const subtotal = order?.products?.reduce((total: number, item: Product) => {
        const packPrice = item?.isPack ? item?.product?.pack?.find((pack: any) => pack.packSize === item?.packSize)?.packPrice || 0 : 0;
        return total + (item?.isPack ? packPrice * item.quantity : item.product.unitPrice * item.quantity);
    }, 0);
    return subtotal || 0;
};

const getTotalItemQuantity = async ({ order }: OrderType) => {
    return order?.products?.reduce((total: number, item: Product) => {
        const packBottleCount = item?.isPack ? item?.packSize || 1 : 1;
        return total + item.quantity * packBottleCount;
    }, 0) || 0;
};

const getSpecialDiscount = async ({ order }: OrderType) => {
    return order?.products?.reduce((total: number, item: Product) => {
        if (item?.isPack) {
            const packPrice = item?.product?.pack?.find((pack: any) => pack.packSize === item?.packSize)?.packPrice || 0;
            return total + ((item?.product?.packDiscount > 0) ? (packPrice * item.product.packDiscount / 100) * item.quantity : 0);
        }
        return total + ((item?.product?.unitDiscount > 0) ? (item.product.unitPrice * item.product.unitDiscount / 100) * item.quantity : 0);
    }, 0) || 0;
};

const getBottleDiscount = async ({ totalItemQuantity, subtotal }: { totalItemQuantity: number, subtotal: number }) => {
    return totalItemQuantity >= 6
        ? totalItemQuantity >= 12
            ? subtotal * (item12DiscountPercentage / 100)
            : subtotal * (item6DiscountPercentage / 100)
        : 0;
};

const getMemberDiscount = async ({ subtotal, specialDiscount, bottleDiscount }: { subtotal: number, specialDiscount: number, bottleDiscount: number }) => {
    if (memberDiscountPercentage === 0) return 0;
    let discountBase = subtotal - Math.max(specialDiscount, bottleDiscount);
    return discountBase * (memberDiscountPercentage / 100);
};

const getTotalDiscount = async ({ specialDiscount, bottleDiscount, memberDiscount }: { specialDiscount: number, bottleDiscount: number, memberDiscount: number }) => {
    return parseFloat(specialDiscount.toFixed(2)) + parseFloat(bottleDiscount.toFixed(2)) + parseFloat(memberDiscount.toFixed(2));
};

const getTax = async ({ subtotal }: { subtotal: number }) => {
    return subtotal * (tax / 100);
};

const getTotal = async ({ subtotal, totalDiscount, taxPrice }: { subtotal: number, totalDiscount: number, taxPrice: number }) => {
    return parseFloat(subtotal.toFixed(2)) - parseFloat(totalDiscount.toFixed(2)) + parseFloat(taxPrice.toFixed(2));
};



