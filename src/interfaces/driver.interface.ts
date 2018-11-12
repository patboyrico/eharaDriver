export interface Driver {
    id?: string;
    username?: string;
    location?: firebase.firestore.GeoPoint;
    isOnline?: boolean;
    rides?: {};
    pickupRequest?: boolean;
    inRide?: boolean;
    visibility?: boolean;
    kmRadius?: number;
}