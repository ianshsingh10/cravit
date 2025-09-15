import dbConnect from "@/lib/dbConnect";
import Item from "@/models/items";
import Seller from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    await dbConnect();

    try {
        const params = await context.params;
        const slug = params.slug;
        
        if (!slug) {
            return NextResponse.json({ error: "Seller slug is required." }, { status: 400 });
        }

        const sellerName = slug.replace(/-/g, " ");
        const regex = new RegExp(`^${sellerName}$`, "i");

        const seller = await Seller.findOne({ name: regex });

        if (!seller) {
            return NextResponse.json({ error: "Seller not found." }, { status: 404 });
        }

        const items = await Item.find({ 
            sellerId: seller._id, 
            availability: true 
        });

        return NextResponse.json({ seller, items });

    } catch (err) {
        console.error("Error fetching seller items:", err);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}