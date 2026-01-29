export type TrackingEvent = {
  status: string;
  location?: string;
  timestamp: string;
};

export type ShipmentResponse = {
  shipmentId: string;
  trackingNumber: string;
  carrier: string;
};

export interface ShippingAdapter {
  createShipment(orderId: string): Promise<ShipmentResponse>;
  getTracking(trackingNumber: string): Promise<TrackingEvent[]>;
}

class MockShippingAdapter implements ShippingAdapter {
  async createShipment(orderId: string): Promise<ShipmentResponse> {
    return {
      shipmentId: `mock_${orderId}`,
      trackingNumber: `TRACK${orderId.slice(-6).toUpperCase()}`,
      carrier: "MockExpress",
    };
  }

  async getTracking(trackingNumber: string): Promise<TrackingEvent[]> {
    return [
      {
        status: "SHIPPED",
        location: "Mumbai Hub",
        timestamp: new Date().toISOString(),
      },
      {
        status: "IN_TRANSIT",
        location: "Pune Facility",
        timestamp: new Date().toISOString(),
      },
    ];
  }
}

class ShiprocketAdapter implements ShippingAdapter {
  async createShipment(orderId: string): Promise<ShipmentResponse> {
    if (!process.env.SHIPROCKET_TOKEN) {
      return new MockShippingAdapter().createShipment(orderId);
    }
    return {
      shipmentId: `shiprocket_${orderId}`,
      trackingNumber: `SR${orderId.slice(-6).toUpperCase()}`,
      carrier: "Shiprocket",
    };
  }

  async getTracking(trackingNumber: string): Promise<TrackingEvent[]> {
    if (!process.env.SHIPROCKET_TOKEN) {
      return new MockShippingAdapter().getTracking(trackingNumber);
    }
    return [
      {
        status: "IN_TRANSIT",
        location: "Shiprocket Hub",
        timestamp: new Date().toISOString(),
      },
    ];
  }
}

export const shippingAdapter: ShippingAdapter = new ShiprocketAdapter();
