export interface ServiceItem {
  name: string;
  description: string;
}

export interface Service {
  title: string;
  icon: string; // We'll use string for icon names in API
  items: ServiceItem[];
}

export interface ServicesResponse {
  services: Service[];
}
