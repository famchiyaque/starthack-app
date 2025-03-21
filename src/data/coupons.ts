export interface Initiative {
    id: number;
    title: string;
    company: string;
    description: string;
    imageUrl: string;
    participants: number;
    deadline: string;
    rewards: string;
    category: string;
  }
  
  export interface Coupon {
    id: number;
    title: string;
    company: string;
    discount: string;
    description: string;
    expiry: string;
    code?: string;
  }
  
  export interface Reward {
    id: number;
    title: string;
    description: string;
    points: number;
    imageUrl?: string;
  }
  
  export const initiatives: Initiative[] = [
    {
      id: 1,
      title: "Youngest, Cleanest Fleet in the Sky",
      company: "Virgin Atlantic",
      description: "Virgin Atlantic is working to accelerate the development of sustainable fuels. On November 28th, we made history with Flight100— becoming the first commercial airline to fly across the Atlantic on 100% SAF -  marking a key milestone on the path to decarbonising aviation.",
      imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000",
      participants: 48,
      deadline: "Jun 23",
      rewards: "200 pts",
      category: "Environment",
    },
    {
      id: 2,
      title: "Epic Sea Change For All",
      company: "Virgin Voyages",
      description: "Virgin Voyages have teamed up with Virgin's Foundation, Virgin Unite, to support mangrove forest projects in the Caribbean. The aim is to accelerate nature-based solutions to climate change, and create a scalable model for other regions in the world.",
      imageUrl: "https://media.virginvoyages.com/https://www.virginvoyages.com/dam/jcr:44bfcae2-34ca-44f7-a27b-9e753bf16d8a/IMG-DEST-st-croix-Catamaran-Off-Coast-of-St-Croix-share-page-hero-v1-16x9.jpg",
      participants: 32,
      deadline: "Jul 15",
      rewards: "150 pts",
      category: "Reforestation",
    },
    {
      id: 3,
      title: "Better Connections Plan",
      company: "Virgin Media O2",
      description: "Community Calling is a pioneering initiative by Virgin Media O2 and environmental charity Hubbub to tackle digital exclusion. It has already rehomed more than 20,000 unused smartphones with people who need them across the country.",
      imageUrl: "https://storyblok.cdn.vmo2digital.co.uk/f/253875/352x180/12631b061b/vmo_2_benefits_1_837883d8c6.png/m/3840x0/filters:quality(75)",
      participants: 76,
      deadline: "Jun 30",
      rewards: "250 pts",
      category: "Community",
    },
  ];
  
  export const coupons: Coupon[] = [
    {
      id: 1,
      title: "Discount on Economy Classic Tickets",
      company: "Virgin Atlantic",
      discount: "15% Off Economy Classic",
      description: "Enjoy 15% off your next Economy Classic booking with Virgin Atlantic. Valid for all international routes.",
      expiry: "December 31, 2023",
      code: "VAECO15"
    },
    {
      id: 2,
      title: "Upper Class Upgrade",
      company: "Virgin Atlantic",
      discount: "Free Upper Class Upgrade",
      description: "Book Premium Economy and get a complimentary upgrade to Upper Class on select routes when using this coupon.",
      expiry: "October 15, 2023",
      code: "VAVIPUPGRADE"
    },
    {
      id: 3,
      title: "Sea Terrace Cabin Discount",
      company: "Virgin Voyages",
      discount: "20% Off Sea Terrace Cabins",
      description: "Book a Sea Terrace cabin and receive 20% off on select Caribbean voyages.",
      expiry: "November 30, 2023",
      code: "VVSEA20"
    },
    {
      id: 4,
      title: "Sailor Loot Bonus",
      company: "Virgin Voyages",
      discount: "$300 Extra Sailor Loot",
      description: "Get $300 of extra Sailor Loot to spend onboard when booking any voyage to the Mediterranean.",
      expiry: "September 15, 2023",
      code: "VVLOOT300"
    },
    {
      id: 5,
      title: "Broadband Speed Boost",
      company: "Virgin Media O2",
      discount: "Free 6-Month Speed Boost",
      description: "Upgrade to the next broadband speed tier free for 6 months with this exclusive coupon.",
      expiry: "August 31, 2023",
      code: "VMOBOOST"
    },
    {
      id: 6,
      title: "O2 Priority Extra",
      company: "Virgin Media O2",
      discount: "Double O2 Priority Points",
      description: "Earn double O2 Priority points on all your purchases for 3 months with this coupon.",
      expiry: "July 31, 2023",
      code: "O2DOUBLE"
    },
    {
      id: 7,
      title: "EcoMundo Store Discount",
      company: "EcoMundo Stores",
      discount: "15% Discount",
      description: "Get 15% off your entire purchase at any EcoMundo Store location.",
      expiry: "August 15, 2023",
      code: "ECO15OFF"
    }
  ];
  
  export const rewards: Reward[] = [
    {
      id: 1,
      title: "10% Off Economy Classic",
      description: "On any Virgin Atlantic flight",
      points: 500
    },
    {
      id: 2,
      title: "Flight Upgrade",
      description: "On any Virgin Atlantic flight",
      points: 2000
    },
    {
      id: 3,
      title: "Cabin Upgrade",
      description: "On any Virgin Voyages sailing",
      points: 1500
    },
    {
      id: 4,
      title: "Free Month of Broadband",
      description: "For Virgin Media customers",
      points: 1000
    }
  ];
  
  export const userPoints = {
    available: 2450,
    thisMonth: 350,
    accumulated: 4200,
    redeemed: 1750
  };