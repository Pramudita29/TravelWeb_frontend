interface PriceProps {
    normalPrice: string;
    numPersons: number;
}

const Price: React.FC<PriceProps> = ({ normalPrice, numPersons }) => {
    const numericPart = normalPrice.replace(/[^0-9.,]+/g, '').replace(/,/g, '');
    const parsedNormalPrice = parseFloat(numericPart);
    const validNormalPrice = !isNaN(parsedNormalPrice) ? parsedNormalPrice : 0;
    const totalPrice = validNormalPrice * numPersons;

    return (
        <div className="price">
            <p>Price (Per Person)</p>
            <p>Amount: NPR {validNormalPrice.toFixed(2)} * ({numPersons}) = NPR {totalPrice.toFixed(2)}</p>
            <p>Total Amount: NPR {totalPrice.toFixed(2)}</p>
        </div>
    );
};

export default Price;
