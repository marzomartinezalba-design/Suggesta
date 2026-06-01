import { BaseItem, ItemType } from "../types";

const reviewsCache: Record<string, any[]> = {};
const recsCache: Record<string, any[]> = {};

export async function generateItemInfo(query: string, typeHint?: ItemType): Promise<BaseItem | null> {
  try {
    const res = await fetch("/api/gemini/item-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, typeHint }),
    });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("generateItemInfo client error:", error);
    return null;
  }
}

export async function searchItemsAI(query: string): Promise<BaseItem[]> {
  try {
    const res = await fetch("/api/gemini/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("searchItemsAI client error:", error);
    return [];
  }
}

export async function generateInitialRecommendations(item: BaseItem): Promise<{ title: string; type: ItemType; reason: string }[]> {
  // Currently unused on client, return fallback
  return [];
}

export async function generateCommunityReviews(item: BaseItem): Promise<{ userName: string; rating: number; comment: string }[]> {
  if (reviewsCache[item.id]) return reviewsCache[item.id];
  try {
    const res = await fetch("/api/gemini/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const reviews = await res.json();
    reviewsCache[item.id] = reviews;
    return reviews;
  } catch (error) {
    console.error("generateCommunityReviews client error:", error);
    return [];
  }
}

export async function generateCommunityRecommendations(item: BaseItem): Promise<any[]> {
  if (recsCache[item.id]) return recsCache[item.id];
  try {
    const res = await fetch("/api/gemini/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const rawRecs = await res.json();
    const recs = rawRecs.map((d: any) => ({
      id: Math.random().toString(36).substr(2, 9),
      sourceItemId: item.id,
      targetItem: d.targetItem,
      reason: d.reason,
      userName: d.userName,
      createdAt: Date.now() - Math.floor(Math.random() * 100000000)
    }));
    recsCache[item.id] = recs;
    return recs;
  } catch (error) {
    console.error("generateCommunityRecommendations client error:", error);
    return [];
  }
}
