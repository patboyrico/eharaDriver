export interface Rides {
    driver_id: number;
    user_id: number;
    fare: number;
    rider_confirmation: boolean;
    driver_confirmation: boolean;
    payment_method: string;
    pickup: number;
    destination: number;
}