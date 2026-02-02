function Features() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">MMO Game Player</h2>
            <p className="text-lg">Play in multiple worlds, interact with players worldwide, and embark on epic adventures.</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">World Creator</h2>
            <p className="text-lg">Design your own worlds with powerful tools, publish them, and share your creations with the community.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;