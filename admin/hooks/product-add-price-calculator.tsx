import { useEffect, useState } from "react";

export const useProductAddPriceCalculator = () => {
    const [caseCount, setCaseCount] = useState('');
    const [bottleCountPerCase, setBottleCountPerCase] = useState('');
    const [perCaseBuyingCost, setPerCaseBuyingCost] = useState('');
    const [plus, setPlus] = useState('');
    const [perBottleCost, setPerBottleCost] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [qty, setQty] = useState('');

   
    const calculateCosts = () => {
        const numBottleCount = Number(bottleCountPerCase);
        const numPerCaseCost = Number(perCaseBuyingCost);
        const numPlus = Number(plus);
        const numCaseCount = Number(caseCount);

        if (numBottleCount > 0) {
            const bottleCost = numPerCaseCost / numBottleCount;
            setPerBottleCost(bottleCost.toFixed(2));
            setQty(((numCaseCount * numBottleCount)+numPlus).toString());
        }
        setTotalCost(((Number(perBottleCost)*numPlus)+(numCaseCount * numPerCaseCost)).toFixed(2).toString());
    };

    useEffect(() => {
        calculateCosts();
    }, [bottleCountPerCase, perCaseBuyingCost, plus, caseCount]);

    return {
        qty,
        setQty,
        caseCount,
        setCaseCount,
        bottleCountPerCase,
        setBottleCountPerCase,
        perCaseBuyingCost,
        setPerCaseBuyingCost,
        plus,
        setPlus,
        perBottleCost,
        totalCost,
        setPerBottleCost,
        setTotalCost
    };
};
