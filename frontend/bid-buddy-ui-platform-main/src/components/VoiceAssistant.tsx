import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if speech recognition is available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const currentTranscript = event.results[0][0].transcript;
        setTranscript(currentTranscript);
        
        if (event.results[0].isFinal) {
          processVoiceCommand(currentTranscript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let assistantResponse = '';

    if (lowerCommand.includes('bid') || lowerCommand.includes('place bid')) {
      assistantResponse = 'I can help you place a bid. Which auction item would you like to bid on?';
    } else if (lowerCommand.includes('search') || lowerCommand.includes('find')) {
      assistantResponse = 'I can search for auction items. What would you like to find?';
    } else if (lowerCommand.includes('status') || lowerCommand.includes('my bids')) {
      assistantResponse = 'You currently have 3 active bids and are winning 1 auction.';
    } else if (lowerCommand.includes('help')) {
      assistantResponse = 'I can help you with bidding, searching auctions, checking your bid status, and more. What would you like to do?';
    } else {
      assistantResponse = `I heard: "${command}". I can help with bidding, searching, or checking your auction status. What would you like to do?`;
    }

    setResponse(assistantResponse);
    
    // Text-to-speech response
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(assistantResponse);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        setTranscript('');
        setResponse('');
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert('Speech recognition is not supported in your browser.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={toggleListening}
        className={`w-16 h-16 rounded-full ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-lg'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg'
        } text-white transition-all duration-300 hover:scale-110`}
      >
        {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
      </Button>

      {isListening && (
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-gray-600 text-sm">Listening...</p>
        </div>
      )}

      {transcript && (
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 max-w-md border border-gray-200/50 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Mic className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500 text-sm">You said:</span>
          </div>
          <p className="text-gray-800">{transcript}</p>
        </div>
      )}

      {response && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 backdrop-blur-sm rounded-lg p-4 max-w-md border border-indigo-200/50 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Volume2 className="w-4 h-4 text-indigo-600" />
            <span className="text-indigo-600 text-sm">Assistant:</span>
          </div>
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
