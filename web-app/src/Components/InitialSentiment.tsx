import React, { useState, useRef, useEffect } from 'react';
import { Paper, Typography, Box, Link, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Chip } from '@mui/material';
import { CircularGraph } from './circulargraph';
import Summary from './Summary';
import axios from "axios";
import Analysis from './Analysis';
import ScoreIllustration from "../Images/ScoreIllustration.svg";

interface SentimentScoreCardProps {
  data: { summary: string; score: number; cycle: string; }[];
  score: number;
}

const SentimentScoreCard: React.FC<SentimentScoreCardProps> = ({ data, score }) => {
  interface Cycle {
    //id: number;
    summary: string;
    score: number;
    cycle: number;
    //pv: number;
    //amt: number;
    //sessionId: number;
  }

  const [expanded, setExpanded] = useState(false);
  const [truncatedText, setTruncatedText] = useState('');
  const textRef = useRef<HTMLParagraphElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => setExpanded(!expanded);

  const [open, setOpen] = useState(false);

  const seeMore = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // const getSentiment = (score: number) => {
  //   if (score >= 70) return "Positive";
  //   if (score >= 30) return "Neutral";
  //   return "Negative";
  // };

  return (
    data.length !== 0 ?
    <>
    <Paper variant="outlined" sx={{ borderRadius: "15px", margin: "1rem", width: '96.5%', p: "1.5rem"}}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Overall Sentiment Score
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box ref={circleRef} sx={{ mr: 3 }}>
          {/* <CircularGraph percentage={(0) ? (typeof data === 'undefined') : (data[0].score)} sentiment={getSentiment(data[0].score)} /> */}
          <CircularGraph percentage={score} />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: 130, justifyContent: 'space-between' }}>
          <Typography ref={textRef} variant="body2" sx={{ mb: 1, flex: 1, overflow: 'hidden' }}>
            <Summary numSummaries={1} summaries={data} />
          </Typography>
          <Chip
            label="See More"
            variant="outlined"
            size="small"
            onClick={seeMore}
            sx={{ alignItems: "center", pl: ".5rem", pr: ".5rem" }}
          />
        </Box>
      </Box>
    </Paper>
    <Dialog
    open={open}
    onClose={handleClose}
    scroll={"paper"}
    aria-labelledby="scroll-dialog-title"
    aria-describedby="scroll-dialog-description"
    PaperProps = {{sx : { width: "100%"}}}
  >
    <DialogTitle id="scroll-dialog-title">Summaries</DialogTitle>
    <DialogContent dividers={true}>
      <DialogContentText
        id="scroll-dialog-description"
        ref={descriptionElementRef}
        tabIndex={-1}
        sx= {{width: "100%"}}
      >
        <Summary
          numSummaries={data.length}
          summaries={data}
        />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
  </>
  :
  <Paper variant="outlined" sx={{ borderRadius: "15px", margin: "1rem", width: '95%', p: "1.5rem" }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Overall Sentiment Score
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box ref={circleRef} sx={{ mr: 3 }}>
          <CircularGraph percentage={0} />
        </Box>
        <Box sx={{ ml: 20, mt: -4}}>
          <Typography ref={textRef} variant="body2" sx={{ mb: 1 }}>
            Upload media to simulate user sentiment cycles!
          </Typography>
          <Box
            component="img"
            src={ScoreIllustration}
            alt="Score Illustration"
            sx={{ width: '90%', mt: 2, borderRadius: '8px' }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default SentimentScoreCard;