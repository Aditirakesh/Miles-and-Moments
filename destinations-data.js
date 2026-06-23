// destinations-data.js - Mock Database for Miles & Moments Travel Guides

const destinationsData = {
  paris: {
    name: "Paris",
    coordinates: [48.8566, 2.3522],
    currencyCode: "EUR",
    exchangeRate: 0.92,
    region: "Europe",
    tagline: "The City of Lights, Art, and Eternal Romance",
    heroImage: "paris_hd.jpg",
    description: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
    duration: "3-5 Days",
    bestTime: "April to June & September to November",
    currency: "Euro (€)",
    language: "French",
    highlights: [
      { name: "Eiffel Tower", desc: "Scale the world's most famous iron tower for breathtaking panoramic views of the city.", icon: "🗼", coordinates: [48.8584, 2.2945] },
      { name: "The Louvre", desc: "Explore the world's largest art museum, home to the Mona Lisa and Venus de Milo.", icon: "🎨", coordinates: [48.8606, 2.3376] },
      { name: "Montmartre & Sacré-Cœur", desc: "Wander through winding cobblestone streets of the historic artist quarter.", icon: "⛪", coordinates: [48.8867, 2.3431] },
      { name: "Seine River Cruise", desc: "Enjoy a twilight boat ride to see illuminated historic monuments along the banks.", icon: "🚢", coordinates: [48.8596, 2.3244] }
    ],
    packing: [
      "Comfortable, stylish walking shoes",
      "Universal travel adapter (Type C/E plug)",
      "Light jacket or trench coat for cool evenings",
      "Chic crossbody bag to prevent pickpocketing",
      "Reusable water bottle"
    ],
    itinerary: [
      {
        day: 1,
        title: "Historic Landmarks & The Seine",
        activities: [
          "Start your morning early with a climb up the Eiffel Tower to beat the crowds.",
          "Stroll down the Champ de Mars and cross the Seine to the Trocadéro gardens.",
          "Walk through the Tuileries Garden and visit the Musée de l'Orangerie for Monet's Water Lilies.",
          "Cap off the evening with a sunset cruise on the River Seine."
        ]
      },
      {
        day: 2,
        title: "Art, History & Gothic Cathedrals",
        activities: [
          "Spend your morning exploring the highlights of the massive Louvre Museum.",
          "Cross the Pont des Arts to Notre-Dame Cathedral and the charming Île de la Cité.",
          "Browse the historic bookshops like Shakespeare and Company in the Latin Quarter.",
          "Enjoy a traditional French dinner at a cozy bistro in Saint-Germain-des-Prés."
        ]
      },
      {
        day: 3,
        title: "Bohemian Montmartre & Golden Hour Views",
        activities: [
          "Take the metro north to Montmartre and walk up to the Sacré-Cœur Basilica.",
          "Watch street artists paint at the Place du Tertre and find the 'I Love You' Wall.",
          "Visit the Palace of Versailles (30-min train ride from city center) or explore the Marais fashion boutiques.",
          "Spend your final evening watching the Eiffel Tower sparkle from a rooftop bar."
        ]
      }
    ]
  },
  rome: {
    name: "Rome",
    coordinates: [41.9028, 12.4964],
    currencyCode: "EUR",
    exchangeRate: 0.92,
    region: "Europe",
    tagline: "The Eternal City of Ancient History and Vibrant Flavors",
    heroImage: "rome_hd.jpg",
    description: "Rome, Italy's capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture, and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire. Vatican City, headquarters of the Roman Catholic Church, boasts St. Peter’s Basilica and the Vatican Museums, which house masterpieces like Michelangelo’s Sistine Chapel frescoes.",
    duration: "3-4 Days",
    bestTime: "April to June & September to October",
    currency: "Euro (€)",
    language: "Italian",
    highlights: [
      { name: "The Colosseum", desc: "Step inside the ancient amphitheater where gladiators once fought.", icon: "🏛️", coordinates: [41.8902, 12.4922] },
      { name: "Trevi Fountain", desc: "Toss a coin into the world-famous fountain to guarantee your return to Rome.", icon: "⛲", coordinates: [41.9009, 12.4833] },
      { name: "Vatican Museums & Sistine Chapel", desc: "View the vast art collections of the Popes and Michelangelo's masterpiece.", icon: "🎨", coordinates: [41.9065, 12.4536] },
      { name: "The Pantheon", desc: "Marvel at the architectural genius of Rome's best-preserved ancient dome.", icon: "🏛️", coordinates: [41.8986, 12.4769] }
    ],
    packing: [
      "Modest clothing covering knees and shoulders (mandatory for Vatican entry)",
      "Sunscreen and sun hat for open-air ruins",
      "Sturdy walking shoes for uneven historic cobblestones",
      "Reusable water bottle to fill up at Rome's free public drinking fountains (nasoni)",
      "Hand sanitizer"
    ],
    itinerary: [
      {
        day: 1,
        title: "Ancient Roman Empire",
        activities: [
          "Begin with a guided tour of the Colosseum and Roman Forum.",
          "Climb the Palatine Hill for views of the ancient ruins and Circus Maximus.",
          "Walk to the Vittorio Emanuele II Monument at Piazza Venezia.",
          "Have dinner in the lively, historic neighborhood of Trastevere."
        ]
      },
      {
        day: 2,
        title: "Piazzas, Fountains & Baroque Rome",
        activities: [
          "Visit the Pantheon early in the morning before crowds arrive.",
          "Walk to the nearby Piazza Navona to view Bernini's Four Rivers Fountain.",
          "Make your way to the Trevi Fountain and toss a coin over your shoulder.",
          "Climb the Spanish Steps and enjoy gelato with views of Piazza di Spagna."
        ]
      },
      {
        day: 3,
        title: "The Vatican & Renaissance Masterpieces",
        activities: [
          "Cross the Tiber river to Vatican City and visit the St. Peter's Basilica.",
          "Spend the afternoon exploring the massive Vatican Museums and the Sistine Chapel.",
          "Take a stroll through the lush gardens of Villa Borghese.",
          "Indulge in authentic pasta carbonara and Roman pizza in a local trattoria."
        ]
      }
    ]
  },
  vienna: {
    name: "Vienna",
    coordinates: [48.2082, 16.3738],
    currencyCode: "EUR",
    exchangeRate: 0.92,
    region: "Europe",
    tagline: "The Imperial Capital of Classical Music, Palaces, and Cafes",
    heroImage: "vienna_hd.jpg",
    description: "Vienna, Austria’s capital, lies in the east of the country on the Danube River. Its artistic and intellectual legacy was shaped by residents including Mozart, Beethoven, and Sigmund Freud. The city is also known for its Imperial palaces, including Schönbrunn, the Habsburgs’ summer residence. In the MuseumsQuartier district, historic and contemporary buildings display works by Egon Schiele, Gustav Klimt, and other artists.",
    duration: "2-3 Days",
    bestTime: "April to May & September to October",
    currency: "Euro (€)",
    language: "German",
    highlights: [
      { name: "Schönbrunn Palace", desc: "Explore the massive summer palace and grand gardens of the Habsburg emperors.", icon: "🏰", coordinates: [48.1858, 16.3128] },
      { name: "St. Stephen's Cathedral", desc: "Climb the tower of Vienna's Gothic centerpiece for spectacular views.", icon: "⛪", coordinates: [48.2084, 16.3731] },
      { name: "Vienna State Opera", desc: "Attend a world-class concert in one of the most famous opera houses globally.", icon: "🎵", coordinates: [48.2030, 16.3691] },
      { name: "Belvedere Palace", desc: "Admire Gustav Klimt's legendary painting 'The Kiss' in a baroque palace.", icon: "🖼️", coordinates: [48.1915, 16.3809] }
    ],
    packing: [
      "Smart-casual dress wear (ideal for attending classical concerts or upscale cafes)",
      "Layered clothing (Vienna weather can be breezy)",
      "Comfortable sneakers",
      "Camera with a wide-angle lens for architecture",
      "Cash (many traditional Viennese coffee houses are cash-only)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Imperial Vienna & Classical Cafes",
        activities: [
          "Start your morning with a walk down the Ringstraße boulevard to Hofburg Palace.",
          "Visit St. Stephen's Cathedral and climb the South Tower.",
          "Indulge in Melange coffee and Sachertorte at Cafe Central or Cafe Sacher.",
          "Watch an evening classical concert at the Musikverein."
        ]
      },
      {
        day: 2,
        title: "Baroque Palaces & Art Collections",
        activities: [
          "Take the U-Bahn train to the spectacular Schönbrunn Palace.",
          "Wander through the Schönbrunn Gardens and climb up to the Gloriette.",
          "Return to the city center and visit the Belvedere Palace Art Museum.",
          "Explore the historic Prater amusement park and ride the Giant Ferris Wheel."
        ]
      },
      {
        day: 3,
        title: "Museums & Modern Culture",
        activities: [
          "Spend your morning browsing the collections in the MuseumsQuartier.",
          "Walk through the Naschmarkt open-air food market and taste local Austrian cheeses.",
          "Visit the Kunsthistorisches Museum (Museum of Fine Arts).",
          "Have dinner at a traditional Heuriger wine tavern on the outskirts of the city."
        ]
      }
    ]
  },
  amsterdam: {
    name: "Amsterdam",
    coordinates: [52.3676, 4.9041],
    currencyCode: "EUR",
    exchangeRate: 0.92,
    region: "Europe",
    tagline: "The Historic Canal District of Art, Tulips, and Bicycles",
    heroImage: "amsterdam_hd.jpg",
    description: "Amsterdam is the Netherlands’ capital, known for its artistic heritage, elaborate canal system, and narrow houses with gabled facades, legacies of the city’s 17th-century Golden Age. Its Museum District houses the Van Gogh Museum, works by Rembrandt and Vermeer at the Rijksmuseum, and modern art at the Stedelijk. Cycling is key to the city’s character, and there are numerous bike paths.",
    duration: "2-3 Days",
    bestTime: "April to May (Tulip season) & September to November",
    currency: "Euro (€)",
    language: "Dutch (English is widely spoken)",
    highlights: [
      { name: "Canal Ring Cruise", desc: "Boat through the UNESCO-listed 17th-century canal ring pathways.", icon: "🛶", coordinates: [52.3676, 4.9041] },
      { name: "Rijksmuseum", desc: "See masterworks of Rembrandt and Vermeer in a spectacular national gallery.", icon: "🎨", coordinates: [52.3600, 4.8852] },
      { name: "Van Gogh Museum", desc: "View the world's largest collection of paintings and letters by Vincent van Gogh.", icon: "🌻", coordinates: [52.3584, 4.8811] },
      { name: "Anne Frank House", desc: "Tour the moving museum and secret annex where Anne Frank hid during WWII.", icon: "📖", coordinates: [52.3752, 4.8840] }
    ],
    packing: [
      "Compact umbrella or raincoat (rain showers are frequent)",
      "Good walking shoes or flat shoes (cycling city)",
      "Light travel pack",
      "Debit/Credit cards (Amsterdam is highly cashless)",
      "Warm sweater or windbreaker"
    ],
    itinerary: [
      {
        day: 1,
        title: "Canals & Historic Streets",
        activities: [
          "Rent a bicycle or walk down the historic Nine Streets (Negen Straatjes) shopping district.",
          "Visit the moving Anne Frank House (book tickets months in advance).",
          "Take a scenic afternoon canal boat tour with local commentary.",
          "Explore the vibrant Jordaan neighborhood and have dinner by the canal."
        ]
      },
      {
        day: 2,
        title: "Art Masterpieces & Tulip Blooms",
        activities: [
          "Head to Museumplein and explore the magnificent Rijksmuseum.",
          "Visit the nearby Van Gogh Museum to view his sunflowers and self-portraits.",
          "Stroll through the lush Vondelpark and enjoy a picnic.",
          "Experience the Bloemenmarkt, Amsterdam's historic floating flower market."
        ]
      },
      {
        day: 3,
        title: "Local Culture & Windmills",
        activities: [
          "Take a day trip to Zaanse Schans to see working Dutch windmills, wooden clog makers, and cheese farms.",
          "Return to Amsterdam and explore the trendy De Pijp district.",
          "Visit the Heineken Experience or look over the city from the A'DAM Lookout tower.",
          "Taste local stroopwafels and Dutch fries with mayonnaise."
        ]
      }
    ]
  },
  london: {
    name: "London",
    coordinates: [51.5074, -0.1278],
    currencyCode: "GBP",
    exchangeRate: 0.79,
    region: "Europe",
    tagline: "The Royal Metropolis of Royal History and Modern Theater",
    heroImage: "london_hd.jpg",
    description: "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its center stand the imposing Houses of Parliament, the iconic 'Big Ben' clock tower and Westminster Abbey, site of royal coronations. Across the Thames River, the London Eye observation wheel provides panoramic views of the South Bank cultural complex.",
    duration: "4-5 Days",
    bestTime: "May to July & September to October",
    currency: "British Pound (£)",
    language: "English",
    highlights: [
      { name: "Tower of London & Tower Bridge", desc: "Uncover royal history, see the Crown Jewels, and walk across the famous drawbridge.", icon: "🏰", coordinates: [51.5081, -0.0759] },
      { name: "British Museum", desc: "Explore human history and culture, home to the Rosetta Stone and Egyptian mummies.", icon: "🏛️", coordinates: [51.5194, -0.1270] },
      { name: "London Eye", desc: "Take a ride on the giant observation wheel for spectacular skyline views.", icon: "🎡", coordinates: [51.5033, -0.1195] },
      { name: "Westminster Abbey & Big Ben", desc: "Marvel at the Gothic architecture of parliament and royalty.", icon: "🔔", coordinates: [51.4994, -0.1273] }
    ],
    packing: [
      "Sturdy umbrella (London rain is legendary)",
      "Oyster Card or contactless payment card for the Underground tube",
      "Layers (weather fluctuates quickly)",
      "Comfortable boots/walking shoes",
      "Camera"
    ],
    itinerary: [
      {
        day: 1,
        title: "Royal Westminster & South Bank",
        activities: [
          "Walk past Buckingham Palace and try to catch the Changing of the Guard.",
          "Stroll through St. James's Park to Parliament Square, Big Ben, and Westminster Abbey.",
          "Cross Westminster Bridge and ride the London Eye.",
          "Walk along the South Bank of the Thames to Borough Market for dinner."
        ]
      },
      {
        day: 2,
        title: "Ancient Fortresses & Tower Bridge",
        activities: [
          "Spend your morning exploring the historic Tower of London.",
          "Walk across Tower Bridge and snap photos from the glass floors.",
          "Visit the Tate Modern or the Globe Theatre.",
          "Explore the trendy, colorful streets of Shoreditch or Soho."
        ]
      },
      {
        day: 3,
        title: "World History & West End Theater",
        activities: [
          "Explore the treasures of the British Museum.",
          "Have lunch in Covent Garden and enjoy the street performances.",
          "Shop down Oxford Street and Regent Street.",
          "Catch an award-winning musical in London's famous West End theater district."
        ]
      }
    ]
  },
  tokyo: {
    name: "Tokyo",
    coordinates: [35.6762, 139.6503],
    currencyCode: "JPY",
    exchangeRate: 157.5,
    region: "Asia",
    tagline: "The Neon Metropolis of Future Tech and Ancient Shrines",
    heroImage: "tokyo_hd.jpg",
    description: "Tokyo, Japan’s busy capital, mixes ultra-modern skyscrapers with historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens. The city's many museums offer exhibits ranging from classical art to a reconstructed kabuki theater. Tokyo is also famed for its shopping, dining, and futuristic pop-culture.",
    duration: "4-6 Days",
    bestTime: "March to April (Cherry Blossom) & October to November (Autumn Leaves)",
    currency: "Japanese Yen (¥)",
    language: "Japanese",
    highlights: [
      { name: "Shibuya Crossing", desc: "Cross the world's busiest pedestrian scramble intersection.", icon: "🚶", coordinates: [35.6580, 139.7016] },
      { name: "Senso-ji Temple", desc: "Visit Tokyo's oldest and most iconic Buddhist temple in Asakusa.", icon: "⛩️", coordinates: [35.7148, 139.7967] },
      { name: "Meiji Shrine", desc: "Walk through a tranquil forest oasis leading to a grand Shinto shrine.", icon: "🌳", coordinates: [35.6764, 139.6993] },
      { name: "Shinjuku & Robot Culture", desc: "Dive into neon-lit entertainment streets and watch skyline views from the Metropolitan Government Building.", icon: "🌆", coordinates: [35.6938, 139.7034] }
    ],
    packing: [
      "Slip-on shoes (many temples and traditional restaurants require removing shoes)",
      "Suica or Pasmo IC Card (pre-load for subways and convenience stores)",
      "Cash (Japan is still heavily cash-reliant, especially for street food/shrines)",
      "Pocket Wi-Fi or eSIM card",
      "Hand towel (many public restrooms do not have paper towels)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Historic Asakusa & Modern Skyline",
        activities: [
          "Enter Senso-ji Temple through the famous Kaminarimon Gate.",
          "Shop for traditional snacks and souvenirs along Nakamise Street.",
          "Take a cruise down the Sumida River or climb the Tokyo Skytree.",
          "Spend the evening exploring the electronic wonderland of Akihabara."
        ]
      },
      {
        day: 2,
        title: "Shrines, Fashion & Shibuya Crossing",
        activities: [
          "Walk through the massive torii gates of Meiji Jingu Shrine.",
          "Explore Harajuku's Takeshita Street for crazy crepes and quirky street fashion.",
          "Stroll down the tree-lined Omotesando avenue.",
          "Head to Shibuya in the evening, cross the famous intersection, and grab sushi."
        ]
      },
      {
        day: 3,
        title: "Gardens, Skyscrapers & Shinjuku Neon",
        activities: [
          "Visit the beautiful Shinjuku Gyoen National Garden.",
          "Explore the luxury shopping malls of Ginza.",
          "Climb the Tokyo Metropolitan Government Building for a free 45th-floor view.",
          "Wander through Shinjuku's tiny alleyways like Omoide Yokocho for grilled yakitori."
        ]
      }
    ]
  },
  seoul: {
    name: "Seoul",
    coordinates: [37.5665, 126.9780],
    currencyCode: "KRW",
    exchangeRate: 1380,
    region: "Asia",
    tagline: "The Dynamic Capital of K-Pop, Palaces, and Street Food",
    heroImage: "seoul_hd.jpg",
    description: "Seoul, the capital of South Korea, is a huge metropolis where modern skyscrapers, high-tech subways and pop culture meet Buddhist temples, palaces and street markets. Notable attractions include futuristic Dongdaemun Design Plaza, a convention hall with curving architecture and a rooftop park; Gyeongbokgung Palace, which once had more than 7,000 rooms; and Jogyesa Temple, site of ancient locust and pine trees.",
    duration: "3-5 Days",
    bestTime: "September to November (Autumn) & April to June (Spring)",
    currency: "South Korean Won (₩)",
    language: "Korean",
    highlights: [
      { name: "Gyeongbokgung Palace", desc: "Watch the Changing of the Royal Guard in Hanbok traditional dress.", icon: "🏰", coordinates: [37.5796, 126.9770] },
      { name: "N Seoul Tower", desc: "Take a cable car up Namsan Mountain for scenic panoramic views.", icon: "🗼", coordinates: [37.5512, 126.9882] },
      { name: "Myeongdong Market", desc: "Shop the ultimate cosmetics district and eat delicious street food.", icon: "🛍️", coordinates: [37.5636, 126.9846] },
      { name: "Bukchon Hanok Village", desc: "Walk through a preserved neighborhood of 600-year-old traditional homes.", icon: "🏡", coordinates: [37.5826, 126.9836] }
    ],
    packing: [
      "Comfortable walking shoes (Seoul is very hilly)",
      "T-Money transport card",
      "eSIM or Pocket Wi-Fi",
      "Skincare empty bottles (to buy K-beauty refills!)",
      "Universal plug adapter"
    ],
    itinerary: [
      {
        day: 1,
        title: "Joseon Dynasty Palaces & Hanok Homes",
        activities: [
          "Rent a traditional Hanbok dress to get free admission to Gyeongbokgung Palace.",
          "Explore the historic Bukchon Hanok Village, respecting local residents' privacy.",
          "Wander through Insadong's art galleries and traditional teahouses.",
          "Have dinner at Gwangjang Market (famous for mung bean pancakes and tteokbokki)."
        ]
      },
      {
        day: 2,
        title: "Modern Design & Tower Views",
        activities: [
          "Visit the futuristic Dongdaemun Design Plaza (DDP).",
          "Walk along the peaceful urban stream of Cheonggyecheon.",
          "Climb up Namsan Mountain or take the cable car to N Seoul Tower.",
          "Shop for skincare and eat street food in Myeongdong."
        ]
      },
      {
        day: 3,
        title: "Trendy Cafes & Gangnam Style",
        activities: [
          "Visit the Starfield Library in COEX Mall, Gangnam.",
          "Explore the trendy, cafe-filled neighborhood of Hongdae.",
          "Walk along the Han River park and eat convenience store instant ramen by the water.",
          "Experience Seoul's vibrant nightlife in Itaewon or Hongdae."
        ]
      }
    ]
  },
  hongkong: {
    name: "Hong Kong",
    coordinates: [22.3193, 114.1694],
    currencyCode: "HKD",
    exchangeRate: 7.8,
    region: "Asia",
    tagline: "The Skyscraper Harbor of Dim Sum, Markets, and Peak Tram Rides",
    heroImage: "hongkong.jpg",
    description: "Hong Kong is a metropolitan area and special administrative region of China on the eastern Pearl River Delta in East Asia. With over 7.4 million people of various nationalities in a 1,104-square-kilometre territory, Hong Kong is one of the most densely populated places in the world. Hong Kong is famous for its towering skyline, natural deepwater Victoria Harbour, and delicious culinary scene.",
    duration: "3-4 Days",
    bestTime: "October to December (Cool & dry)",
    currency: "Hong Kong Dollar (HK$)",
    language: "Cantonese & English",
    highlights: [
      { name: "Victoria Peak", desc: "Ride the historic Peak Tram to the top for Hong Kong's ultimate skyline panorama.", icon: "⛰️", coordinates: [22.2759, 114.1455] },
      { name: "Star Ferry", desc: "Cross Victoria Harbour on a historic green and white passenger ferry.", icon: "🚢", coordinates: [22.2938, 114.1687] },
      { name: "Tian Tan Buddha", desc: "Climb 268 steps to see the giant bronze Buddha on Lantau Island.", icon: "⛩️", coordinates: [22.2541, 113.9050] },
      { name: "Temple Street Night Market", desc: "Browse street goods, fortune tellers, and claypot rice eateries.", icon: "🏮", coordinates: [22.3069, 114.1700] }
    ],
    packing: [
      "Light jacket (indoor air conditioning is famously freezing)",
      "Octopus Card (crucial for all public transit, ferries, and vending machines)",
      "Comfortable shoes for steep streets and stairs",
      "Power bank for long days",
      "Camera for harbor photography"
    ],
    itinerary: [
      {
        day: 1,
        title: "Hong Kong Island & Victoria Peak",
        activities: [
          "Ride the double-decker Ding Ding tram through the city center.",
          "Take the Central-Mid-Levels Escalators, the longest outdoor covered escalator system.",
          "Ride the Peak Tram up to Victoria Peak for sunset over the skyscrapers.",
          "Enjoy cocktails in Lan Kwai Fong or Soho."
        ]
      },
      {
        day: 2,
        title: "Kowloon Culture & Night Markets",
        activities: [
          "Start your morning with traditional Dim Sum (try egg tarts and char siu bao).",
          "Explore Kowloon's Nan Lian Garden and Chi Lin Nunnery.",
          "Walk down Tsim Sha Tsui Promenade and watch the 'Symphony of Lights' show at 8 PM.",
          "Explore the bustling Temple Street Night Market."
        ]
      },
      {
        day: 3,
        title: "Giant Buddha Day Trip",
        activities: [
          "Take the Ngong Ping 360 Cable Car (select glass cabin!) to Lantau Island.",
          "Visit the Tian Tan Giant Buddha and Po Lin Monastery.",
          "Explore the historic Tai O Fishing Village and see the stilt houses.",
          "Return for a late-night dinner of spicy crab at a local seafood stall."
        ]
      }
    ]
  },
  delhi: {
    name: "Delhi",
    coordinates: [28.6139, 77.2090],
    currencyCode: "INR",
    exchangeRate: 83.5,
    region: "Asia",
    tagline: "The Historical Capital of Spices, Forts, and Street Food Bazaar",
    heroImage: "delhi_hd.jpg",
    description: "Delhi, India’s capital territory, is a massive metropolitan area in the country’s north. In Old Delhi, a neighborhood dating to the 1600s, stands the imposing Mughal-era Red Fort, a symbol of India, and the sprawling Jama Masjid mosque, whose courtyard accommodates 25,000 people. Nearby is Chandni Chowk, a vibrant bazaar filled with food carts, sweet shops and spice stalls.",
    duration: "2-3 Days",
    bestTime: "October to March (Pleasant weather)",
    currency: "Indian Rupee (₹)",
    language: "Hindi & English",
    highlights: [
      { name: "Qutub Minar", desc: "Marvel at the world's tallest brick minaret, built in the 12th century.", icon: "🕌", coordinates: [28.5244, 77.1855] },
      { name: "Humayun's Tomb", desc: "Explore the spectacular red sandstone tomb that inspired the Taj Mahal.", icon: "🏛️", coordinates: [28.5933, 77.2507] },
      { name: "Chandni Chowk", desc: "Ride a rickshaw through chaotic markets packed with spices and sweets.", icon: "🌶️", coordinates: [28.6608, 77.2274] },
      { name: "India Gate", desc: "Walk down the ceremonial boulevard to Delhi's iconic war memorial arch.", icon: "🇮🇳", coordinates: [28.6129, 77.2295] }
    ],
    packing: [
      "Modest, loose clothing covering limbs (scarf is helpful for temple entry)",
      "Hand sanitizer and stomach medication (essential for travelers)",
      "Sun hat and sunglasses",
      "Mosquito repellent",
      "Comfortable walking shoes"
    ],
    itinerary: [
      {
        day: 1,
        title: "Old Delhi Heritage & Bazaars",
        activities: [
          "Visit the historic Red Fort early in the morning.",
          "Explore Jama Masjid, one of the largest mosques in India.",
          "Ride a cycle rickshaw through the narrow alleys of Chandni Chowk.",
          "Taste paranthas at the famous Gali Paranthe Wali and explore the spice market."
        ]
      },
      {
        day: 2,
        title: "New Delhi Monuments & Gardens",
        activities: [
          "Visit the tranquil Humayun's Tomb, a UNESCO World Heritage site.",
          "Walk through the lush Lodhi Gardens dotted with 15th-century tombs.",
          "Drive past the Rashtrapati Bhavan (President's Palace) and stop at India Gate.",
          "Explore Connaught Place for shopping and dining."
        ]
      },
      {
        day: 3,
        title: "Ancient Minarets & Spiritual Sites",
        activities: [
          "Explore the historic Qutub Minar complex.",
          "Visit the beautiful Lotus Temple, shaped like a flower, open to all faiths.",
          "Spend your afternoon at the modern, massive Akshardham Temple.",
          "Experience the spiritual evening qawwali music at Hazrat Nizamuddin Dargah."
        ]
      }
    ]
  },
  bali: {
    name: "Bali",
    coordinates: [-8.4095, 115.1889],
    currencyCode: "IDR",
    exchangeRate: 16300,
    region: "Asia",
    tagline: "The Tropical Island of Rice Terraces, Temples, and Surf Beaches",
    heroImage: "bali_hd.jpg",
    description: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also renowned for its yoga and meditation retreats.",
    duration: "5-7 Days",
    bestTime: "April to October (Dry season)",
    currency: "Indonesian Rupiah (Rp)",
    language: "Balinese, Indonesian & English",
    highlights: [
      { name: "Ubud Rice Terraces", desc: "Walk through the lush green steps of Tegallalang Rice Paddies.", icon: "🌾", coordinates: [-8.4354, 115.2790] },
      { name: "Uluwatu Cliff Temple", desc: "Watch a traditional Kecak fire dance on a cliff overlooking the ocean.", icon: "🌅", coordinates: [-8.8291, 115.0849] },
      { name: "Tanah Lot Temple", desc: "Photograph the iconic offshore pilgrimage temple resting on a sea rock.", icon: "⛩️", coordinates: [-8.6212, 115.0868] },
      { name: "Sacred Monkey Forest", desc: "Wander through a jungle sanctuary home to hundreds of playful macaques.", icon: "🐒", coordinates: [-8.5188, 115.2585] }
    ],
    packing: [
      "Swimwear and beach cover-ups",
      "Sarong (required to enter Balinese temples)",
      "High-factor reef-safe sunscreen and bug spray",
      "Waterproof dry bag for boat rides",
      "Flip-flops and light sneakers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Spiritual Ubud & Monkey Forest",
        activities: [
          "Wander through Ubud's Sacred Monkey Forest Sanctuary.",
          "Visit the Ubud Palace and shop for crafts at the Ubud Art Market.",
          "Walk along the Campuhan Ridge Walk for scenic valley views.",
          "Have dinner at a restaurant overlooking local rice fields."
        ]
      },
      {
        day: 2,
        title: "Water Temples & Rice Terraces",
        activities: [
          "Explore the Tegallalang Rice Terraces and ride the famous Bali swings.",
          "Take a cleansing ritual bath at Tirta Empul Holy Water Temple.",
          "Visit Pura Ulun Danu Bratan, the famous temple on Lake Bratan.",
          "Enjoy a traditional Balinese massage in Ubud."
        ]
      },
      {
        day: 3,
        title: "Cliff Temples & Sunset Kecak Dance",
        activities: [
          "Head south to the beaches of Seminyak or Uluwatu.",
          "Visit the Uluwatu Temple perched on a 70-meter-tall cliff.",
          "Watch the spectacular Kecak Fire Dance performance at sunset.",
          "Have a candlelit seafood dinner on the beach at Jimbaran Bay."
        ]
      }
    ]
  },
  newyork: {
    name: "New York",
    coordinates: [40.7128, -74.0060],
    currencyCode: "USD",
    exchangeRate: 1.0,
    region: "America",
    tagline: "The Big Apple of Broadway Shows, Skyscrapers, and Central Park",
    heroImage: "newyork_hd.jpg",
    description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers. Its iconic sites include skyscrapers like the Empire State Building and sprawling Central Park. Broadway theater is staged in neon-lit Times Square.",
    duration: "4-5 Days",
    bestTime: "April to June & September to November",
    currency: "US Dollar ($)",
    language: "English",
    highlights: [
      { name: "Statue of Liberty", desc: "Take a ferry to Liberty Island to view America's symbol of freedom.", icon: "🗽", coordinates: [40.6892, -74.0445] },
      { name: "Central Park", desc: "Explore 843 acres of lawns, lakes, and pathways in the heart of Manhattan.", icon: "🌳", coordinates: [40.7829, -73.9654] },
      { name: "Times Square & Broadway", desc: "Experience the glowing neon billboard lights and watch a theater show.", icon: "🎭", coordinates: [40.7580, -73.9855] },
      { name: "Empire State Building", desc: "Climb to the 86th-floor observatory deck of New York's ultimate landmark skyscraper.", icon: "🏢", coordinates: [40.7484, -73.9857] }
    ],
    packing: [
      "Very comfortable walking shoes (NYC requires miles of walking daily)",
      "MetroCard or tap-to-pay card for the MTA Subway system",
      "Warm coat, gloves, and hat (if visiting in winter)",
      "Crossbody bag to keep items secure on subways",
      "Portable charger"
    ],
    itinerary: [
      {
        day: 1,
        title: "Midtown Landmarks & Broadway",
        activities: [
          "Walk through Grand Central Terminal and marvel at the ceiling mural.",
          "Stroll down Fifth Avenue past St. Patrick's Cathedral and Rockefeller Center.",
          "Walk the pathways of Central Park and visit Bethesda Fountain.",
          "Walk through Times Square at night and watch a Broadway show."
        ]
      },
      {
        day: 2,
        title: "Lower Manhattan & Brooklyn Bridge",
        activities: [
          "Take the morning ferry to the Statue of Liberty and Ellis Island.",
          "Walk through Wall Street, see the Charging Bull, and visit the 9/11 Memorial.",
          "Walk across the historic wooden walkway of the Brooklyn Bridge.",
          "Have dinner in DUMBO, Brooklyn, with views of the Manhattan skyline."
        ]
      },
      {
        day: 3,
        title: "High Line Walk & Skyline Views",
        activities: [
          "Walk along the High Line, an elevated public park built on historic rail lines.",
          "Explore the shops and food hall at Chelsea Market.",
          "Visit the Edge observation deck or the Summit One Vanderbilt tower.",
          "Spend your evening dining in Greenwich Village."
        ]
      }
    ]
  },
  sanfrancisco: {
    name: "San Francisco",
    coordinates: [37.7749, -122.4194],
    currencyCode: "USD",
    exchangeRate: 1.0,
    region: "America",
    tagline: "The Golden Gate City of Cable Cars, Hills, and Alcatraz Prison",
    heroImage: "sanfrancisco_hd.jpg",
    description: "San Francisco, in northern California, is a hilly city on the tip of a peninsula surrounded by the Pacific Ocean and San Francisco Bay. It's famous for its year-round fog, iconic Golden Gate Bridge, cable cars and colorful Victorian houses. The financial district's Transamerica Pyramid is a distinctive landmark.",
    duration: "3-4 Days",
    bestTime: "September to November (Warmest weather with less fog)",
    currency: "US Dollar ($)",
    language: "English",
    highlights: [
      { name: "Golden Gate Bridge", desc: "Walk, bike, or drive across the world's most photographed orange suspension bridge.", icon: "🌁", coordinates: [37.8199, -122.4783] },
      { name: "Alcatraz Island", desc: "Tour the infamous federal penitentiary that once held Al Capone.", icon: "⚓", coordinates: [37.8270, -122.4230] },
      { name: "Fisherman's Wharf & Pier 39", desc: "See the barking sea lions and eat fresh sourdough clam chowder bowls.", icon: "🦀", coordinates: [37.8080, -122.4177] },
      { name: "Cable Cars", desc: "Hang off the side of San Francisco's historic moving landmark cable cars.", icon: "🚃", coordinates: [37.7849, -122.4082] }
    ],
    packing: [
      "Windbreaker or warm layers (SF weather is famously windy and cold, even in summer)",
      "Biking clothes (for riding across the bridge)",
      "Excellent athletic walking shoes for steep hills",
      "Small daypack",
      "Camera"
    ],
    itinerary: [
      {
        day: 1,
        title: "Cable Cars, Pier 39 & Alcatraz",
        activities: [
          "Board the Powell-Hyde cable car line from Union Square to Fisherman's Wharf.",
          "Visit Pier 39 to watch the sea lions and eat sourdough clam chowder.",
          "Take the ferry to Alcatraz Island for an audio tour of the historic prison.",
          "Explore the historic Ghirardelli Square for chocolate treats."
        ]
      },
      {
        day: 2,
        title: "Golden Gate Bridge & Park",
        activities: [
          "Rent a bicycle and ride from Fisherman's Wharf along the bay, crossing the Golden Gate Bridge to Sausalito.",
          "Take the ferry back from Sausalito to the Ferry Building.",
          "Explore the sprawling Golden Gate Park, visiting the Japanese Tea Garden.",
          "Climb up Twin Peaks at sunset for panoramic views of the bay."
        ]
      },
      {
        day: 3,
        title: "Chinatown & Victorian Homes",
        activities: [
          "Explore the historic dragon gate entry to San Francisco's Chinatown.",
          "Visit Lombard Street, the 'crookedest street in the world'.",
          "Photograph the 'Painted Ladies' Victorian houses at Alamo Square.",
          "Have dinner in the Mission District (famous for mission-style burritos)."
        ]
      }
    ]
  },
  lasvegas: {
    name: "Las Vegas",
    coordinates: [36.1716, -115.1398],
    currencyCode: "USD",
    exchangeRate: 1.0,
    region: "America",
    tagline: "The Dazzling Oasis of Neon Lights, Casinos, and Grand Shows",
    heroImage: "lasvegas_hd.jpg",
    description: "Las Vegas, in Nevada’s Mojave Desert, is a resort city famed for its vibrant nightlife, centered around 24-hour casinos and other entertainment options. Its main street and focal point is the Strip, just over 4 miles long. This boulevard is home to themed hotels with holidays displays such as fountains synchronized to music as well as replicas of an Egyptian pyramid, the Venetian Grand Canal, and the Eiffel Tower.",
    duration: "2-3 Days",
    bestTime: "March to May & September to November (Avoid extreme summer heat)",
    currency: "US Dollar ($)",
    language: "English",
    highlights: [
      { name: "The Las Vegas Strip", desc: "Walk past the massive themed resort hotels, casinos, and flashing lights.", icon: "🎰", coordinates: [36.1147, -115.1728] },
      { name: "Bellagio Fountains", desc: "Watch the spectacular synchronized water, light, and music show.", icon: "⛲", coordinates: [36.1126, -115.1767] },
      { name: "High Roller", desc: "Ride the massive 550-foot observation wheel for views of the entire valley.", icon: "🎡", coordinates: [36.1174, -115.1681] },
      { name: "Fremont Street Experience", desc: "See the historic downtown neon signs under a massive LED screen canopy.", icon: "✨", coordinates: [36.1699, -115.1429] }
    ],
    packing: [
      "Comfortable shoes for walking (resorts are massive and spaced far apart)",
      "Fancy outfit/evening wear for fine dining and club entry",
      "Hydration tablets and lotion (desert air is dry)",
      "Sunglasses and sunscreen",
      "Valid ID (required everywhere)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Resort Hopping & Bellagio Fountains",
        activities: [
          "Begin walking the Strip, exploring the Venetian (gondolas) and Caesar's Palace.",
          "Watch the Bellagio Fountain show, which performs every 15-30 minutes.",
          "Take a photo under the famous 'Welcome to Fabulous Las Vegas' sign.",
          "Watch an award-winning Cirque du Soleil show in the evening."
        ]
      },
      {
        day: 2,
        title: "Neon Museums & Fremont Street",
        activities: [
          "Visit the Neon Museum to see retired historic casino signs.",
          "Ride the SlotZilla zipline under the Fremont Street canopy.",
          "Explore the downtown Container Park shopping area.",
          "Have dinner at an upscale buffet or celebrity chef restaurant."
        ]
      },
      {
        day: 3,
        title: "Grand Canyon Day Trip",
        activities: [
          "Take an early morning helicopter or bus day-tour to the Grand Canyon West Rim.",
          "Walk the glass skywalk over the canyon edge.",
          "Return to Las Vegas, ride the High Roller observation wheel.",
          "Spend your final evening exploring the Linq Promenade."
        ]
      }
    ]
  },
  washington: {
    name: "Washington, D.C.",
    coordinates: [38.9072, -77.0369],
    currencyCode: "USD",
    exchangeRate: 1.0,
    region: "America",
    tagline: "The Nation's Capital of Free Museums and Neo-Classical Monuments",
    heroImage: "washington_hd.jpg",
    description: "Washington, D.C., the U.S. capital, is a compact city on the Potomac River, bordering the states of Maryland and Virginia. It’s defined by imposing neoclassical monuments and buildings – including the iconic ones that house the federal government’s 3 branches: the Capitol, White House and Supreme Court. It's also home to famous museums and performing-arts venues such as the Kennedy Center.",
    duration: "3-4 Days",
    bestTime: "March to May (Cherry blossom season) & September to November",
    currency: "US Dollar ($)",
    language: "English",
    highlights: [
      { name: "The Smithsonian Museums", desc: "Explore the world's largest museum complex (completely free admission).", icon: "🏛️", coordinates: [38.8888, -77.0260] },
      { name: "Lincoln Memorial & Reflecting Pool", desc: "Stand where Martin Luther King Jr. delivered his 'I Have a Dream' speech.", icon: "⛲", coordinates: [38.8893, -77.0502] },
      { name: "The White House & US Capitol", desc: "Photograph the centers of American political power.", icon: "🏛️", coordinates: [38.8977, -77.0365] },
      { name: "National Mall", desc: "Walk the grand parkway linking the Washington Monument to the Capitol.", icon: "🌳", coordinates: [38.8896, -77.0230] }
    ],
    packing: [
      "Excellent walking shoes (the National Mall is over 2 miles long)",
      "Light umbrella",
      "Camera for monuments",
      "Refillable water bottle",
      "Smarter clothing (if booking Capitol/White House tours)"
    ],
    itinerary: [
      {
        day: 1,
        title: "The National Mall & Memorials",
        activities: [
          "Start at the Washington Monument and walk down the National Mall.",
          "Visit the World War II Memorial, Lincoln Memorial, and Vietnam Veterans Memorial.",
          "Stand by the Reflecting Pool and walk to the Martin Luther King, Jr. Memorial.",
          "See the monuments lit up beautifully at night on a guided trolley tour."
        ]
      },
      {
        day: 2,
        title: "Free Smithsonian Museums & Capitol",
        activities: [
          "Take a tour of the U.S. Capitol Building (book in advance).",
          "Visit the Smithsonian National Air and Space Museum.",
          "Explore the National Museum of Natural History.",
          "Stroll down the historic streets of Georgetown and have dinner by the canal."
        ]
      },
      {
        day: 3,
        title: "History, Politics & Arts",
        activities: [
          "Take photos outside the White House gates at Lafayette Square.",
          "Explore the Library of Congress, the largest library in the world.",
          "Visit the National Gallery of Art.",
          "Watch a performance at the John F. Kennedy Center for the Performing Arts."
        ]
      }
    ]
  },
  hawaii: {
    name: "Hawaii",
    coordinates: [21.3069, -157.8583],
    currencyCode: "USD",
    exchangeRate: 1.0,
    region: "America",
    tagline: "The Island Paradise of Volcanic Peaks, Hula, and Surf Bays",
    heroImage: "hawaii_hd.jpg",
    description: "Hawaii is an isolated volcanic archipelago in the Central Pacific. The islands are renowned for their rugged landscapes of cliffs, waterfalls, tropical foliage and beaches with gold, red, black and even green sands. Of the 6 main islands, Oahu has Hawaii’s capital, Honolulu, home to the crescent-shaped beach of Waikiki and the World War II memorials at Pearl Harbor.",
    duration: "5-7 Days",
    bestTime: "April to May & September to November",
    currency: "US Dollar ($)",
    language: "English & Hawaiian",
    highlights: [
      { name: "Waikiki Beach", desc: "Surf, swim, and sunbathe on Honolulu's most famous white sand shoreline.", icon: "🏄", coordinates: [21.2758, -157.8242] },
      { name: "Pearl Harbor National Memorial", desc: "Visit the USS Arizona Memorial to learn about the history of WWII.", icon: "⚓", coordinates: [21.3650, -157.9472] },
      { name: "Diamond Head State Monument", desc: "Hike up a volcanic tuff cone crater for views over Honolulu.", icon: "🌋", coordinates: [21.2620, -157.8062] },
      { name: "Hanauma Bay", desc: "Snorkel in a protected volcanic crater teeming with colorful marine life.", icon: "🐠", coordinates: [21.2690, -157.6938] }
    ],
    packing: [
      "Reef-safe sunscreen (mandatory by Hawaii law to protect coral reefs)",
      "Swimwear, rash guard, and beach towels",
      "Comfortable hiking sandals or shoes",
      "Waterproof camera (GoPro) for snorkeling",
      "Light linen shirts and sundresses"
    ],
    itinerary: [
      {
        day: 1,
        title: "Waikiki Surf & Diamond Head Hike",
        activities: [
          "Hike up Diamond Head Crater early in the morning for sunrise views over Oahu.",
          "Spend your afternoon taking a surf lesson on Waikiki Beach.",
          "Stroll down Kalakaua Avenue for shopping.",
          "Watch the sunset over the ocean and attend a beachside Luau with hula dancing."
        ]
      },
      {
        day: 2,
        title: "Snorkeling & Volcano Craters",
        activities: [
          "Go snorkeling at the beautiful Hanauma Bay Nature Preserve.",
          "Visit the Halona Blowhole and look for sea turtles.",
          "Drive up the windward coast to Kailua Beach for turquoise waters.",
          "Enjoy local Hawaiian food like Poke bowls and Shave Ice."
        ]
      },
      {
        day: 3,
        title: "Pearl Harbor & North Shore Surf",
        activities: [
          "Visit the Pearl Harbor National Memorial and board the USS Arizona.",
          "Drive north to the famous North Shore (home to massive winter surf waves).",
          "Watch surfers at Waimea Bay or Pipeline.",
          "Taste garlic shrimp from the famous North Shore food trucks."
        ]
      }
    ]
  }
};
