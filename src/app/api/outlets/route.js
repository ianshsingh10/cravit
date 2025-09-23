import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    try {
        const sellers = await User.find({ role: 'seller' }).lean();

        const outlets = await Promise.all(sellers.map(async (seller) => {
            // ✅ FETCH FULL ITEM OBJECTS
            const items = await Item.find({ 
                sellerId: seller._id,
                availability: true 
            })
            .sort({ rating: -1 })
            .limit(4) // Get up to 4 items for the preview
            .lean(); // Use .lean() for faster, plain JS objects

            return {
                _id: seller._id.toString(),
                name: seller.name,
                items: items // Return the full item objects
            };
        }));

        return NextResponse.json(outlets);

    } catch (err) {
        console.error("Error fetching outlets:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}