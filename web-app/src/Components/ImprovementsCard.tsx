import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CycleGraph from "./CycleGraph";
import Analysis from "./Analysis";

const ImprovementsCard: React.FC = () => {
  const analysis = [
    {
      point:
        "alksdjflksjdfkj alksdjfk ajlsd flasdjfl kjoiwej wajefojqop jdvkjc,m adf js jqo  pqeo jka kdjflk sw hoe l aioj ef",
    },
    {
      point:
        "alksdjflksjdfkj alksdjfk ajlsd flasdkdjf l lskdjf ksj sdfkl jsdkfj ksdf kjsd fkjalkj f fewj ksdjf kjsd lsdjkf ksdjf ksd j kssd flasdjfl kjoiwej wajefojqop jdvkjc,m adf js jqo  pqeo jka kdjflk sw hoe l ajfl kjoiwej wajefojqop jdvkjc,m adf js jqo  pqeo jka kdjflk sw hoe l aioj ef",
    },
    {
      point:
        "alksdjflksjdfkj alksdjfk ajlsd flasdjfl kjoiwej wajefojqop jdvkjc,m adf js jqo  pqeo jka kdjflk sw hoe l aioj ef",
    },
    {
      point:
        "alksdjflksjdfkj alksdjfk ajlsd flasdjfl kjoiwej wajefojqop jdvkjc,m adf js jqo  pqeo jka kdjflk sw hoe l aioj ef",
    },
    {
      point:
        "alksdjflksjdfkj alksdjfk ajlsd flasdjfl kjoiwej wajefojqop jdvkjc,m adf js jqo  pqeo jka kdjflk sw hoe l aioj ef",
    },
    {
      point:
        "alksdjflksjdfkj alksdjfk ajlas.dfkm askjd  lskdjf l lskdjf ksj sdfkl jsdkfj ksdf kjsd fkjalkj f fewj ksdjf kjsd lsdjkf ksdjf ksd j kssd flasdjfl kjoiwej wajefojqop jdvkjc,m adf js jqo  pqeo jka kdjflk sw hoe l aioj ef",
    },
    {
      point:
        "alksdjflksjdfkj alksdjfk ajlsd flasdjfl kjoiwej wajefojqop jdvkjc,m adf js jqo  pqeo jka kdjflk sw hoe l aioj ef",
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

  return (
    <>
      <Paper
        variant="outlined"
        square={false}
        sx={{
          borderRadius: "15px",
          width: "95%",
          p: "1.5rem",
          margin: "1rem",
          minHeight: "44%",
          maxHeight: "44%",
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
            <Typography variant="h6" fontWeight="bold">
              Areas of Improvement
            </Typography>
            <Analysis numPoints={3} truncate={{overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical"}} data={analysis} />
          </Stack>
          <Chip
            label="See More"
            variant="outlined"
            size="small"
            onClick={seeMore}
            sx={{ alignItems: "center", pl: ".5rem", pr: ".5rem" }}
          />
        </Stack>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps = {{sx : { width: "100%"}}}
      >
        <DialogTitle id="scroll-dialog-title">Areas of Improvement</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Analysis
              numPoints={analysis.length}
              truncate={{}}
              data={analysis}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ImprovementsCard;
