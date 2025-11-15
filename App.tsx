import React, { useState, useEffect } from 'react';

// --- Reusable Typing Effect Component ---
interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 100, className = '', onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeoutId);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [displayedText, text, speed, onComplete, isComplete]);

  return <p className={className}>{displayedText}</p>;
};

// --- Page 1: Landing Page ---
interface LandingPageProps {
  onNext: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  const [mood, setMood] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const handleContinue = () => {
    if (mood.trim() === '') return;
    const waUrl = `https://wa.me/6285772583480?text=Hai,%20jawabanku:%20${encodeURIComponent(mood)}`;
    window.open(waUrl, '_blank');
    onNext();
  };

  return (
    <div className="w-full max-w-lg p-8 text-center space-y-8 bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 fade-in">
      <TypingEffect
        text="hai, sebelum kamu lanjut, gimana kamu hari ini, are you happy?? how was your day?"
        className="font-cormorant text-2xl md:text-3xl text-pink-100 leading-relaxed"
        onComplete={() => setIsTyping(false)}
      />
      <div className={`transition-opacity duration-1000 ease-in-out ${isTyping ? 'opacity-0' : 'opacity-100'} space-y-8`}>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="tulis jawabanmu di sini yaa..."
          className="w-full bg-white/10 text-white placeholder-pink-200/70 border border-pink-300/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
        />
        <button
          onClick={handleContinue}
          disabled={mood.trim() === ''}
          className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-lg shadow-pink-500/30 hover:bg-pink-600 hover:scale-105 disabled:bg-pink-400/50 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-300"
        >
          Lanjut
        </button>
      </div>
    </div>
  );
};

// --- Page 2: Gift Message Page ---
interface GiftMessagePageProps {
  onNext: () => void;
}

const GiftMessagePage: React.FC<GiftMessagePageProps> = ({ onNext }) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  return (
    <div className="w-full max-w-lg p-8 text-center space-y-8 bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 fade-in-slow">
       <TypingEffect
        text="ini ada kado, sesuai janji aku buat kamu, semoga kamu happy dan sukaaa dengan kadonya yaa, and hope you're open this gift while you are happy 🌷🤍"
        className="font-cormorant text-2xl md:text-3xl text-pink-100 leading-relaxed"
        speed={70}
        onComplete={() => setIsTypingComplete(true)}
      />
      {isTypingComplete && (
        <button 
          onClick={onNext}
          className="px-8 py-3 bg-white text-pink-600 font-semibold rounded-full shadow-lg shadow-white/30 hover:scale-105 transition-all duration-300 fade-in"
        >
          Next
        </button>
      )}
    </div>
  );
};

// --- Page 3: Song Choice Page ---
const SongChoicePage: React.FC = () => {
    const [choiceMade, setChoiceMade] = useState(false);

    const handleChoice = () => {
        setChoiceMade(true);
    };

    const MysteryBox: React.FC<{ title: string; barcodeSrc: string; spotifyUrl: string }> = ({ title, barcodeSrc, spotifyUrl }) => (
        <div 
            onClick={handleChoice} 
            className="group relative w-full sm:w-64 h-32 bg-black/20 backdrop-blur-sm border border-pink-300/30 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-pink-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] overflow-hidden"
        >
            <span className="font-cormorant text-xl text-pink-200 group-hover:opacity-0 transition-opacity duration-300">{title}</span>
            <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/70 p-4">
                <img src={barcodeSrc} alt="Spotify Barcode" className="h-full object-contain" />
            </a>
        </div>
    );

    return (
        <div className="w-full max-w-2xl p-8 text-center space-y-8 bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 fade-in">
            <p className="font-cormorant text-2xl text-pink-100">
                choose one of these two songs while you read the text
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <MysteryBox title="Mystery Choice 1" barcodeSrc="https://i.ibb.co/K50sMh5/image.png" spotifyUrl="https://open.spotify.com/track/3UN5BBwxoHbwFGxWNvaEj7" />
                <MysteryBox title="Mystery Choice 2" barcodeSrc="https://i.ibb.co/q9fW7z3/image-1.png" spotifyUrl="https://open.spotify.com/track/1oWnDC5OoMPPosVY2cdXgT" />
            </div>
            {choiceMade && (
                <p className="font-cormorant text-2xl text-white glow-text pt-6 fade-in">
                    happy reading prettyyy
                </p>
            )}
        </div>
    );
};


// --- Main App Component ---
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <LandingPage onNext={() => setCurrentPage(2)} />;
      case 2:
        return <GiftMessagePage onNext={() => setCurrentPage(3)} />;
      case 3:
        return <SongChoicePage />;
      default:
        return <LandingPage onNext={() => setCurrentPage(2)} />;
    }
  };

  return (
    <main className="min-h-screen w-full text-white flex items-center justify-center p-4 relative z-10">
      {renderPage()}
    </main>
  );
};

export default App;