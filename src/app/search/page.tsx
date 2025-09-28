import Navigation from '@/components/Navigation';

export default function SearchPage() {
  const categories = [
    { name: 'SALADS', emoji: '🥗', color: 'from-green-400 to-emerald-500' },
    { name: 'DESSERT', emoji: '🍰', color: 'from-pink-400 to-rose-500' },
    { name: 'SNACKS', emoji: '🍿', color: 'from-yellow-400 to-orange-500' },
    { name: 'MEALS', emoji: '🍽️', color: 'from-blue-400 to-indigo-500' },
    { name: 'PASTA', emoji: '🍝', color: 'from-orange-400 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Search Section */}
      <section className="bg-burgundy-gradient py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="enter recipe name to search"
                className="w-full px-6 py-4 rounded-full text-lg border-2 border-white/20 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-burgundy-700 text-white p-3 rounded-full hover:bg-burgundy-800 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            <div className="text-center mt-4">
              <span className="text-white/80 text-sm">570+</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`relative overflow-hidden rounded-full mb-3 aspect-square bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <span className="text-4xl md:text-5xl">{category.emoji}</span>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                </div>
                <h3 className="text-center font-bold text-burgundy-800 text-sm md:text-base">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dietary Filters Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white border-2 border-burgundy-700 text-burgundy-700 px-6 py-2 rounded-full font-medium hover:bg-burgundy-700 hover:text-white transition-colors">
              VEGETARIAN
            </button>
            <button className="bg-white border-2 border-burgundy-700 text-burgundy-700 px-6 py-2 rounded-full font-medium hover:bg-burgundy-700 hover:text-white transition-colors">
              NON-VEGETARIAN
            </button>
            <button className="bg-white border-2 border-burgundy-700 text-burgundy-700 px-6 py-2 rounded-full font-medium hover:bg-burgundy-700 hover:text-white transition-colors">
              VEGAN
            </button>
          </div>
        </div>
      </section>

      {/* Chef Illustration */}
      <section className="py-16 bg-burgundy-gradient">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center">
              <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-6xl lg:text-8xl">👨‍🍳</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}