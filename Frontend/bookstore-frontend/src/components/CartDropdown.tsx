import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

interface CartDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDropdown = ({ isOpen, onClose }: CartDropdownProps) => {
    const { items, removeFromCart, totalItems, updateQuantity, totalPrice } = useCart();

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-lg">Shopping Cart</h3>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            Your cart is empty
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex gap-3 p-4 border-b border-gray-100">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-12 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">{item.title}</p>
                                    <p className="text-blue-600 font-semibold">{item.price} ₴</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-6 h-6 bg-gray-100 rounded hover:bg-gray-200 text-gray-900"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-medium text-black">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-6 h-6 bg-gray-100 rounded hover:bg-gray-200 text-gray-900"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-2 text-red-500 text-sm hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 mb-3">
                            Items in cart: <span className="font-medium text-gray-900">{totalItems}</span>
                        </p>
                        <div className="flex justify-between items-baseline mb-4">
                            <span className="text-sm font-medium text-gray-500">Total:</span>
                            <span className="text-xl font-semibold text-gray-900">{totalPrice} ₴</span>
                        </div>
                        <Link
                            to="/order"
                            onClick={onClose}
                            className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Make an order
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};