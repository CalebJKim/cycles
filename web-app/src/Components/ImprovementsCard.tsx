import React, { useEffect, useRef, useState } from "react";
import {
  Paper,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Analysis from "./Analysis";
import ImprovementIllustration from "../Images/ImprovementIllustration.svg"

interface ImprovementCardProps {
  data: {
    cycle: string;
    score: number;
    pv: number;
    amt: number;
    improvement: string;
  }[];
}

const ImprovementsCard: React.FC<ImprovementCardProps> = ({ data }) => {
  const analysis = [
    {
      point:
        "Gender Representation: A portion of the audience pointed out that the ad featured predominantly male athletes, raising concerns about the lack of strong female representation in key moments, which might be perceived as not fully embracing gender equality.",
    },
    {
      point:
        "Cultural Sensitivity: Some viewers expressed concern over the use of certain cultural symbols and practices in the background of the ad, feeling they were presented without proper context, potentially leading to accusations of cultural appropriation.",
    },
    {
      point:
        "Overused Visual Tropes: The scenes featuring athletes running through urban streets were noted as repetitive and too similar to prior Nike campaigns, which made the ad feel less original.",
    },
    {
      point:
        "Disconnected Voiceover: While the voiceover conveyed a powerful message, a few viewers felt the tone didn’t match the visuals, making parts of the narration feel out of sync with the emotional journey on screen.",
    },
    {
      point:
        "Gender Representation: A portion of the audience pointed out that the ad featured predominantly male athletes, raising concerns about the lack of strong female representation in key moments, which might be perceived as not fully embracing gender equality.",
    },
    {
      point:
        "Gender Representation: A portion of the audience pointed out that the ad featured predominantly male athletes, raising concerns about the lack of strong female representation in key moments, which might be perceived as not fully embracing gender equality.",
    },
    {
      point:
        "Gender Representation: A portion of the audience pointed out that the ad featured predominantly male athletes, raising concerns about the lack of strong female representation in key moments, which might be perceived as not fully embracing gender equality.",
    },
  ];

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

  return data.length !== 0 ? (
    <>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: "15px",
          width: "95%",
          p: "1.5rem",
          margin: "1rem",
          maxHeight: "45.42%",
          minHeight: "45.42%",
          overflow: "hidden",
          textAlign: "left",
        }}
      >
        <Stack alignItems="center">
          <Stack
            spacing={2}
            alignItems="flex-start"
            sx={{ textAlign: "left", mb: "1rem" }}
          >
            <Typography
              variant="h6"
              sx={{ fontFamily: "Inter", fontWeight: "bold" }}
            >
              Areas of Improvement
            </Typography>
            <Analysis
              numPoints={4}
              truncate={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
              data={data}
            />
          </Stack>
          <Button
            variant="contained"
            onClick={seeMore}
            sx={{
              mt: "auto",
              // fontWeight: "bold",
              alignSelf: "flex-end",
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
        </Stack>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          sx: {
            width: "70vw",
            height: "80vh",
            maxWidth: "none",
            borderRadius: "15px",
          },
        }}
      >
        <DialogContent dividers={true}>
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
          <Typography
            variant="h6"
            sx={{ fontFamily: "Inter", fontWeight: "bold", mb: ".5rem" }}
          >
            Areas of Improvement
          </Typography>
          <Stack spacing={2} sx={{ mt: "1.5rem" }}>
            {data.map((item, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="flex-start"
                spacing={1.5}
              >
                <Box
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    bgcolor: "#f0f0f0",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {index + 1}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "Inter", lineHeight: 1.6, mt: "12px" }}
                >
                  {item.improvement}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "15px",
        width: "95%",
        p: "1.5rem",
        margin: "1rem",
        minHeight: "45.42%",
        maxHeight: "45.42%",
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      <Typography variant="h6" sx={{ fontFamily: "Inter", fontWeight: "bold" }}>
        Areas of Improvement
      </Typography>
      <Box
        component="img"
        src= {ImprovementIllustration}
        sx={{ width: '60%', mt: 5, ml: 15, borderRadius: '8px' }}
      />
    </Paper>
  );
};

export default ImprovementsCard;
