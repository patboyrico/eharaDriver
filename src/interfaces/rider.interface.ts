export interface Rider {
    id?: number;
    location?: firebase.firestore.GeoPoint;
    name?: string;
}