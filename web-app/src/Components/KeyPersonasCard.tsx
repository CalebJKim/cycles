import React, { useEffect, useState } from "react";
import Persona from "./Persona";
import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Illustration from "../Images/Illustration.svg"

interface Persona {
  title: string;
  description: string;
  imageSrc: string;
  response: string;
  cycle: string;
}

const personaData = [
  {
    title: "Fitness Enthusiast and Influencer",
    score: 95,
    description: `Emma is a popular fitness influencer with a large social media following. She's among the first to view and share the Nike ad. "This Nike ad perfectly captures the spirit of pushing your limits. The cinematography is stunning, and the message really resonates with my fitness philosophy. I can't wait to share this with my followers and incorporate some of these new Nike products into my workout routines."`,
  },
  {
    title: "Sports Fan and Recreational Athlete",
    score: 85,
    description: `Alex is an avid sports fan and recreational athlete who follows several fitness influencers. He sees the ad a few days after its release through social media shares. "I saw this Nike ad shared by some of the fitness accounts I follow. It's pretty inspiring stuff! The new shoe designs look awesome, and I'm thinking about picking up a pair for my weekend games. The only thing holding me back is the price point, but the quality seems worth it."`,
  },
  {
    title: "Casual Consumer",
    score: 60,
    description: `Taylor is a fashion-conscious individual who isn't particularly athletic but appreciates stylish sportswear. She encounters the ad about a week after its release as it gains broader traction. "This Nike commercial has been all over my social feeds lately. The visuals are cool, and I like how they're showcasing diversity in their athletes. The shoes look trendy enough to wear casually too. I'm not super into sports, but it makes me want to at least check out their latest collection for some everyday wear options."`,
  },
  {
    title: "Sports Fan and Recreational Athlete",
    score: 85,
    description: `Alex is an avid sports fan and recreational athlete who follows several fitness influencers. He sees the ad a few days after its release through social media shares. "I saw this Nike ad shared by some of the fitness accounts I follow. It's pretty inspiring stuff! The new shoe designs look awesome, and I'm thinking about picking up a pair for my weekend games. The only thing holding me back is the price point, but the quality seems worth it."`,
  },
  {
    title: "Sports Fan and Recreational Athlete",
    score: 85,
    description: `Alex is an avid sports fan and recreational athlete who follows several fitness influencers. He sees the ad a few days after its release through social media shares. "I saw this Nike ad shared by some of the fitness accounts I follow. It's pretty inspiring stuff! The new shoe designs look awesome, and I'm thinking about picking up a pair for my weekend games. The only thing holding me back is the price point, but the quality seems worth it."`,
  },
  {
    title: "Sports Fan and Recreational Athlete",
    score: 85,
    description: `Alex is an avid sports fan and recreational athlete who follows several fitness influencers. He sees the ad a few days after its release through social media shares. "I saw this Nike ad shared by some of the fitness accounts I follow. It's pretty inspiring stuff! The new shoe designs look awesome, and I'm thinking about picking up a pair for my weekend games. The only thing holding me back is the price point, but the quality seems worth it."`,
  },
];

const KeyPersonasCard = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Make the API call to Flask backend
    const fetchData = () => {
      axios
        .get("http://localhost:5000/api/personas")
        .then((response) => {
          const personasArray: Persona[] = response.data.message.map(
            (tuple: any) => ({
              title: tuple[3],
              cycle: "Cycle " + tuple[2],
              description: tuple[5],
              response: tuple[6],
              imageSrc: "https://i.imgur.com/2alOrqT.jpeg",
            })
          );
          setPersonas(personasArray);
        })
        .catch((error) => setError(error.message));
    };
    fetchData();
    const interval = setInterval(fetchData, 100);
    return () => clearInterval(interval);
  }, []);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return personas.length !== 0 ? (
    <Paper
      variant="outlined"
      sx={{
        width: "96.5%",
        p: "1.5rem",
        margin: "1rem",
        maxHeight: "62.8%",
        minHeight: "62.8%",
        overflow: "auto",
        textAlign: "left",
        borderRadius: "15px",
      }}
    >
      <Typography variant="h6" sx={{ mb: ".5rem", fontWeight: 'bold' }}>
        Key Personas
      </Typography>
      <Stack spacing={2}>
        {personas.slice(0, 3).map((persona, index) => (
          <React.Fragment key={index}>
            <Persona
              id={index + 1}
              title={persona.title}
              description={persona.description.split("\n")[0]}
            />
            {index < 2 && <Divider sx={{ bgcolor: "#B0B0B0", my: 2 }} />}
          </React.Fragment>
        ))}
      </Stack>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          mt: 2,
          float: "right",
          borderRadius: "20px",
          backgroundColor: "#487DE7",
          color: "white",
          padding: "4px 12px",
          fontSize: "12px",
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#3a6dbf",
            boxShadow: "none",
          },
        }}
      >
        See More
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "70vw",
            height: "80vh",
            maxWidth: "none",
            borderRadius: "15px",
          },
        }}
      >
        <DialogContent
          sx={{
            p: 4,
            position: "relative",
            overflowY: "auto",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mb: ".5rem" }}>
            Key Personas
          </Typography>
          {personas.map((persona, index) => (
            <React.Fragment key={index}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography variant="subtitle1" sx={{ lineHeight: 1.6 }}>
                  Persona {index + 1}
                </Typography>
                <Typography variant="subtitle1" sx={{ lineHeight: 1.6 }}>
                  {0}% Positive
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mb: 1 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", flexGrow: 1, lineHeight: 1.6 }}
                >
                  {persona.title}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={0}
                  sx={{
                    width: "180px",
                    height: 6,
                    borderRadius: 5,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#487DE7",
                    },
                    backgroundColor: "#FF5D5D",
                  }}
                />
              </Stack>
              <Typography
                variant="body2"
                sx={{ lineHeight: 1.6, mt: ".5rem", mb: "1rem" }}
              >
                {persona.description}
              </Typography>
              {index < personaData.length - 1 && (
                <Divider sx={{ bgcolor: "#B0B0B0", my: 2 }} />
              )}
            </React.Fragment>
          ))}
        </DialogContent>
      </Dialog>
    </Paper>
  ) : (
    <Paper
      variant="outlined"
      sx={{
        width: "95%",
        p: "1.5rem",
        margin: "1rem",
        maxHeight: "62.8%",
        minHeight: "62.8%",
        overflow: "auto",
        textAlign: "left",
        borderRadius: "15px",
      }}
    >
      <Typography variant="h6" sx={{ mb: ".5rem", fontWeight: 'bold'}}>
        Key Personas
      </Typography>
      {/* <Typography>Upload media to simulate user personas!</Typography> */}
      <Box
        component="img"
        src= {Illustration}
        sx={{ width: '60%', mt: 7, ml: 12, borderRadius: '8px' }}
      />
    </Paper>
  );
};

export default KeyPersonasCard;
