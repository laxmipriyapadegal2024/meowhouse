import Navigation from '@/components/Navigation';

export default function WritePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-burgundy-800 mb-8 text-center">
            Share Your Recipe
          </h1>
          
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Recipe Name</label>
              <input
                type="text"
                placeholder="Enter recipe name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                placeholder="Tell us about your recipe..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Prep Time</label>
                <input
                  type="text"
                  placeholder="e.g., 15 minutes"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Cook Time</label>
                <input
                  type="text"
                  placeholder="e.g., 30 minutes"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ingredients</label>
              <textarea
                placeholder="List your ingredients..."
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Instructions</label>
              <textarea
                placeholder="Step by step instructions..."
                rows={8}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="bg-burgundy-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-burgundy-800 transition-colors"
              >
                Share Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}