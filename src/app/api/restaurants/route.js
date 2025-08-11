import { NextResponse } from "next/server";

// In a real app, you would fetch this list from your database.
const allRestaurants = [
    { id: 'mayuri-ab1', name: 'Mayuri (AB1)' },
    { id: 'mayuri-ab2', name: 'Mayuri (AB2)' },
    { id: 'bistro', name: 'Bistro' },
    { id: 'ab-dakshin', name: 'AB Dakshin' },
    { id: 'underbelly', name: 'UnderBelly' },
];

export async function GET() {
  try {
    // Simulate a database call delay
    await new Promise(resolve => setTimeout(resolve, 500)); 
    return NextResponse.json({ restaurants: allRestaurants });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
  }
}
