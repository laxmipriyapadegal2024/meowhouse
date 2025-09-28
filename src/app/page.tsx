import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-burgundy-gradient relative overflow-hidden">
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <h1 className="font-script text-6xl lg:text-7xl font-bold">
                dishcovery
              </h1>
              <p className="text-xl lg:text-2xl text-wine-100 leading-relaxed">
                Your personal recipe finder,
                <br />
                generator, and forum
              </p>
            </div>

            {/* Right Content - Chef Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
                {/* Chef SVG placeholder - you can replace with actual chef illustration */}
                <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-8xl">👨‍🍳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Dishcovery Offers Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Dishcovery offers
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Search Recipes */}
            <div className="bg-burgundy-700 p-8 rounded-lg text-center">
              <div className="mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-4">SEARCH RECIPES</h3>
              <p className="text-wine-100 leading-relaxed">
                Search through a vast collection of delicious recipes from
                around the world and find the perfect dish to match your taste
                preferences.
              </p>
            </div>

            {/* Generate Recipes */}
            <div className="bg-burgundy-600 p-8 rounded-lg text-center">
              <div className="mb-6">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-xl font-bold mb-4">GENERATE RECIPES</h3>
              <p className="text-wine-100 leading-relaxed">
                Get AI-generated customized recipe suggestions based on your
                dietary preferences, available ingredients, and cooking skill
                level.
              </p>
            </div>

            {/* Upload Recipes */}
            <div className="bg-burgundy-800 p-8 rounded-lg text-center">
              <div className="mb-6">
                <span className="text-4xl">📤</span>
              </div>
              <h3 className="text-xl font-bold mb-4">UPLOAD RECIPES</h3>
              <p className="text-wine-100 leading-relaxed">
                Contribute to our growing collection by uploading your own
                family recipes and unique culinary creations to share with
                others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Popular Recipes
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pasta */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <span className="text-6xl">🍝</span>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              </div>
              <h3 className="text-xl font-bold text-center text-burgundy-800">
                PASTA
              </h3>
            </div>

            {/* Paneer Tikka */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <span className="text-6xl">🧄</span>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              </div>
              <h3 className="text-xl font-bold text-center text-burgundy-800">
                PANEER TIKKA
              </h3>
            </div>

            {/* Veg Rolls */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <span className="text-6xl">🌯</span>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              </div>
              <h3 className="text-xl font-bold text-center text-burgundy-800">
                VEG ROLLS
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">FOLLOW US</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-2xl hover:text-burgundy-400 transition-colors"
                >
                  📷
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-burgundy-400 transition-colors"
                >
                  👥
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-burgundy-400 transition-colors"
                >
                  📌
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-burgundy-400 transition-colors"
                >
                  ✕
                </a>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end space-x-4">
                <div>
                  <h4 className="font-bold">Dishcovery</h4>
                  <p className="text-sm text-gray-400">Recipe</p>
                  <p className="text-sm text-gray-400">Food Discovery</p>
                  <p className="text-sm text-gray-400">Culinary</p>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🍳</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 Dishcovery. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
