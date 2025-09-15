import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart"; // Import your new Cart model
import Item from "@/models/items";   // We need the Item model to get accurate data
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
    await dbConnect();

    try {
        const cookie = await cookies();
        const token = cookie.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { itemId, quantity, service } = await req.json();

        if (!itemId || !quantity || !service) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        // 3. Fetch the item from the database to get trustworthy data (price, name, etc.)
        const item = await Item.findById(itemId);
        if (!item) {
            return NextResponse.json({ error: "Item not found." }, { status: 404 });
        }

        // 4. Check if this exact item (with the same service type) is already in the user's cart
        let cartItem = await Cart.findOne({ userId, itemId, service });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            // If it doesn't exist, create a new cart item
            cartItem = new Cart({
                userId,
                itemId,
                itemName: item.itemName,
                price: item.price,
                quantity,
                service,
                sellerName: item.sellerName
            });
        }

        // 5. Save the new or updated item and respond
        await cartItem.save();
        return NextResponse.json({ message: "Item added to cart successfully!", cartItem });

    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return NextResponse.json({ error: "Unauthorized: Invalid token." }, { status: 401 });
        }
        console.error("Add to cart error:", err);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}