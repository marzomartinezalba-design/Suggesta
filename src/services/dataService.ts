import { auth } from '../lib/firebase';
import { BaseItem, Review, Recommendation, UserProfile } from "../types";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Culture Curator',
  avatarUrl: '',
  isAuthenticated: false
};

const INITIAL_ITEMS: BaseItem[] = [
  {
    id: 'mean-girls',
    type: 'movie',
    title: 'Mean Girls',
    creator: 'Mark Waters',
    description: 'Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.',
    imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/fXDsBSpR6v9KeLZQWo789vpkK9M.jpg',
    genres: ['Comedy', 'Teen'],
    year: '2004',
    externalUrl: 'https://www.themoviedb.org/movie/10625-mean-girls'
  },
  {
    id: 'obsessed',
    type: 'music',
    title: 'Obsessed',
    creator: 'Mariah Carey',
    description: 'A sassy pop and R&B song by American singer and songwriter Mariah Carey.',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b27341fe817f54c9c61bf9c10444',
    genres: ['Pop', 'R&B'],
    year: '2009',
    externalUrl: 'https://open.spotify.com/track/5enY774EwOllZ5I13L7j5u'
  },
  {
    id: 'clueless',
    type: 'movie',
    title: 'Clueless',
    creator: 'Amy Heckerling',
    description: 'Shallow, rich and socially successful Cher is at the top of her Beverly Hills high school\'s pecking order.',
    imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/899M7O9uivlT6pZ7tVbeT1H9d1H.jpg',
    genres: ['Comedy', 'Romance'],
    year: '1995',
    externalUrl: 'https://www.themoviedb.org/movie/9603-clueless'
  },
  {
    id: 'galactic-war',
    type: 'movie',
    title: 'Galactic War',
    creator: 'Chris Watson',
    description: 'In a devastated future, an interdimensional portal unleashes an alien invasion on Earth. An elite squad crosses to the other side to stop it, but discovers that the invaders are fleeing from an even greater threat. Now, they must decide whether to save their world... or the entire universe.',
    imageUrl: '/src/assets/images/galactic_war_1779863110135.png',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    year: '2026',
    externalUrl: 'https://www.youtube.com/results?search_query=Galactic+War+official+trailer'
  },
  {
    id: 'blade-runner-2049-soundtrack',
    type: 'music',
    title: 'Blade Runner 2049 (Original Motion Picture Soundtrack)',
    creator: 'Hans Zimmer & Benjamin Wallfisch',
    description: 'The hauntingly beautiful and atmospheric synthesized score for Denis Villeneuve\'s Neo-Noir Sci-Fi masterpiece Blade Runner 2049, composed by Hans Zimmer and Benjamin Wallfisch.',
    imageUrl: '/src/assets/images/br2049_album_1779863139111.png',
    genres: ['Electronic', 'Ambient', 'Soundtrack'],
    year: '2017',
    externalUrl: 'https://music.youtube.com/search?q=Blade+Runner+2049+Soundtrack'
  },
  {
    id: 'oblivion',
    type: 'movie',
    title: 'Oblivion',
    creator: 'Joseph Kosinski',
    description: 'A veteran assigned to extract Earth\'s remaining resources confronts a mysterious past and a truth that changes his life.',
    imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/hm6SIsyO730j48S3fX8UoE10X3M.jpg',
    genres: ['Sci-Fi', 'Action', 'Mystery'],
    year: '2013',
    externalUrl: 'https://www.themoviedb.org/movie/75612-oblivion'
  }
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    itemId: 'mean-girls',
    userId: 'system',
    userName: 'Regina G.',
    rating: 5,
    comment: 'Literally the most fetch movie ever made. I watch it every Wednesday while wearing pink.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24
  },
  {
    id: 'rev-2',
    itemId: 'clueless',
    userId: 'system',
    userName: 'Cher H.',
    rating: 5,
    comment: 'As if! This movie is a total classic. My wardrobe needs a computerized upgrade like hers.',
    createdAt: Date.now() - 1000 * 60 * 60 * 48
  },
  {
    id: 'rev-gw-1',
    itemId: 'galactic-war',
    userId: 'system',
    userName: 'Alex M.',
    rating: 4,
    comment: 'Entertaining and intense, although the story is a bit predictable.',
    createdAt: Date.now() - 1000 * 60 * 60 * 5
  },
  {
    id: 'rev-gw-2',
    itemId: 'galactic-war',
    userId: 'system',
    userName: 'Elena R.',
    rating: 4,
    comment: 'The special effects are spectacular, but I felt a lack of depth in the characters.',
    createdAt: Date.now() - 1000 * 60 * 60 * 10
  },
  {
    id: 'rev-gw-3',
    itemId: 'galactic-war',
    userId: 'system',
    userName: 'Marc T.',
    rating: 5,
    comment: 'A surprise! It blends action and mystery very well with an interesting twist.',
    createdAt: Date.now() - 1000 * 60 * 60 * 15
  },
  {
    id: 'rev-gw-4',
    itemId: 'galactic-war',
    userId: 'system',
    userName: 'Sofia P.',
    rating: 4,
    comment: "Highly reminiscent of Denis Villeneuve's work, especially Dune.",
    createdAt: Date.now() - 1000 * 60 * 60 * 20
  }
];

const INITIAL_RECS: Recommendation[] = [
  {
    id: 'rec-1',
    sourceItemId: 'mean-girls',
    targetItem: {
      id: 'clueless',
      type: 'movie',
      title: 'Clueless',
      creator: 'Amy Heckerling',
      description: 'Shallow, rich and socially successful Cher is at the top of her Beverly Hills high school\'s pecking order.',
      imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/899M7O9uivlT6pZ7tVbeT1H9d1H.jpg',
      genres: ['Comedy', 'Romance'],
      year: '1995',
      externalUrl: 'https://www.themoviedb.org/movie/9603-clueless'
    },
    userId: 'system',
    userName: 'PopCultureAddict',
    reason: 'If you love high school royalty and iconic fashion, you absolutely need to see Clueless after Mean Girls.',
    createdAt: Date.now() - 1000 * 60 * 60 * 12
  },
  {
    id: 'rec-gw-br',
    sourceItemId: 'galactic-war',
    targetItem: {
      id: 'blade-runner-2049-soundtrack',
      type: 'music',
      title: 'Blade Runner 2049 (Original Motion Picture Soundtrack)',
      creator: 'Hans Zimmer & Benjamin Wallfisch',
      description: 'The hauntingly beautiful and atmospheric synthesized score for Denis Villeneuve\'s Neo-Noir Sci-Fi masterpiece Blade Runner 2049, composed by Hans Zimmer and Benjamin Wallfisch.',
      imageUrl: '/src/assets/images/br2049_album_1779863139111.png',
      genres: ['Electronic', 'Ambient', 'Soundtrack'],
      year: '2017',
      externalUrl: 'https://music.youtube.com/search?q=Blade+Runner+2049+Soundtrack'
    },
    userId: 'system',
    userName: 'AmbientLover',
    reason: 'If you like the intense atmosphere of Galactic War, listen to the soundtrack of Blade Runner 2049 (Original Motion Picture Soundtrack), it shares the same ambient feel.',
    createdAt: Date.now() - 1000 * 60 * 60 * 3
  },
  {
    id: 'rec-gw-ob',
    sourceItemId: 'galactic-war',
    targetItem: {
      id: 'oblivion',
      type: 'movie',
      title: 'Oblivion',
      creator: 'Joseph Kosinski',
      description: 'A veteran assigned to extract Earth\'s remaining resources confronts a mysterious past and a truth that changes his life.',
      imageUrl: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/hm6SIsyO730j48S3fX8UoE10X3M.jpg',
      genres: ['Sci-Fi', 'Action', 'Mystery'],
      year: '2013',
      externalUrl: 'https://www.themoviedb.org/movie/75612-oblivion'
    },
    userId: 'system',
    userName: 'VibeFinder',
    reason: 'It gave me total Oblivion vibes but with a touch of extra action.',
    createdAt: Date.now() - 1000 * 60 * 60 * 2
  }
];

// Memory subscription caches
const itemCallbacks: Set<(items: BaseItem[]) => void> = new Set();
const reviewCallbacks: Set<(reviews: Review[]) => void> = new Set();
const recCallbacks: Set<(recs: Recommendation[]) => void> = new Set();

function getCustomItems(): BaseItem[] {
  try {
    const items = localStorage.getItem('suggesta_custom_items');
    return items ? JSON.parse(items) : [];
  } catch {
    return [];
  }
}

function saveCustomItems(items: BaseItem[]) {
  try {
    localStorage.setItem('suggesta_custom_items', JSON.stringify(items));
    notifyItems();
  } catch (e) {
    console.error("Failed to save custom items", e);
  }
}

function getMergedItems(): BaseItem[] {
  const custom = getCustomItems();
  const merged = [...custom];
  INITIAL_ITEMS.forEach(initItem => {
    if (!merged.some(item => item.id === initItem.id)) {
      merged.push(initItem);
    }
  });
  return merged;
}

function notifyItems() {
  const merged = getMergedItems();
  itemCallbacks.forEach(cb => cb(merged));
}

function getCustomReviews(): Review[] {
  try {
    const reviews = localStorage.getItem('suggesta_custom_reviews');
    return reviews ? JSON.parse(reviews) : [];
  } catch {
    return [];
  }
}

function saveCustomReviews(reviews: Review[]) {
  try {
    localStorage.setItem('suggesta_custom_reviews', JSON.stringify(reviews));
    notifyReviews();
  } catch (e) {
    console.error("Failed to save custom reviews", e);
  }
}

function getMergedReviews(): Review[] {
  const custom = getCustomReviews();
  const merged = [...custom];
  INITIAL_REVIEWS.forEach(initRev => {
    if (!merged.some(rev => rev.id === initRev.id)) {
      merged.push(initRev);
    }
  });
  return merged.sort((a, b) => b.createdAt - a.createdAt);
}

function notifyReviews() {
  const merged = getMergedReviews();
  reviewCallbacks.forEach(cb => cb(merged));
}

function getCustomRecs(): Recommendation[] {
  try {
    const recs = localStorage.getItem('suggesta_custom_recs');
    return recs ? JSON.parse(recs) : [];
  } catch {
    return [];
  }
}

function saveCustomRecs(recs: Recommendation[]) {
  try {
    localStorage.setItem('suggesta_custom_recs', JSON.stringify(recs));
    notifyRecs();
  } catch (e) {
    console.error("Failed to save custom recs", e);
  }
}

function getMergedRecs(): Recommendation[] {
  const custom = getCustomRecs();
  const merged = [...custom];
  INITIAL_RECS.forEach(initRec => {
    if (!merged.some(rec => rec.id === initRec.id)) {
      merged.push(initRec);
    }
  });
  return merged.sort((a, b) => b.createdAt - a.createdAt);
}

function notifyRecs() {
  const merged = getMergedRecs();
  recCallbacks.forEach(cb => cb(merged));
}

export const dataService = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    try {
      const stored = localStorage.getItem(`suggesta_profile_${userId}`);
      if (stored) {
        return JSON.parse(stored) as UserProfile;
      }
      return DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  updateProfile: async (userId: string, profile: UserProfile): Promise<void> => {
    try {
      localStorage.setItem(`suggesta_profile_${userId}`, JSON.stringify(profile));
    } catch (e) {
      console.error("Failed to update profile", e);
    }
  },

  subscribeToItems: (callback: (items: BaseItem[]) => void) => {
    itemCallbacks.add(callback);
    callback(getMergedItems());
    return () => {
      itemCallbacks.delete(callback);
    };
  },

  subscribeToReviews: (callback: (reviews: Review[]) => void) => {
    reviewCallbacks.add(callback);
    callback(getMergedReviews());
    return () => {
      reviewCallbacks.delete(callback);
    };
  },

  subscribeToRecommendations: (callback: (recs: Recommendation[]) => void) => {
    recCallbacks.add(callback);
    callback(getMergedRecs());
    return () => {
      recCallbacks.delete(callback);
    };
  },

  getStoredItems: async (): Promise<BaseItem[]> => {
    return getMergedItems();
  },
  
  saveItem: async (item: BaseItem) => {
    const custom = getCustomItems();
    if (!custom.some(i => i.id === item.id)) {
      custom.push(item);
      saveCustomItems(custom);
    }
  },

  getReviews: async (itemId?: string): Promise<Review[]> => {
    const list = getMergedReviews();
    if (itemId) {
      return list.filter(r => r.itemId === itemId);
    }
    return list;
  },

  addReview: async (review: Review) => {
    const custom = getCustomReviews();
    custom.push({
      ...review,
      createdAt: Date.now()
    });
    saveCustomReviews(custom);
  },

  getRecommendations: async (sourceId?: string): Promise<Recommendation[]> => {
    const list = getMergedRecs();
    if (sourceId) {
      return list.filter(r => r.sourceItemId === sourceId);
    }
    return list;
  },

  addRecommendation: async (rec: Recommendation) => {
    const custom = getCustomRecs();
    custom.push({
      ...rec,
      createdAt: Date.now()
    });
    saveCustomRecs(custom);
  },

  searchItems: async (searchQuery: string): Promise<BaseItem[]> => {
     const allItems = getMergedItems();
     const q = searchQuery.toLowerCase();
     return allItems.filter(item => 
       item.title.toLowerCase().includes(q) || 
       item.genres.some(g => g.toLowerCase().includes(q)) ||
       item.creator.toLowerCase().includes(q)
     );
  }
};
