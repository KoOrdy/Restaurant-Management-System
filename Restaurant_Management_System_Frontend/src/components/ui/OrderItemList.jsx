const OrderItemList = ({ items }) => (
  <div>
    <h3 className="font-medium text-gray-700 mb-2">Items:</h3>
    <ul className="space-y-1">
      {items.map((item, idx) => (
        <li key={idx} className="text-sm text-gray-600">
          • {item.menuItemName} × {item.quantity}
        </li>
      ))}
    </ul>
  </div>
);

export default OrderItemList;
