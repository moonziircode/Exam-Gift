
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
    <div className="w-full max-w-lg p-8 text-center space-y-8 fade-in">
      <TypingEffect
        text="hai, sebelum kamu lanjut, gimana kamu hari ini, are you happy?? how was your day?"
        className="font-cormorant text-2xl md:text-3xl text-[#dcdcdc] leading-relaxed"
        onComplete={() => setIsTyping(false)}
      />
      <div className={`transition-opacity duration-1000 ease-in-out ${isTyping ? 'opacity-0' : 'opacity-100'} space-y-8`}>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="tulis jawabanmu di sini yaa..."
          className="w-full bg-[#1a1a1a] text-[#dcdcdc] placeholder-gray-500 border border-[#3a3a3a] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#dcdcdc] transition-all duration-300"
        />
        <button
          onClick={handleContinue}
          disabled={mood.trim() === ''}
          className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-300"
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
  return (
    <div className="w-full max-w-lg p-8 text-center space-y-8 fade-in-slow">
      <p className="font-cormorant text-2xl md:text-3xl text-[#dcdcdc] leading-relaxed">
        ini kado yang udah aku janjiin buat kamu, semoga kamu happy dengan kadonya yaa, and hope you're open this gift while you are happy
      </p>
      <button 
        onClick={onNext}
        className="px-8 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300 animate-[fadeInAnimation_1.2s_ease-in-out_1s_forwards] opacity-0"
      >
        Next
      </button>
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
            className="group relative w-full sm:w-64 h-32 bg-black bg-opacity-40 backdrop-blur-sm border border-gray-700 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] overflow-hidden"
        >
            <span className="font-cormorant text-xl text-gray-400 group-hover:opacity-0 transition-opacity duration-300">{title}</span>
            <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-70 p-4">
                <img src={barcodeSrc} alt="Spotify Barcode" className="h-full object-contain" />
            </a>
        </div>
    );

    return (
        <div className="w-full max-w-2xl p-8 text-center space-y-8 fade-in">
            <p className="font-cormorant text-2xl text-[#dcdcdc]">
                choose these two songs while you read the text
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
    <main className="min-h-screen bg-gradient-to-br from-black to-[#1a1a1a] text-white flex items-center justify-center p-4">
      {renderPage()}
    </main>
  );
};

export default App;
