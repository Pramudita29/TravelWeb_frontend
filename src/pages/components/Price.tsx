interface PriceProps {
    normalPrice: string; // The price is a string in the format "NPR 1,000 (Per day)"
    numPersons: number;
}

const Price: React.FC<PriceProps> = ({ normalPrice, numPersons }) => {
    // Extract the numeric part from the price string
    const numericPart = normalPrice.replace(/[^0-9.,]+/g, '').replace(/,/g, '');
    // Parse the numeric part of the price string to a float for calculation
    const parsedNormalPrice = parseFloat(numericPart);
    // Check if parsedNormalPrice is a valid number, otherwise default to 0
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
