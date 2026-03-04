const POD_DATA = {
  business: {
    name: "PRINTCRAFT POD",
    tagline: "Premium Print On Demand Services",
    subtitle: "Launch your clothing brand with zero inventory. DTF printing technology for startups & established brands.",
    phone: "+91 XXXXX XXXXX",
    email: "hello@printcraftpod.com",
    instagram: "@printcraftpod"
  },
  printing: {
    method: "DTF (Direct to Film) Print",
    sheetPrice: 400,
    sheetUnit: "per 1 meter sheet",
    durability: "Approx. 50 washes (with proper wash care)",
    productionTime: {
      withNewSheet: "2 days (1 day DTF print + 1 day garment printing)",
      withReadySheet: "1 day"
    },
    packaging: {
      basic: "₹5–₹10 per piece",
      custom: "No extra charge if client provides packaging material"
    },
    gst: {
      rate: 5,
      note: "5% GST on total order value. Not included in base prices."
    }
  },
  products: [
    {
      id: "tshirts",
      name: "T-Shirts",
      icon: "👕",
      fabric: "100% Cotton",
      variants: [
        {
          name: "Sinker",
          gsm: 200,
          price: 200,
          notes: ["Breathable", "Available in Regular & Oversized", "Best for summer"],
          preShrunk: false
        },
        {
          name: "Terry Cotton",
          gsm: 180,
          price: 180,
          notes: ["Pre-shrunk", "Net structure prevents shrinkage", "Better structure retention", "Mainly Oversized"],
          preShrunk: true
        },
        {
          name: "Terry Cotton",
          gsm: 240,
          price: 250,
          notes: ["Pre-shrunk", "Premium heavy feel", "Better structure retention", "Mainly Oversized"],
          preShrunk: true
        }
      ],
      fits: ["Oversized (all variants)", "Regular (200 GSM Sinker only)", "Regular Terry Cotton on special order"],
      colors: ["Black", "Lavender", "White", "Beige", "Coffee", "Navy Blue", "Pink", "Olive Green", "Dark Green", "Green", "Cherry", "Skin"],
      sizeChart: {
        headers: ["Size", "Chest", "Length", "Sleeves", "Across Shoulder"],
        rows: [
          ["S", "40\"", "27\"", "9\"", "20\""],
          ["M", "42\"", "28\"", "9.5\"", "21\""],
          ["L", "45\"", "29\"", "10\"", "21.5\""],
          ["XL", "48\"", "30\"", "10.5\"", "23\""]
        ],
        note: "Size tolerance may vary by ±0.5 inches"
      }
    },
    {
      id: "hoodies",
      name: "Hoodies",
      icon: "🧥",
      fabric: "100% Cotton with fleece inside",
      variants: [
        {
          name: "Standard",
          gsm: 350,
          price: 540,
          notes: ["Warm & comfortable", "Fleece inside", "Slightly lighter weight"]
        },
        {
          name: "Heavy",
          gsm: 420,
          price: null,
          notes: ["Heavier weight", "Extra warm", "Price to be confirmed"]
        }
      ],
      fits: ["Oversized"],
      colors: ["Black", "White", "Lavender", "Beige", "Coffee", "Navy Blue"],
      sizeChart: {
        headers: ["Size", "Chest", "Length", "Sleeves", "Across Shoulder"],
        rows: [
          ["S", "40\"", "27\"", "9\"", "20\""],
          ["M", "42\"", "28\"", "9.5\"", "21\""],
          ["L", "45\"", "29\"", "10\"", "21.5\""],
          ["XL", "48\"", "30\"", "10.5\"", "23\""]
        ],
        note: "Size tolerance may vary by ±0.5 inches"
      }
    },
    {
      id: "sweatshirts",
      name: "Sweatshirts",
      icon: "🧶",
      fabric: "100% Cotton (some polycotton in bulk orders)",
      variants: [
        {
          name: "Standard",
          gsm: 350,
          price: 400,
          notes: ["Fleece inside", "Warm winter wear", "Seasonal product"]
        }
      ],
      fits: ["Regular", "Oversized"],
      colors: ["Limited stock — based on current demand & season"],
      seasonal: true,
      sizeChart: {
        headers: ["Size", "Chest", "Length", "Sleeves", "Across Shoulder"],
        rows: [
          ["S", "40\"", "27\"", "9\"", "20\""],
          ["M", "42\"", "28\"", "9.5\"", "21\""],
          ["L", "45\"", "29\"", "10\"", "21.5\""],
          ["XL", "48\"", "30\"", "10.5\"", "23\""]
        ],
        note: "Size tolerance may vary by ±0.5 inches"
      }
    },
    {
      id: "polo",
      name: "Polo T-Shirts",
      icon: "👔",
      fabric: "100% Cotton (main) / Polycotton / Polyester",
      variants: [
        {
          name: "Polyester Polo",
          gsm: 240,
          price: null,
          notes: ["Order-based", "Neon colors available"],
          colors: ["Black", "Grey", "White", "Neon Yellow", "Navy Blue"]
        },
        {
          name: "Cotton/Polycotton Polo",
          gsm: 240,
          price: null,
          notes: ["Main focus", "Vibrant solid colors"],
          colors: ["Red", "Peach", "Dark Green", "Sky Blue", "Yellow", "Bright Red"]
        }
      ],
      fits: ["Regular"],
      colors: ["See variants above for color options"],
      sizeChart: {
        headers: ["Size", "Chest", "Length", "Sleeves", "Across Shoulder"],
        rows: [
          ["S", "40\"", "27\"", "9\"", "20\""],
          ["M", "42\"", "28\"", "9.5\"", "21\""],
          ["L", "45\"", "29\"", "10\"", "21.5\""],
          ["XL", "48\"", "30\"", "10.5\"", "23\""]
        ],
        note: "Size tolerance may vary by ±0.5 inches"
      }
    }
  ],
  notes: [
    "All production timelines depend primarily on DTF print availability.",
    "Heavier GSM does not always mean better quality — fabric quality remains same; thickness differs.",
    "200 GSM recommended for breathable daily wear.",
    "240 GSM recommended for premium heavy feel.",
    "Seasonal products (especially sweatshirts) may have limited color stock."
  ]
};
