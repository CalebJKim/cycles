import React, { useState, useRef, useEffect } from 'react';
import { Paper, Typography, Box, Link } from '@mui/material';
import { CircularGraph } from './circulargraph';

interface SentimentScoreCardProps {
  score: number;
  fullText: string;
}

const SentimentScoreCard: React.FC<SentimentScoreCardProps> = ({ score, fullText }) => {
  const [expanded, setExpanded] = useState(false);
  const [truncatedText, setTruncatedText] = useState('');
  const textRef = useRef<HTMLParagraphElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && circleRef.current) {
      const circleHeight = circleRef.current.offsetHeight;
      const words = fullText.split(' ');
      let result = '';
      let i = 0;
      
      while (i < words.length) {
        result += words[i] + ' ';
        textRef.current.innerText = result + '...';
        if (textRef.current.offsetHeight > circleHeight) {
          textRef.current.innerText = result.trim().slice(0, -1) + '...';
          break;
        }
        i++;
      }
      setTruncatedText(textRef.current.innerText);
    }
  }, [fullText]);

  const toggleExpand = () => setExpanded(!expanded);

  const getSentiment = (score: number) => {
    if (score >= 70) return "Positive";
    if (score >= 30) return "Neutral";
    return "Negative";
  };

  return (
    <Paper elevation={1} sx={{ borderRadius: 2, p: 2, width: '100%', mb: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Overall Sentiment Score
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box ref={circleRef} sx={{ mr: 3 }}>
          <CircularGraph percentage={score} sentiment={getSentiment(score)} />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: 120, justifyContent: 'space-between' }}>
          <Typography ref={textRef} variant="body2" sx={{ mb: 1, flex: 1, overflow: 'hidden' }}>
            {expanded ? fullText : truncatedText}
          </Typography>
          <Link
            component="button"
            onClick={toggleExpand}
            sx={{ textTransform: 'none', color: '#2196f3', alignSelf: 'flex-start', fontSize: '0.875rem' }}
          >
            {expanded ? 'See Less' : 'See More'}
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default SentimentScoreCard;